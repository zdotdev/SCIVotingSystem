import User from '$schema/user';
import { json } from '@sveltejs/kit';
import UserZodSchema from '$zod/user';
import mongoose from 'mongoose';

export async function GET({ params }) {
    try {
        const { id } = params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return json({ message: 'User ID is required.' }, { status: 400 });
        }

        const users = await User.findById(id);

        if (!users) {
            return json({ message: 'No users found' }, { status: 404 });
        }

        return json({ message: 'User fetched successfully.', user: users }, { status: 200 });
    } catch (error) {
        return json({ message: 'Internal server error.', error }, { status: 500 });
    }
}

export async function PATCH({ params, request }) {
    try {
        const { id } = params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return json({ message: 'User ID is required.' }, { status: 400 });
        }

        const body = await request.json();

        if(!body) {
            return json({ message: 'Request body is required.' }, { status: 400 });
        }

        const { role } = body;

        if (!role) {
            return json({ message: 'Role is required.' }, { status: 400 });
        }

        const user = await User.findById(id);

        if (!user) {
            return json({ message: 'No users found' }, { status: 404 });
        }

        const validatedData = UserZodSchema.pick({ role: true }).safeParse(body);

        if (!validatedData.success) {
            return json({ message: validatedData.error.issues[0].message }, { status: 400 });
        }

        user.role = role;
        await user.save();

        return json({ message: 'User updated successfully.', user }, { status: 200 });
    } catch (error) {
        return json({ message: 'Internal server error.', error }, { status: 500 });
    }
}

export async function DELETE({ params }) {
    try {
        const { id } = params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return json({ message: 'User ID is required.' }, { status: 400 });
        }

        const user = await User.findById(id);

        if (!user) {
            return json({ message: 'No users found' }, { status: 404 });
        }

        await User.findByIdAndDelete(id);

        return json({ message: 'User has been deleted.' }, { status: 200 });
    } catch (error) {
        return json({ message: 'Internal server error.', error }, { status: 500 });
    }
}
