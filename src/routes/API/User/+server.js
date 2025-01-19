import User from '$db/Schema/User'
import { json } from '@sveltejs/kit'

export async function GET() {
    try {
        const users = await User.find({role: 'student'})

        if (!users) {
            return new Response({message: 'No users found'}, { status: 404 })
        }

        return json({message: "Users fetched successfully.", user: users})
    } catch (error) {
        return new Response({message: 'Internal server error.'}, error, { status: 500 })
    }
}