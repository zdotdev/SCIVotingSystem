import { loginRefreshToken, electionActive, electionDisplayed, user, election } from '$lib/Helpers/uri';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
    let userChecker = null;
    let name = null
    let studentId = null
    let electionData = {};
    let displayedData = {};
    let userCount = [];

    try {
        const authResponse = await fetch(loginRefreshToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const updateData = await fetch(election, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
        const authData = await authResponse.json();

        if (!authResponse.ok) {
            throw error(401, 'Unauthorized: Failed to refresh session');
        }

        userChecker = authData.user;
        name = authData.name
        studentId = authData.studentId
        if (userChecker !== 'admin') {
            throw error(403, 'Forbidden: Admins only');
        }

        const activeElectionRes = await fetch(electionActive);
        const displayedElectionRes = await fetch(electionDisplayed);
        const userRes = await fetch(user);

        if (activeElectionRes.ok) {
            electionData = (await activeElectionRes.json()).election;
        }

        if (displayedElectionRes.ok) {
            displayedData = (await displayedElectionRes.json()).election;
        }

        if (userRes.ok) {
            userCount = (await userRes.json()).user.length;
        }

        return {
            userChecker,
            name,
            studentId,
            userCount,
            electionData,
            displayedData
        };

    } catch (err) {
        console.error('Error in load function:', err);
        throw error(500, { errorMessage: 'Forbidden: Admins only' });
    }
};
