import Election from '$db/Schema/Election'
import { json } from '@sveltejs/kit'

export async function GET() {
    try {
        const election = await Election.find({ displayElection: { $lte: new Date() } })

        if (!election || election.length === 0) {
            return new Response({message: 'No election found'}, { status: 404 })
        }

        return json({election})
    } catch (error) {
        return new Response({message: 'Internal server error.'}, error, { status: 500 })
    }
}