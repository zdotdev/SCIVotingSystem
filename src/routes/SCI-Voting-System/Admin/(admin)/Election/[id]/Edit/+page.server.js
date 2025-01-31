import { error, fail, redirect } from '@sveltejs/kit';
import { election } from '$lib/Helpers/uri';

export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const electionTitle = formData.get('electionTitle');
        const electionStart = formData.get('electionStart');
        const electionEnd = formData.get('electionEnd');
        const displayElection = formData.get('displayElection');
        const candidateCount = formData.get('candidateCount');
        const id = formData.get('id');

        const candidates = [];
        for (let i = 0; i < candidateCount; i++) {
            const candidateName = formData.get(`candidateName_${i}`);
            const candidatePosition = formData.get(`candidatePosition_${i}`);
            candidates.push({ candidateName, candidatePosition });
        }
        try {
            const response = await fetch(`${election}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ electionTitle, electionStart, electionEnd, displayElection, electionCandidates: candidates }),
            });

            const data = await response.json();
            if (!response.ok) {
                return { errorMessage: data.message || 'Election creation failed.' };
            }   
        }catch (err) {
            console.error('Error during election creation:', err);
            throw error(500, { errorMessage: 'An internal error occurred. Please try again.' });
        }
        redirect(303, `/SCI-Voting-System/Admin/Election/${id}`);
    }
};