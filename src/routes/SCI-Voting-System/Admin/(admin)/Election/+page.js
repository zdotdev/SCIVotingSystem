import { loginRefreshToken, election } from '$lib/Helpers/uri';
import { error, fail } from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
    let userChecker = null;
    let name = null;
    let studentId = null;

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
        name = authData.name
        studentId = authData.studentId
        if (userChecker !== 'admin') {
            throw error(403, 'Forbidden: Admins only');
        }

        const elections = await fetch(election);

        if (!elections.ok) {
            return fail(401, { errorMessage: 'Failed to fetch elections' });
        }

        const electionData = await elections.json();
        const electionList = electionData.election;
        
        return {
            name,
            studentId,
            electionList
        }

    } catch (err) {
        console.error('Error in load function:', err);
        throw error(500, { errorMessage: 'Forbidden: Admins only' });
    }
};
