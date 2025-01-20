import User from '$db/Schema/User';
import UserZodSchema from '$db/Zod/User';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '$db/JWT/Auth';
import { json } from '@sveltejs/kit';
import cookie from 'cookie';

export async function POST({ request }) {
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

    const accessToken = await generateAccessToken({ id: existingUser._id });
    const refreshToken = await generateRefreshToken({
      id: existingUser._id,
      email: existingUser.email,
    });

    await User.updateOne(
      { _id: existingUser._id },
      { refreshToken }
    );


    const responseHeaders = new Headers({
      'Set-Cookie': [
        cookie.serialize('accessToken', accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
        }),
        cookie.serialize('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
        }),
      ],
    });

    return new Response(
      JSON.stringify({
        message: 'User signed in successfully',
        user: existingUser.role,
      }),
      {
        status: 200,
        headers: responseHeaders,
      }
    );
  } catch (err) {
    console.error('Error during sign-in:', err);
    return json({ message: err.message }, { status: 500 });
  }
}
