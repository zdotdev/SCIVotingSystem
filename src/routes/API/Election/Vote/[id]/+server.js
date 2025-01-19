import Election from "$db/Schema/Election";
import User from "$db/Schema/User";
import { ElectionSaveVoteZodSchema } from "$db/Zod/Election.js";
import { json } from "@sveltejs/kit";
import mongoose from "mongoose";

export async function PUT({ params, body }) {
    try {
        const { id } = params;
        const { votesData, votersId } = body;
        
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return new Response({message: "Election ID is required."}, { status: 400 });
        }
        
        const validatedData = ElectionSaveVoteZodSchema.safeParse(body);

        if (!validatedData.success) {
            return new Response({mesage: validatedData.error.issues[0].message}, { status: 400 });
        }

        const existingVote = await Election.findOne({ _id: id, electionVoters: votersId });

        if (existingVote) {
            return new Response({message: "You have already voted."}, { status: 400 });
        }

        const election = await Election.findById(id);
        const voter = await User.findById(votersId);

        if (!election) {
            return new Response({message: "No election found"}, { status: 404 });
        }

        if (!voter) {
            return new Response({message: "No voter found"}, { status: 404 });
        }

        votesData.forEach((candidateId, votes) => {
            const candidate = election.electionCandidates.id(candidateId);
            if (!candidate) {
                return new Response({message: "Candidate not found"}, { status: 404 });
            }
            candidate.candidateVotes += votes;
        });

        election.electionVoters.push(votersId);

        await election.save();

        return json({ message: "Vote saved successfully." });
    } catch (error) {
        return new Response({message: "Internal server error."}, error, { status: 500 });
    }
}