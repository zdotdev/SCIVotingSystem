import { fail } from '@sveltejs/kit';
import { user } from '$lib/Helpers/uri.js';

export const actions = {
    patchUser: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        try {
            const response = await fetch(`${user}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: 'student' }),
                credentials: 'include'
            });

            if (!response.ok) {
                return fail(400, { errorMessage: 'Failed to update user' });
            }
            
            return { success: true };
        } catch (error) {
            return fail(500, { errorMessage: 'An error occurred while updating the user' });
        }
    },

    deleteUser: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        try {
            const response = await fetch(`${user}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                return fail(400, { errorMessage: 'Failed to delete user' });
            }

            return { success: true };
        } catch (error) {
            return fail(500, { errorMessage: 'An error occurred while deleting the user' });
        }
    }
};
