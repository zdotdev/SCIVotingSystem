import { fail, redirect } from '@sveltejs/kit';
import { signIn } from '$lib/uri';

export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');

        // Validate the form inputs
        if (!email || !password) {
            return fail(400, { errorMessage: 'Email and password are required.' });
        }

        try {
            // Send the login data to your backend API
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

                // Redirect based on user role
                if (user === 'student') {
                    throw redirect(303, '/Student');
                } else if (user === 'newUser') {
                    throw redirect(303, '/Pending');
                } else if (user === 'admin') {
                    throw redirect(303, '/Admin');
                } else {
                    return fail(400, { errorMessage: 'Invalid user role.' });
                }
            } else {
                // Handle login error from the API
                return fail(response.status, { errorMessage: data.message || 'Login failed.' });
            }
        } catch (error) {
            console.error('Error during login:', error);
            return fail(500, { errorMessage: 'An internal error occurred. Please try again.' });
        }
    },
};
