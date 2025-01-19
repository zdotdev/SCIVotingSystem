import Election from "$db/Schema/Election";
import { json } from "@sveltejs/kit";
import mongoose from "mongoose";

export async function GET({params}) {
    try {
        const { id } = params
        
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return new Response({message: 'Election ID is required.'}, {status: 400})
        }

        const election = await (await Election.findById(id)).select('electionCandidates')

        if (!election) {
            return new Response({message: 'No election found'}, {status: 404})
        }

        return json({election})
    }catch(error) {
        return new Response({message: 'Internal server error.'}, error, { status: 500 })
    }
}