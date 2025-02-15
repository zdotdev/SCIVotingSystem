import User from '$schema/user';
import UserZodSchema from '$zod/user';
import bcrypt from 'bcrypt';
import { create_auth_jwt } from '$jwt/auth';
import { json } from '@sveltejs/kit';
import cookie from 'cookie';
import { RequestEvent } from '$types';

export async function POST({ request }: RequestEvent) {
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
      studentCourse
    });

    const accessToken = await create_auth_jwt({ id: newUser._id.toString(), email: newUser.email });

    newUser.accessToken = accessToken;

    try {
      await newUser.save();

      const response = json({
          message: 'User created successfully',
          user: newUser.role,
        },
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie':
              cookie.serialize('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
            })
          },
        }
      );

      return response;
    } catch (err) {
      return json({ message: err instanceof Error ?  err.message : "An error occured." }, { status: 500 });
    }
  } catch (err) {
    return json({ message: err instanceof Error ? err.message : "An error occured" }, { status: 500 });
  }
}
