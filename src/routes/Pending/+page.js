import { loginRefreshToken } from '$lib/uri';
import { error, fail } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const load = async ({ fetch, cookies }) => {
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
        userChecker = authData.user;
        
        if (authResponse.ok && browser) {
            if (userChecker === 'student') {
                window.location.href = '/SCI-Voting-System/Student/Dashboard';
            } else if (userChecker === 'admin') {
                window.location.href = '/SCI-Voting-System/Admin/Dashboard';
            }
        }
    } catch (err) {
        console.error('Error in load function:', err);
        throw error(500, { errorMessage: 'Forbidden: Admins only' });
    }
};
