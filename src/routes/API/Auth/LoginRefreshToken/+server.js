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
      return new Response(JSON.stringify({ message: 'Refresh token required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const decoded = jwt.verify(refreshToken, JWT_SECRET);

    const user = await User.findById(decoded.id.id);
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (user.refreshToken !== refreshToken) {
      return new Response(JSON.stringify({ message: 'Invalid refresh token' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const accessToken = await generateAccessToken({ id: user._id });

    return new Response(
      JSON.stringify({ message: 'Token refreshed successfully', user: user.role, id: user._id }),
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

    return new Response(JSON.stringify({ message: 'Invalid or expired refresh token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
