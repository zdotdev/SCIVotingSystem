import { redirect } from '@sveltejs/kit';
import { loginRefreshToken } from '$lib/uri';

export async function load({ fetch, cookies }) {
    try {
        // Check if refreshToken exists
        const response = await fetch(loginRefreshToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Sends cookies with the request
        });

        if (response.ok) {
            const data = await response.json();
            const user = data.user;

            // Redirect based on user role
            if (user === 'student') {
                throw redirect(307, '/Student'); // Temporary redirect
            } else if (user === 'newUser') {
                throw redirect(307, '/Pending');
            } else if (user === 'admin') {
                throw redirect(307, '/Admin');
            } else {
                throw redirect(307, '/Auth/Signin'); // Default redirection
            }
        }

        // If response is not OK, no redirect but allow user to see login page
        return { error: null };
    } catch (err) {
        console.error('Error in load function:', err);
        return { error: 'Failed to refresh session. Please log in again.' };
    }
}