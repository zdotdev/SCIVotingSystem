import Election from '$schema/election'
import { json } from '@sveltejs/kit'
import { Election_Zod_Schema, Election_Candidate_Zod_Schema } from '$zod/election'
import type { Partylist_Graph_Interface, Candidate_Interface } from '$interface/election_interface'
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
        return json({message: 'Internal server error.', error}, { status: 500 })
    }
}

export async function PUT({ params, request }) {
    try {
        const { id } = params
        const body = await request.json();
        const electionPartylistGraph: Partylist_Graph_Interface[] = [];

        if(!body) {
            return json({ message: 'Request body is required.' }, { status: 400 });
        }

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return json({message: 'Election ID is required.'}, { status: 400 })
        }
        
        const { electionTitle, electionStart, electionEnd, electionCandidates, electionVoters, displayElection } = body

        const validatedData = Election_Zod_Schema.pick({ 
            electionTitle: true as const, 
            electionStart: true as const, 
            electionEnd: true as const, 
            electionCandidates: true as const, 
            displayElection: true as const 
        }).safeParse(body)

        const parserCandidates = electionCandidates.map((candidate: Candidate_Interface) => {
            return Election_Candidate_Zod_Schema.safeParse(candidate)
        })

        if (!validatedData.success) {
            return json({message: validatedData.error.issues[0].message}, { status: 400 })
        }

        if (parserCandidates.some((result: { success: boolean; error?: { issues: { message: string }[] } }) => !result.success)) {
            const invalidCandidate = parserCandidates.find((result: { success: boolean; error?: { issues: { message: string }[] } }) => !result.success)
            return json({message: invalidCandidate.error.issues[0].message}, { status: 400 })
        }

        const invalidCandidate =
            Array.isArray(electionCandidates) &&
            electionCandidates.find(candidate => {
                const validation = Election_Candidate_Zod_Schema.safeParse(candidate);
                return !validation.success;
            });
        if (invalidCandidate) {
            const validation = Election_Candidate_Zod_Schema.safeParse(invalidCandidate);
            return json(
                { message: validation.error?.issues[0].message },
                { status: 400 }
            );
        }

        electionCandidates.forEach(( candidate: Candidate_Interface ) => {
            if (candidate.candidateParty) {
                if (!electionPartylistGraph.some(party => party.electionPartylistName === candidate.candidateParty)) {
                    electionPartylistGraph.push({ electionPartylistName: candidate.candidateParty, electionPartylistData: 0 });
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
        election.electionPartylistGraph.splice(0, election.electionPartylistGraph.length, ...electionPartylistGraph)
        election.electionVoters = electionVoters
        election.displayElection = displayElection

        await election.save()

        return json({message: "Election updated successfully.", election})

    }catch(error) {
        return json({
        message: "Internal server error.",
        errorDetails: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        }, { status: 500 });
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
      if (party.type) {
        party.type.electionPartylistData = 0;
      }
    });

    const updatedPartylist = election.electionPartylistGraph.map(party => {
      const totalVotes = election.electionCandidates
        .filter(candidate => candidate.type?.candidateParty === party.type?.electionPartylistName)
        .reduce((acc, candidate) => acc + (candidate.type?.candidateVotes || 0), 0);
        if (party.type) {
            party.type.electionPartylistData = totalVotes;   
        }
        return party;
    });
    
    election.electionPartylistGraph.splice(0, election.electionPartylistGraph.length, ...updatedPartylist);

    await election.save();

    return json({
      message: "Election partylist data updated successfully.",
      updatedElection: election,
      timestamp: new Date().toISOString()
    }, { status: 200 });

  } catch (error) {
    return json({
      message: "Internal server error.",
      errorDetails: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
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
        return json({
        message: "Internal server error.",
        errorDetails: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        }, { status: 500 });
    }
}