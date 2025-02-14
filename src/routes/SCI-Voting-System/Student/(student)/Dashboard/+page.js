import { loginRefreshToken, user, electionActive, electionDisplayed } from '$lib/Helpers/uri';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
    let userChecker = null;
    let electionData = null;
    let displayedData = null;
    let name = null;
    let studentId = null;
    let userCount = null;

    try {
        const authResponse = await fetch(loginRefreshToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
    
        const authData = await authResponse.json();

        if (!authResponse.ok) {
            throw error(401, 'Unauthorized: Failed to refresh session');
        }

        userChecker = authData.user
        name = authData.name
        studentId = authData.studentId

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
        console.log(electionData);
        
        return {
            userChecker,
            electionData,
            displayedData,
            userCount,
            name,
            studentId,
        };

    } catch (err) {
        throw error(500, { errorMessage: 'Forbidden: Admins only' });
    }
};
