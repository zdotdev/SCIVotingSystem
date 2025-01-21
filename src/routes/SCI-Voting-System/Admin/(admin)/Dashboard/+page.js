import { loginRefreshToken, electionActive, electionDisplayed } from '$lib/uri';
import { error, fail } from '@sveltejs/kit';

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

        if (activeElectionRes.ok && displayedElectionRes.ok) {
            electionData = (await activeElectionRes.json()).election;
            displayedData = (await displayedElectionRes.json()).election;
            return {
                userChecker,
                electionData,
                displayedData
            };
        } else {
            return {errorMessage: 'Failed to load election data. Please try again later.' };
        }

    } catch (err) {
        console.error('Error in load function:', err);
        throw error(500, { errorMessage: 'Failed to load data. Please try again later.' });
    }
};
