import User from '$schema/user'
import { json } from '@sveltejs/kit'

export async function GET() {
    try {
        const users = await User.find({ role: 'newUser' });

        if (!users) {
            return json({ message: 'No users found' }, { status: 404 });
        }

        return json({ message: "Users fetched successfully.", user: users }, { status: 200 });
    } catch (error) {
        return json({ message: 'Internal server error.', error }, { status: 500 });
    }
}