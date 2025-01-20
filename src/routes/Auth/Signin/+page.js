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

            if (user === 'student') {
                window.location.href = '/Student';
            } else if (user === 'newUser') {
                window.location.href = 307, '/Pending';
            } else if (user === 'admin') {
                window.location.href = '/Admin/Dashboard';
            } else {
                window.location.href = '/Auth/Signin';
            }
        }

        return { error: null };
    } catch (err) {
        console.error('Error in load function:', err);
        return { error: 'Failed to refresh session. Please log in again.' };
    }
}