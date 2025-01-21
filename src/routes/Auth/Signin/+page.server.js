import { fail, error } from '@sveltejs/kit';
import { signIn } from '$lib/uri';

export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            return fail(400, { errorMessage: 'Email and password are required.' });
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
            const user = data.user;

            if (response.ok) {
                if (user === 'student') {
                    return { redirect: '/SCI-Voting-System/Student/Dashboard' };
                } else if (user === 'newUser') {
                    return { redirect: '/Pending' };
                } else if (user === 'admin') {
                    return { redirect: '/SCI-Voting-System/Admin/Dashboard' };
                } else {
                    return fail(400, { errorMessage: 'Invalid user role.' });
                }
            } else {
                return fail(response.status, { errorMessage: data.message || 'Sign in failed.' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            throw error(500, { errorMessage: 'An internal error occurred. Please try again.' });
        }
    },
};
