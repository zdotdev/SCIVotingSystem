import { fail, error, redirect } from '@sveltejs/kit';
import { loginRefreshToken } from '$lib/Helpers/uri';
import { browser } from '$app/environment';

export async function load({ fetch }) {
    let userChecker = null;
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

    } catch (err) {
        console.error('Error in load function:', err);
    }
    if (userChecker === 'student') {
        throw redirect(303, '/SCI-Voting-System/Student/Dashboard');
    } else if (userChecker === 'newUser') {
        throw redirect(303, '/Pending');
    } else if (userChecker === 'admin') {
        throw redirect(303, '/SCI-Voting-System/Admin/Dashboard');
    }
}