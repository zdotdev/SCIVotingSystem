import Election from "$db/Schema/Election";
import { json } from "@sveltejs/kit";
import { ElectionZodSchema,   ElectionCandidateZodSchema,
 } from "$db/Zod/Election";

export async function GET() {
    try {
        const elections = await Election.find();

        if (!elections) {
            throw new Response("No elections found", { status: 404 });
        }

        return json({election: elections});
    } catch (error) {
        return new Response("Internal server error.", error, { status: 500 });
    }
}

export async function POST({ body }) {
    try {
        const { electionTitle, electionStart, electionEnd, displayElection } = body

        const validatedData = ElectionZodSchema.pick({
            electionTitle: true,
            electionStart: true,
            electionEnd: true,
            displayElection: true,
            electionCandidates: true
        }).safeParse(body);

        const parseCandidates = electionCandidates.map((candidate) => {
            return ElectionCandidateZodSchema.safeParse(candidate);
        })

        if (!parseCandidates.some((candidate) => candidate.success)) {
            return new Response(parseCandidates.find((candidate) => !candidate.success).error.issues[0].message, { status: 400 });
        }

        if (!validatedData.success) {
            return new Response(validatedData.error.issues[0].message, { status: 400 });
        }

        const existingElection = await Election.findOne({ electionTitle });

        if (existingElection) {
            return new Response("Election already exists", { status: 400 });
        }

        const newElection = new Election({
            electionTitle,
            electionStart,
            electionEnd,
            electionCandidates,
            displayElection,
        });

        await newElection.save();

        return new Response("Election created successfully", { status: 201 });
    }catch(error){
        return new Response("Internal server error.", error, { status: 500 });
    }
}