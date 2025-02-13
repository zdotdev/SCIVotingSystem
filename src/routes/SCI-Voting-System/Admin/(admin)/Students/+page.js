import { loginRefreshToken, user } from '$lib/Helpers/uri';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, cookies }) => {
    let userChecker = null;
    let usersData = {};
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
        name = authData.name;
        studentId = authData.studentId
        if (userChecker !== 'admin') {
            throw error(403, 'Forbidden: Admins only');
        }

        const users = await fetch(user);
        
        if (users.ok) {
            usersData = (await users.json()).user;
            return {
                name,
                studentId,
                usersData
            }
        }else {
            return { errorMessage: 'Failed to load new users data. Please try again later.' };
        }

    } catch (err) {
        throw error(500, { errorMessage: 'Forbidden: Admins only' });
    }
};
