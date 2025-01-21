import { fail, error } from '@sveltejs/kit';
import { loginRefreshToken } from '$lib/uri';
import { browser } from '$app/environment';

export async function load({ fetch, cookies }) {
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

        if (browser && response.ok) {
            if (user === 'student') {
                window.location.href = '/SCI-Voting-System/Student/Dashboard';
            } else if (user === 'newUser') {
                window.location.href = '/Pending' ;
            } else if (user === 'admin') {
                window.location.href = '/SCI-Voting-System/Admin/Dashboard' ;
            }
        }
    } catch (err) {
        console.error('Error in load function:', err);
        throw error(500,{ error: 'Failed to refresh session. Please log in again.' });
    }
}