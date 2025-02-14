import { loginRefreshToken } from '$lib/Helpers/uri';
import { error, fail, redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const load = async ({ fetch, cookies }) => {
    let userChecker = null;
    try {
        const response = await fetch(loginRefreshToken, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        const authData = await response.json();
        userChecker = authData.user;
        
    } catch (err) {
        throw error(500, { errorMessage: "An internal error occurred. Please try again." });
    }
    if (userChecker === 'student') {
        throw redirect(303, '/SCI-Voting-System/Student/Dashboard');
    } else if (userChecker === 'admin') {
        throw redirect(303, '/SCI-Voting-System/Admin/Dashboard');
    } else {
        throw redirect(303, '/Auth/Signin');
    }
};
