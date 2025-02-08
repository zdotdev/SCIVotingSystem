import { electionVote, election } from "$lib/Helpers/uri";
import { redirect, error } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, fetch, params }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        const { userId, ...votingData } = data;
        
        try {
            // Fetch current election data
            const response = await fetch(`${election}/${params.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch election data');
            }
            const electionData = await response.json();
            
            if (!electionData) {
                throw error(500, { errorMessage: 'No election data fetched.' });
            }
            
            // Validate candidates
            const validCandidateIds = new Set(
                electionData.election.electionCandidates.map(candidate => candidate._id)
            );
            
            // Update votes
            for (const [key, value] of Object.entries(votingData)) {
                if (!validCandidateIds.has(value)) {
                    throw new Error(`Invalid candidate selected: ${value}`);
                }
                const candidate = electionData.election.electionCandidates.find(
                    candidate => candidate._id === value
                );
                if (candidate) {
                    candidate.candidateVotes += 1;
                }
            }

            electionData.election.electionVoters.push(userId.toString());
            
            const saveResponse = await fetch(`${election}/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(electionData.election)
            });
            
            if (!saveResponse.ok) {
                const errorData = await saveResponse.json();
                throw new Error(`Failed to save election data: ${errorData?.errorMessage || 'Unknown error'}`);
            }
            
        } catch (err) {
            console.error('Error details:', err);
            throw error(500, { 
                errorMessage: 'An internal error occurred. Please try again.',
                errorDetails: err.message
            });
        }
        throw redirect(303, '/SCI-Voting-System/Student/Dashboard');
    }
};