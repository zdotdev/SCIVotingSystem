import Election from "$db/Schema/Election";
import { json } from "@sveltejs/kit";

export async function GET() {
    try {
        const elections = await Election.find({
      electionStart: { $lte: new Date() },
      electionEnd: { $gte: new Date() }
    }).sort({ electionStart: -1 })

        if (!elections || elections.length === 0) {
            throw new Response("No active elections found", { status: 404 });
        }

        return json({election: elections});
    } catch (error) {
        return new Response("Internal server error.", error, { status: 500 });
    }
}