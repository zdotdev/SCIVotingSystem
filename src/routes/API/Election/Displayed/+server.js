import Election from '$db/Schema/Election'
import { json } from '@sveltejs/kit'

export async function GET() {
    try {
        const election = await Election.findOne({ displayElection: { $lte: new Date() } }).sort({ displayElection: -1 })

        if (!election) {
            return new Response({message: 'No election found'}, { status: 404 })
        }

        if (election.length === 0) {
            return json({message: 'No election found.'})
        }

        return json({election})
    } catch (error) {
        return new Response({message: 'Internal server error.'}, error, { status: 500 })
    }
}