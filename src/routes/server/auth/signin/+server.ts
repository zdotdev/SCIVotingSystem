import User from '$schema/user';
import UserZodSchema from '$zod/user';
import bcrypt from 'bcrypt';
import { create_auth_jwt } from '$jwt/auth';
import { json } from '@sveltejs/kit';
import cookie from 'cookie';
import type { RequestEvent } from '$types';

export async function POST({ request }: RequestEvent) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const parserBody = UserZodSchema.pick({
      email: true,
      password: true,
    }).safeParse(body);

    if (!parserBody.success) {
      return json(
        { message: parserBody.error.issues[0].message },
        { status: 422 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return json({ message: 'User email does not exist' }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return json({ message: 'Wrong password.' }, { status: 400 });
    }

    const accessToken = await create_auth_jwt({ id: existingUser._id.toString(), email: existingUser.email });

    await User.updateOne(
      { _id: existingUser._id },
      { accessToken }
    );


    const responseHeaders = {
        'Set-Cookie': cookie.serialize('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        })
    };

    return json({
        message: 'User signed in successfully',
        user: existingUser.role,
      },
      {
        status: 200,
        headers: responseHeaders,
      }
    );
  } catch (err) {
    return json({ message: err instanceof Error ? err.message : 'An error occurred.' }, { status: 500 });
  }
}
