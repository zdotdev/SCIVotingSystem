// import { fail, error } from '@sveltejs/kit';
// import { loginRefreshToken } from '$lib/uri';

// export async function load({ fetch }) {
//     let userChecker = null;
//     try {
//         const authResponse = await fetch(loginRefreshToken, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//         });

//         const authData = await authResponse.json();

//         if (!authResponse.ok) {
//             throw error(401, { errorMessage: 'Unauthorized: Failed to refresh session' });
//         }

//         userChecker = authData.user;

//         if (userChecker !== 'admin') {
//             throw error(403, { errorMessage: 'Forbidden: Admins only' });
//         }
//     } catch (err) {
//         console.error('Error in load function:', err);
//         throw error(500, { errorMessage: 'Failed to load data. Please try again later.' })
//     }
// }