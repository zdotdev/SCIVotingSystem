import Election from "$db/Schema/Election";
import { json } from "@sveltejs/kit";

export async function GET() {
    try {
        const election = await Election.findOne({
          electionEnd: { $lt: new Date() }
        }).sort({ electionEnd: -1 })

        if (!election) {
            return json({message: "No active election found"}, { status: 404 });
        }

        return json({election});
    } catch (error) {
        return json({message: "Internal server error."}, error, { status: 500 });
    }
}