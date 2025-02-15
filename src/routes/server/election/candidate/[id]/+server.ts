import Election from "$schema/election";
import { json } from "@sveltejs/kit";
import mongoose from "mongoose";

export async function GET({ params }) {
    try {
        const { id } = params
        
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return json({message: 'Election ID is required.'}, {status: 400})
        }

        const election = await Election.findById(id).select('electionCandidates')

        if (!election) {
            return json({message: 'No election found'}, {status: 404})
        }

        return json({election}, {status: 200})
    }catch(error) {
        return json({
        message: "Internal server error.",
        errorDetails: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        }, { status: 500 });
    }
}