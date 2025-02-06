import { fail, error, redirect } from '@sveltejs/kit';
import { loginRefreshToken, election } from '$lib/Helpers/uri';

export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const electionTitle = formData.get("electionTitle");
        const electionStart = formData.get("electionStart");
        const electionEnd = formData.get("electionEnd");
        const displayElection = formData.get("displayElection");
        const candidateCount = formData.get("candidateCount");
        
        if(!electionTitle || !electionStart || !electionEnd || !displayElection || !candidateCount) {
            return { errorMessage: "All fields are required." };
        }

        const candidates = [];
        for (let i = 0; i < candidateCount; i++) {
            const candidateName = formData.get(`candidate_name_${i}`);
            const candidatePosition = formData.get(`candidate_position_${i}`);
            const candidateParty = formData.get(`candidate_party_${i}`);
            candidates.push({ candidateName, candidatePosition, candidateParty });
        }
        
        try {
            const response = await fetch(election, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ electionTitle, electionStart, electionEnd, displayElection, electionCandidates: candidates }),
            });

            const data = await response.json();
            if (!response.ok) {
                return { errorMessage: data.message || "Election creation failed." };
            }
        } catch (err) {
            console.error("Error during election creation:", err);
            throw error(500, { errorMessage: "An internal error occurred. Please try again." });
        }
        return redirect(303, '/SCI-Voting-System/Admin/Election');
    }
}
