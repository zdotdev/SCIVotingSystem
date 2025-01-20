import { fail } from '@sveltejs/kit';
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

            if (response.ok) {
                const user = data.user;

                if (user === 'student') {
                    window.location.href = '/Student';
                } else if (user === 'newUser') {
                    window.location.href = '/Pending';
                } else if (user === 'admin') {
                    window.location.href = '/Admin/Dashboard';
                } else {
                    return fail(400, { errorMessage: 'Invalid user role.' });
                }
            } else {
                return fail(response.status, { errorMessage: data.message || 'Login failed.' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return fail(500, { errorMessage: 'An internal error occurred. Please try again.' });
        }
    },
};
