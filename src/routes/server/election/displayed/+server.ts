import Election from '$schema/election'
import { json } from '@sveltejs/kit'

export async function GET() {
    try {
        const election = await Election.findOne({ displayElection: { $lte: new Date() } }).sort({ displayElection: -1 })

        if (!election) {
            return json({ message: 'No election found' }, { status: 404 })
        }

        return json({ election }, { status: 200 })
    } catch (error) {
        return json({
        message: "Internal server error.",
        errorDetails: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        }, { status: 500 });
    }
}
