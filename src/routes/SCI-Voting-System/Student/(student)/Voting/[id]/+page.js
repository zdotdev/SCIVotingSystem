import { loginRefreshToken, user, electionActive, electionDisplayed, election } from '$lib/Helpers/uri';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, cookies, params }) => {
    let electionData = null;
    let displayedData = null;
    let name = null;
    let studentId = null;
    let dataId = null;
    let userCount = null;
    let id = params.id;

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
        
        name = authData.name
        studentId = authData.studentId
        dataId = authData.id

        const electionRes = await fetch(`${election}/${id}`);

        if (electionRes.ok) {
            electionData = (await electionRes.json()).election;
        }

        return {
            electionData,
            name,
            studentId,
            dataId
        };

    } catch (err) {
        throw error(500, { errorMessage: 'Forbidden: Admins only' });
    }
};
