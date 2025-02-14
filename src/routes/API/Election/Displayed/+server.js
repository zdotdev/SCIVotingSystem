import Election from '$db/Schema/Election'
import { json } from '@sveltejs/kit'

export async function GET() {
    try {
        const election = await Election.findOne({ displayElection: { $lte: new Date() } }).sort({ displayElection: -1 })

        if (!election) {
            return json({ message: 'No election found' }, { status: 404 })
        }

        return json({ election })
    } catch (error) {
        return json({ message: 'Internal server error occurred while fetching election data.' }, { status: 500 })
    }
}
