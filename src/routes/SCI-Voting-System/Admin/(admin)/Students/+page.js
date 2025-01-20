import { error } from '@sveltejs/kit'
import { loginRefreshToken } from '$lib/uri';

export async function load({ fetch, cookies }) {
    try {
        const response = await fetch(loginRefreshToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            const user = data.user;

            if (user != 'admin') {
                throw error(403,{ message: 'Forbidden' });
            }
        }

        return { error: null };
    } catch (err) {
        console.error('Error in load function:', err);
        throw error(500,{ message: 'Failed to refresh session. Please log in again.' });
    }
}