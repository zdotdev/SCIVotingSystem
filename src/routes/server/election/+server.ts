import Election from "$schema/election";
import { json } from "@sveltejs/kit";
import { Election_Zod_Schema,   Election_Candidate_Zod_Schema,
} from "$zod/election";
 import type { Partylist_Graph_Interface, Candidate_Interface } from "$interface/election.js";

export async function GET() {
    try {
        const elections = await Election.find();
        
        if (!elections) {
            throw json({message: "No elections found."}, { status: 404 });
        }

        return json({message: "Election fetched successfully.",election: elections});
    } catch (error) {
        return json({
        message: "Internal server error.",
        errorDetails: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        }, { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const electionPartylistGraph: Partylist_Graph_Interface[] = [];
        const body = await request.json();
        const validatedData = Election_Zod_Schema.safeParse(body);

        if (!validatedData.success) {
            return json(
                { message: validatedData.error.issues[0].message },
                { status: 400 }
            );
        }

        const { electionTitle, electionStart, electionEnd, electionCandidates, displayElection } = body;
        const invalidCandidate =
            Array.isArray(electionCandidates) &&
            electionCandidates.find(candidate => {
                const validation = Election_Candidate_Zod_Schema.safeParse(candidate);
                return !validation.success;
            });

        if (invalidCandidate) {
            const validation = Election_Candidate_Zod_Schema.safeParse(invalidCandidate);
            if (!validation.success) {
                return json(
                    { message: validation.error.issues[0].message },
                    { status: 400 }
                );
            }
        }
        const existingElection = await Election.findOne({ electionTitle });
        if (existingElection) {
            return json({ message: "Election already exists." }, { status: 400 });
        }

        electionCandidates.forEach((candidate: Candidate_Interface) => {
            if (candidate.candidateParty) {
                if (!electionPartylistGraph.some(party => party.electionPartylistName === candidate.candidateParty)) {
                    electionPartylistGraph.push({
                        electionPartylistName: candidate.candidateParty,
                        electionPartylistData: 0
                    });
                }
            }
        });

        const newElection = new Election({
            electionTitle,
            electionStart,
            electionEnd,
            electionCandidates,
            electionPartylistGraph,
            displayElection,
        });

        await newElection.save();

        return json({ message: "Election created successfully." }, { status: 201 });
    } catch (error) {
        return json({
        message: "Internal server error.",
        errorDetails: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        }, { status: 500 });
    }
}
