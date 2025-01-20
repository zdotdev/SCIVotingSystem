import User from '$db/Schema/User';
import UserZodSchema from '$db/Zod/User';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '$db/JWT/Auth';
import { json } from '@sveltejs/kit';
import cookie from 'cookie';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { name, email, password, studentId, studentCourse } = body;

    const parserBody = UserZodSchema.pick({
      name: true,
      email: true,
      password: true,
      studentId: true,
      studentCourse: true,
    }).safeParse(body);

    if (!parserBody.success) {
      return json(
        { message: parserBody.error.issues[0].message },
        { status: 422 }
      );
    }

    const existingUser = await User.findOne().or([{ email }, { studentId }]);
    if (existingUser) {
      return json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      studentId,
    });

    const accessToken = await generateAccessToken({ id: newUser._id });
    const refreshToken = await generateRefreshToken({
      id: newUser._id,
      email: newUser.email,
    });

    newUser.refreshToken = refreshToken;

    try {
      await newUser.save();

      const response = new Response(
        JSON.stringify({
          message: 'User created successfully',
          user: newUser.role,
        }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
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
          },
        }
      );

      return response;
    } catch (err) {
      console.error('Error saving user:', err);
      return json({ message: err.message }, { status: 500 });
    }
  } catch (err) {
    console.error('Error during sign-up:', err);
    return json({ message: err.message }, { status: 500 });
  }
}
