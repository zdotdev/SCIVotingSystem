import { fail } from '@sveltejs/kit';
import { user } from '$lib/Helpers/uri.js';

export const actions = {
    default: async ({ request }) => {
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
            console.error('Error deleting user:', error);
            return fail(500, { errorMessage: 'An error occurred while deleting the user' });
        }
    }
};
