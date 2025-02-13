import Election from "$db/Schema/Election";
import { json } from "@sveltejs/kit";

export async function GET() {
    try {
        const election = await Election.findOne({
      electionStart: { $lte: new Date() },
      electionEnd: { $gte: new Date() }
    }).sort({ electionStart: -1 })

        if (!election) {
            return json({message: "No active elections found"}, { status: 404 });
        }

        return json({election});
    } catch (error) {
        return json({message: "Internal server error."}, error, { status: 500 });
    }
}