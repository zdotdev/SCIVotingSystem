import { fail, error, json, redirect } from '@sveltejs/kit';
import { election } from '$lib/Helpers/uri';

export const actions = {
    deleteAction: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('electionId');

        try {
            const response = await fetch(`${election}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (id) {
                 return {success: true};
            } else {
                return { errorMessage: 'Failed to delete election' };
            }
        } catch (error) {
            console.error('Error deleting election:', error);
            return json({ errorMessage: 'An error occurred while deleting the election' });
        }
    },
    putAction: async ({ request, fetch }) => {
        const formData = await request.formData();

        const electionTitle = formData.get('electionTitle');
        const electionStart = formData.get('electionStart');
        const electionEnd = formData.get('electionEnd');
        const displayElection = formData.get('displayElection');
        const candidateCount = parseInt(formData.get('candidateCount'), 10);
        const id = formData.get('electionId');
        
        if (isNaN(candidateCount) || candidateCount < 0) {
            return fail(400, { errorMessage: 'Invalid candidate count.' });
        }

        const candidates = [];
        for (let i = 0; i < candidateCount; i++) {
            const candidateName = formData.get(`candidateName_${i}`);
            const candidatePosition = formData.get(`candidatePosition_${i}`);
            const candidateParty = formData.get(`candidateParty_${i}`);
            candidates.push({ candidateName, candidatePosition, candidateParty });
        }
        
        try {
            const response = await fetch(`${election}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    electionTitle,
                    electionStart,
                    electionEnd,
                    displayElection,
                    electionCandidates: candidates,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return fail(response.status, { errorMessage: errorData.message || 'Failed to update election.' });
            }
        } catch (err) {
            console.error('Error during election update:', err);
            throw error(500, { errorMessage: 'An internal error occurred. Please try again.' });
        }
        // throw redirect(303, `/SCI-Voting-System/Admin/Dashboard`);
    },
    postAction: async ({ request, fetch }) => {
        const formData = await request.formData();

        const electionTitle = formData.get('electionTitle');
        const electionStart = formData.get('electionStart');
        const electionEnd = formData.get('electionEnd');
        const displayElection = formData.get('displayElection');
        const candidateCount = parseInt(formData.get('candidateCount'), 10);

        if (isNaN(candidateCount) || candidateCount < 0) {
            return fail(400, { errorMessage: 'Invalid candidate count.' });
        }

        const candidates = [];
        for (let i = 0; i < candidateCount; i++) {
            const candidateName = formData.get(`candidateName_${i}`);
            const candidatePosition = formData.get(`candidatePosition_${i}`);
            const candidateParty = formData.get(`candidateParty_${i}`);
            candidates.push({ candidateName, candidatePosition, candidateParty });
        }

        try {
            const response = await fetch(election, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    electionTitle,
                    electionStart,
                    electionEnd,
                    displayElection,
                    electionCandidates: candidates,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                return fail(response.status, { errorMessage: errorData.message || 'Failed to update election.' });
            }
        } catch (err) {
            console.error('Error during election update:', err);
            throw error(500, { errorMessage: 'An internal error occurred. Please try again.' });
        }
    }
};