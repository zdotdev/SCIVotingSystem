import { error, fail, redirect } from '@sveltejs/kit';
import { signIn } from '$lib/uri';

export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const password = formData.get('password');
        let userChecker = null;

        if (!email || !password) {
            return fail(400, { errorMessage: 'Email and password are required.' });
        }
        
        if (!emailRegex.test(email)) {
            return fail(400, { errorMessage: 'Invalid email format.' });
        }

        try {
            const response = await fetch(signIn, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            userChecker = data.user;

            if (!response.ok) {
                return fail(400, { errorMessage: data.message || 'Sign in failed.' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            throw error(500, { errorMessage: 'An internal error occurred. Please try again.' });
        }
        if (userChecker === 'student') {
            throw redirect(303, '/SCI-Voting-System/Student/Dashboard');
        } else if (userChecker === 'newUser') {
            throw redirect(303, '/Pending');
        } else if (userChecker === 'admin') {
            throw redirect(303, '/SCI-Voting-System/Admin/Dashboard');
        } else {
            throw error(400, { errorMessage: 'Invalid user role.' });
        }
    }
};
