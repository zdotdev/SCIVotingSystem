import { fail, error } from "@sveltejs/kit";
import { signUp } from "$lib/uri";

export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const studentId = formData.get("studentId");
        const studentCourse = formData.get("studentCourse");

        if (!name || !email || !password || !studentId || !studentCourse) {
            return fail(400, { errorMessage: "All fields are required." });
        }
        try {
            const response = await fetch(signUp, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, studentId, studentCourse }),
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
                }
            } else {
                throw fail(response.status, { errorMessage: data.message || 'Sign up failed.' });
            }
        } catch(error) {
            console.error("Error during signup:", error);
            throw error(500, { errorMessage: "An internal error occurred. Please try again." });
        }
    }
}