import { loginRefreshToken, election } from '$lib/uri';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, cookies, params }) => {
    let userChecker = null;
    const { id } = params;

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

        const electionResponse = await fetch(`${election}/${id}`);

        if (!electionResponse.ok) {
            return { redirect: '/SCI-Voting-System/Admin/Election' };
        }

        const electionData = await electionResponse.json();
        const electionList = electionData.election;

        return {
            electionList,
        };
    } catch (err) {
        console.error('Error in load function:', err);
        throw error(500, { errorMessage: 'An unexpected error occurred' });
    }
};
