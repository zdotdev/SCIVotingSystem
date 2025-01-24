import { json, error, fail, redirect } from "@sveltejs/kit";
import { signUp } from "$lib/uri";

export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const password = formData.get("password");
        const studentId = formData.get("studentId");
        const studentCourse = formData.get("studentCourse");
        let userChecker = null;

        if (!name || !email || !password || !studentId || !studentCourse) {
            return json({ errorMessage: "All fields are required." });
        }
        if (!emailRegex.test(email)) {
            return fail(400, { errorMessage: 'Invalid email format.' });
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
            userChecker = data.user;
            
            if (!response.ok) {
                return fail(data.status, { errorMessage: data.message || 'Sign up failed.' });
            }
        } catch(error) {
            console.error("Error during signup:", error);
            throw error(500, { errorMessage: "An internal error occurred. Please try again." });
        }
        if (userChecker === 'student') {
            throw redirect(303, '/SCI-Voting-System/Student/Dashboard');
        } else if (userChecker === 'newUser') {
            throw redirect(303, '/Pending');
        } else if (userChecker === 'admin') {
            throw redirect(303, '/SCI-Voting-System/Admin/Dashboard');
        }
    }
}