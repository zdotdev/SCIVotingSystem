import Election from "$db/Schema/Election";
import { json } from "@sveltejs/kit";
import { ElectionZodSchema,   ElectionCandidateZodSchema,
 } from "$db/Zod/Election";

export async function GET() {
    try {
        const elections = await Election.find();

        if (!elections) {
            throw json({message: "No elections found."}, { status: 404 });
        }

        return json({message: "Election fetched successfully.",election: elections});
    } catch (error) {
        return json({message: "Internal server error."}, error, { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const body = await request.json();
        const validatedData = ElectionZodSchema.safeParse(body);

        if (!validatedData.success) {
            return json(
                { message: validatedData.error.issues[0].message },
                { status: 400 }
            );
        }

        const { electionTitle, electionStart, electionEnd, electionCandidates, displayElection } = validatedData.data;
        const invalidCandidate =
            Array.isArray(electionCandidates) &&
            electionCandidates.find(candidate => {
                const validation = ElectionCandidateZodSchema.safeParse(candidate);
                return !validation.success;
            });

        if (invalidCandidate) {
            const validation = ElectionCandidateZodSchema.safeParse(invalidCandidate);
            return json(
                { message: validation.error.issues[0].message },
                { status: 400 }
            );
        }
        const existingElection = await Election.findOne({ electionTitle });
        if (existingElection) {
            return json({ message: "Election already exists." }, { status: 400 });
        }
        const newElection = new Election({
            electionTitle,
            electionStart,
            electionEnd,
            electionCandidates,
            displayElection,
        });

        await newElection.save();

        return json({ message: "Election created successfully." }, { status: 201 });
    } catch (error) {
        console.error("Error creating election:", error);
        return json({ message: "Internal server error." }, { status: 500 });
    }
}