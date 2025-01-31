import { loginRefreshToken, electionActive, electionDisplayed } from '$lib/Helpers/uri';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
    let userChecker = null;
    let electionData = {};
    let displayedData = {};

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

        userChecker = authData.user;
        if (userChecker !== 'admin') {
            throw error(403, 'Forbidden: Admins only');
        }

        const activeElectionRes = await fetch(electionActive);
        const displayedElectionRes = await fetch(electionDisplayed);

        if (activeElectionRes.ok) {
            electionData = (await activeElectionRes.json()).election;
        }

        if (displayedElectionRes.ok) {
            displayedData = (await displayedElectionRes.json()).election;
        } 

        return {
            userChecker,
            electionData,
            displayedData
        };

    } catch (err) {
        console.error('Error in load function:', err);
        throw error(500, { errorMessage: 'Forbidden: Admins only' });
    }
};
