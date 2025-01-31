import { json } from '@sveltejs/kit';
import { election } from '$lib/Helpers/uri.js';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        try {
            const response = await fetch(`${election}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (id) {
                 return {success: true};
            } else {
                return { errorMessage: 'Failed to delete election' };
            }
        } catch (error) {
            console.error('Error deleting election:', error);
            return json({ errorMessage: 'An error occurred while deleting the election' });
        }
    }
};
