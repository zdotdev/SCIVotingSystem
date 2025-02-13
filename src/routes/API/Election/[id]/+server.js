import Election from '$db/Schema/Election'
import { json } from '@sveltejs/kit'
import { ElectionZodSchema, ElectionCandidateZodSchema } from '$db/Zod/Election.js'
import mongoose from 'mongoose'

export async function GET({ params }) {
    try {
        const { id } = params

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return json({message: 'Election ID is required.'}, { status: 400 })
        }

        const election = await Election.findById(id)

        if (!election) {
            return json({message: 'No election found.'}, { status: 404 })
        }

        return json({message: "Election fetched successfully.", election})
    } catch (error) {
        return json({message: 'Internal server error.'}, error, { status: 500 })
    }
}

export async function PUT({ params, request }) {
    try {
        const { id } = params
        const body = await request.json();
        const electionPartylistGraph = [];

        if(!body) {
            return json({ message: 'Request body is required.' }, { status: 400 });
        }

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return json({message: 'Election ID is required.'}, { status: 400 })
        }
        
        const { electionTitle, electionStart, electionEnd, electionCandidates, electionVoters, displayElection } = body

        const validatedData = ElectionZodSchema.pick({ electionTitle: true, electionStart: true, electionEnd: true, electionCandidates: true, displayElection: true }).safeParse(body)

        const parserCandidates = electionCandidates.map((candidate) => {
            return ElectionCandidateZodSchema.safeParse(candidate)
        })

        if (!validatedData.success) {
            return json({message: validatedData.error.issues[0].message}, { status: 400 })
        }

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

        electionCandidates.forEach(candidate => {
            if (candidate.candidateParty) {
                if (!electionPartylistGraph.some(party => party.electionPartylistName === candidate.candidateParty)) {
                    electionPartylistGraph.push({ electionPartylistName: candidate.candidateParty });
                }
            }
        });


        const election = await Election.findById(id)

        if (!election) {
            return json({message: 'No election found'}, { status: 404 })
        }

        election.electionTitle = electionTitle
        election.electionStart = electionStart
        election.electionEnd = electionEnd
        election.electionCandidates = electionCandidates
        election.electionPartylistGraph = electionPartylistGraph
        election.electionVoters = electionVoters
        election.displayElection = displayElection

        await election.save()

        return json({message: "Election updated successfully.", election})

    }catch(error) {
        return json({message: 'Internal server error.'}, error, { status: 500 })
    }
}

export async function PATCH({ params }) {
  try {
    const { id } = params;
    const election = await Election.findById(id);

    if (!election) {
      return json({ message: "No elections found." }, { status: 404 });
    }

    if (!Array.isArray(election.electionPartylistGraph)) {
      return json({ message: "Invalid election partylist data." }, { status: 400 });
    }

    election.electionPartylistGraph.forEach(party => {
      party.electionPartylistData = 0;
    });

    election.electionPartylistGraph = election.electionPartylistGraph.map(party => {
      const totalVotes = election.electionCandidates
        .filter(candidate => candidate.candidateParty === party.electionPartylistName)
        .reduce((acc, candidate) => acc + (candidate.candidateVotes || 0), 0);

      return { ...party, electionPartylistData: totalVotes };
    });

    await election.save();

    return json({
      message: "Election partylist data updated successfully.",
      updatedElection: election,
      timestamp: new Date().toISOString()
    }, { status: 200 });

  } catch (error) {
    return json({
      message: "Internal server error.",
      errorDetails: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}


export async function DELETE({ params }) {
    try {
        const { id } = params

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return json({message: 'Election ID is required.'}, { status: 400 })
        }

        const election = await Election.findById(id)

        if (!election) {
            return json({message: 'No election found'}, { status: 404 })
        }

        await Election.findByIdAndDelete(id)

        return json({message: 'Election deleted successfully.'}, { status: 200 })

    }catch(error) {
        return json({message: 'Internal server error.'}, error, { status: 500 })
    }
}