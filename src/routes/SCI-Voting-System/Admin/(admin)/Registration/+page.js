import { fail, error } from '@sveltejs/kit';
import { loginRefreshToken, newUsers } from '$lib/Helpers/uri';

export async function load({ fetch }) {
    let userChecker = null;
    let newUsersData = {};
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
            throw error(401, { errorMessage: 'Unauthorized: Failed to refresh session' });
        }

        userChecker = authData.user;
        name = authData.name;
        studentId = authData.studentId

        if (userChecker !== 'admin') {
            throw error(403, { errorMessage: 'Forbidden: Admins only' });
        }

        const users = await fetch(newUsers);

        if (users.ok) {
            newUsersData = (await users.json()).user;
            return {
                newUsersData,
                name,
                studentId
            }
        }else {
            return { errorMessage: 'Failed to load new users data. Please try again later.' };
        }

    } catch (err) {
        console.error('Error in load function:', err);
        throw error(500, { errorMessage: 'Failed to load data. Please try again later.' })
    }
}