import User from '$schema/user';
import mongoose from 'mongoose';
import { json } from '@sveltejs/kit';
import cookie from 'cookie';
import type { RequestEvent } from '$types';
import { verify_auth_jwt } from '$jwt/auth';

export async function POST({ request }: RequestEvent) {
  try {
    const cookies = cookie.parse(request.headers.get('cookie') || '');
    const accessToken = cookies.accessToken;

    if (!accessToken) {
      return json({ message: 'Refresh token required' }, { status: 401 });
    }

    let decoded;
      
    try {
      decoded = await verify_auth_jwt(accessToken);
    } catch (err) {
      return json({ message: 'Invalid or expired refresh token', err }, { status: 401 });
    }

    const id = decoded.id;

    if (!id || !mongoose.isValidObjectId(id)) {
      return json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const responseHeaders = new Headers({
      'Set-Cookie':
        cookie.serialize('accessToken', '', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
          maxAge: 0,
        })
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

    return json({ message: 'User signed out successfully' },
      {
        status: 200,
        headers: responseHeaders,
      }
    );
  } catch (err) {
    return json({ message: err instanceof Error ? err.message : "An error occured." }, { status: 500 });
  }
}
