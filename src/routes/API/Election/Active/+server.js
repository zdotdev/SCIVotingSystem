import Election from "$db/Schema/Election";
import { json } from "@sveltejs/kit";

export async function GET() {
    try {
        const elections = await Election.find({
      electionStart: { $lte: new Date() },
      electionEnd: { $gte: new Date() }
    }).sort({ electionStart: -1 })

        if (!elections) {
            throw new Response({message: "No active elections found"}, { status: 404 });
        }

        if (elections.length === 0) {
            return json({ message: "No active elections found." });
        }

        return json({message: "Election fetched successfully.", election: elections});
    } catch (error) {
        return new Response({message: "Internal server error."}, error, { status: 500 });
    }
}