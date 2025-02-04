import { fail, error, redirect } from '@sveltejs/kit';
import { loginRefreshToken } from '$lib/Helpers/uri';
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
        userChecker = data.user;

        if (!response.ok) {
            throw fail(400, { errorMessage: data.message || 'Failed to refresh session. Please log in again.' });
        }
    } catch (err) {
        if (browser) {
            document.cookie = 'refreshToken=; Max-Age=0; path=/';
            document.cookie = 'accessToken=; Max-Age=0; path=/';
        }
    }
    
    if (userChecker === 'student') {
        throw redirect(303, '/SCI-Voting-System/Student/Dashboard');
    } else if (userChecker === 'newUser') {
        throw redirect(303, '/Pending');
    } else if (userChecker === 'admin') {
        throw redirect(303, '/SCI-Voting-System/Admin/Dashboard');
    } else {
        throw redirect(303, '/Auth/Signin');
    }
}