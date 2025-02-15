import Election from "$schema/election";
import User from "$schema/user";
import { Election_Save_Vote_Zod_Schema } from "$zod/election";
import { json } from "@sveltejs/kit";
import mongoose from "mongoose";

export async function PATCH({ params, request }) {
    try {
        const { id } = params;

        const body = await request.json();

        if(!body) {
            return json({ message: 'Request body is required.' }, { status: 400 });
        }

        const { votesData, votersId } = body;
        
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return json({message: "Election ID is required."}, { status: 400 });
        }
        
        const validatedData = Election_Save_Vote_Zod_Schema.safeParse(body);

        if (!validatedData.success) {
            return json({mesage: validatedData.error.issues[0].message}, { status: 400 });
        }

        const existingVote = await Election.findOne({ _id: id, electionVoters: votersId });

        if (existingVote) {
            return json({message: "You have already voted."}, { status: 400 });
        }

        const election = await Election.findById(id);
        const voter = await User.findById(votersId);

        if (!election) {
            return json({message: "No election found"}, { status: 404 });
        }

        if (!voter) {
            return json({message: "No voter found"}, { status: 404 });
        }

        votesData.forEach((candidateId: string, votes: number) => {
            const candidate = election.electionCandidates.id(candidateId);
            if (!candidate) {
                return json({message: "Candidate not found"}, { status: 404 });
            }
            if (candidate.type) {
                candidate.type.candidateVotes += votes;
            }
        });

        election.electionVoters.push(votersId);

        await election.save();

        return json({ message: "Vote saved successfully." });
    } catch (error) {
        return json({
        message: "Internal server error.",
        errorDetails: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        }, { status: 500 });
    }
}