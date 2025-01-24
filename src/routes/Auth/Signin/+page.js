import { fail, error, redirect } from '@sveltejs/kit';
import { loginRefreshToken } from '$lib/uri';
import { browser } from '$app/environment';

export async function load({ fetch }) {
    let userChecker = null;
    try {
        const response = await fetch(loginRefreshToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const data = await response.json();
        const user = data.user;

    } catch (err) {
        console.error('Error in load function:', err);
        throw error(500, { errorMessage: 'Failed to refresh session. Please log in again.' });
    }
    if (userChecker === 'student') {
        throw redirect(303, '/SCI-Voting-System/Student/Dashboard');
    } else if (userChecker === 'newUser') {
        throw redirect(303, '/Pending');
    } else if (userChecker === 'admin') {
        throw redirect(303, '/SCI-Voting-System/Admin/Dashboard');
    }
}