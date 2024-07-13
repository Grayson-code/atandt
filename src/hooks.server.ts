// Copyright (c) 2024 Adwaith
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// import { auth } from '$lib/firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import { redirect } from '@sveltejs/kit';

// export const handle = async ({ event, resolve }) => {
//     let user: any = null;

//     // Check Firebase Auth state
//     await new Promise<void>((resolve) => {
//         const unsubscribe = onAuthStateChanged(auth, (u) => {
//             user = u;
//             unsubscribe();
//             resolve();
//         });
//     });

//     // // If user is not authenticated and trying to access login or admin or / then redirect to login
//     if (!user && (event.url.pathname === '/login' || event.url.pathname === '/admin' || event.url.pathname === '/')) {
//         throw redirect(303, '/login');
//     }
//     // redirect the user to dashboard if he is trying to access admin and his userid is not YhJLXRoSwIRUnGT8pQZhePHX53r2
//     if (user && event.url.pathname === '/admin' && user.uid !== 'YhJLXRoSwIRUnGT8pQZhePHX53r2') {
//         throw redirect(303, '/dashboard');
//     }

//     // Proceed with the request
//     return await resolve(event);
// };