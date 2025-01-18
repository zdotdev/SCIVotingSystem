import User from '$db/Schema/User'
import { json } from '@sveltejs/kit'
import UserZodSchema from '$db/Zod/User.js'
import mongoose from 'mongoose'

export async function GET({ params }) {
    try {
        const { id } = params

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return new Response('User ID is required.', { status: 400 })
        }

        const users = await User.findById(id)

        if (!users) {
            return new Response('No users found', { status: 404 })
        }

        return json({user: users})
    } catch (error) {
        return new Response('Internal server error.', error, { status: 500 })
    }
}

export async function PATCH({ params, body }) {
    try {
        const { id } = params

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return new Response('User ID is required.', { status: 400 })
        }

        const { role } = body

        if (!role) {
            return new Response('Role is required.', { status: 400 })
        }

        const user = await User.findById(id)

        const validatedData = UserZodSchema.pick({ role: true }).safeParse(body)

        if (!validatedData.success) {
            return new Response(validatedData.error.issues[0].message, { status: 400 })
        }

        if (!user) {
            return new Response('No users found', { status: 404 })
        }

        user.role = role
        await user.save()

        return json({user})

    }catch(error) {
        return new Response('Internal server error.', error, { status: 500 })
    }
}

export async function DELETE({ params }) {
    try {
        const { id } = params
        const user = await User.findById(id)

        if (!user) {
            return new Response('No users found', { status: 404 })
        }

        await user.delete()
        await user.save()

        return new Response('User has been deleted', { status: 200 })

    } catch (error) {
        return new Response('Internal server error.', error, { status: 500 })
    }
}