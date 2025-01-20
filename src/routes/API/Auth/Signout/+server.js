import User from '$db/Schema/User';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import mongoose from 'mongoose';
import { json } from '@sveltejs/kit';
import cookie from 'cookie';

export async function POST({ request }) {
  try {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return json({ message: 'Refresh token required' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_SECRET);
    } catch (err) {
      return json({ message: 'Invalid or expired refresh token' }, { status: 401 });
    }

    const id = decoded.id.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const responseHeaders = new Headers({
      'Set-Cookie': [
        cookie.serialize('accessToken', '', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
          maxAge: 0,
        }),
        cookie.serialize('refreshToken', '', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
          maxAge: 0,
        }),
      ],
    });

    const user = await User.findById(id);
    if (user) {
      await User.updateOne(
        { _id: user._id },
        { refreshToken: null }
      );

    } else {
      return json({ message: 'Forbidden' }, { status: 403 });
    }

    return new Response(
      JSON.stringify({ message: 'User signed out successfully' }),
      {
        status: 200,
        headers: responseHeaders,
      }
    );
  } catch (err) {
    console.error('Sign-out error:', err);
    return json({ message: err.message }, { status: 500 });
  }
}
