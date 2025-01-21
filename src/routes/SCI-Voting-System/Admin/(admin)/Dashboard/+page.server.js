import { loginRefreshToken, electionActive, electionDisplayed } from '$lib/uri';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
    let userChecker = null;
    let electionData = {};
    let displayedData = {};
    let errorMessage = null;

    try {
        const authResponse = await fetch(loginRefreshToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const authData = await authResponse.json();

        if (authResponse.ok) {
            userChecker = authData.user;
            if (userChecker !== 'admin') {
                throw error(403, { errorMessage: 'Forbidden: Admins only' });
            }
        } else {
            throw error(401, { errorMessage: 'Unauthorized: Failed to refresh session' });
        }
        const activeElectionRes = await fetch(electionActive);
        electionData = activeElectionRes.ok
            ? (await activeElectionRes.json()).election
            : {};
        const displayedElectionRes = await fetch(electionDisplayed);
        displayedData = displayedElectionRes.ok
            ? (await displayedElectionRes.json()).election
            : {};

    } catch (err) {
        console.error('Error in load function:', err);
        throw error({errorMessage: err.message || 'Failed to load data. Please try again later.'})
    }

    return {
        userChecker,
        electionData,
        displayedData,
        errorMessage,
    };
};
