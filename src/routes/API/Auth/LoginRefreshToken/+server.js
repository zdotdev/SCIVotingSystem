import { json, error } from '@sveltejs/kit';
import User from '$db/Schema/User';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { generateAccessToken } from '$db/JWT/Auth';
import cookie from 'cookie';

export async function POST({ request }) {
  try {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return json({ message: 'Refresh token required' }, {
        status: 401
      });
    }

    const decoded = jwt.verify(refreshToken, JWT_SECRET);

    const user = await User.findById(decoded.id.id);
    if (!user) {
      return json({ message: 'User not found' }, {
        status: 404
      });
    }

    if (user.refreshToken !== refreshToken) {
      return json({ message: 'Invalid refresh token' }, {
        status: 403
      });
    }

    const accessToken = await generateAccessToken({ id: user._id });

    return json({ message: 'Token refreshed successfully', user: user.role, id: user._id },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookie.serialize('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
          }),
        },
      }
    );

  } catch (error) {
    console.error('Error during token refresh:', error);

    return error({ message: 'Invalid or expired refresh token' }, {
      status: 401
    });
  }
}
