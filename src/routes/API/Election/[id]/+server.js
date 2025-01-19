import Election from '$db/Schema/Election'
import { json } from '@sveltejs/kit'
import { ElectionZodSchema, ElectionCandidateZodSchema } from '$db/Zod/Election.js'
import mongoose from 'mongoose'

export async function GET({ params }) {
    try {
        const { id } = params

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return new Response({message: 'Election ID is required.'}, { status: 400 })
        }

        const election = await Election.findById(id)

        if (!election) {
            return new Response({message: 'No election found.'}, { status: 404 })
        }

        return json({message: "Election fetched successfully.", election})
    } catch (error) {
        return new Response({message: 'Internal server error.'}, error, { status: 500 })
    }
}

export async function PUT({ params, body }) {
    try {
        const { id } = params

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return new Response({message: 'Election ID is required.'}, { status: 400 })
        }

        const { electionTitle, electionStart, electionEnd, electionCandidates, displayElection } = body

        const validatedData = ElectionZodSchema.pick({ electionTitle: true, electionStart: true, electionEnd: true, electionCandidates: true, displayElection: true }).safeParse(body)

        const parserCandidates = electionCandidates.map((candidate) => {
            return ElectionCandidateZodSchema.safeParse(candidate)
        })

        if (!validatedData.success) {
            return new Response({message: validatedData.error.issues[0].message}, { status: 400 })
        }

        if (parserCandidates.some((candidate) => !candidate.success)) {
            return new Response({message: parserCandidates.find((candidate) => !candidate.success).error.issues[0].message}, { status: 400 })
        }

        const election = await Election.findById(id)

        if (!election) {
            return new Response({message: 'No election found'}, { status: 404 })
        }

        election.electionTitle = electionTitle
        election.electionStart = electionStart
        election.electionEnd = electionEnd
        election.electionCandidates = electionCandidates
        election.displayElection = displayElection

        await election.save()

        return json({message: "Election updated successfully.", election})

    }catch(error) {
        return new Response({message: 'Internal server error.'}, error, { status: 500 })
    }
}

export async function DELETE({ params }) {
    try {
        const { id } = params

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return new Response({message: 'Election ID is required.'}, { status: 400 })
        }

        const election = await Election.findById(id)

        if (!election) {
            return new Response({message: 'No election found'}, { status: 404 })
        }

        await election.deleteOne({_id: id})

        return new Response({message: 'Election deleted successfully.'}, { status: 200 })

    }catch(error) {
        return new Response({message: 'Internal server error.'}, error, { status: 500 })
    }
}