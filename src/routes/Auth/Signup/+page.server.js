import { fail } from "@sveltejs/kit";
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
            
            if (response.ok) {
                const user = data.user;

                if (user === "student") {
                    window.location.href = "/Student";
                } else if (user === "newUser") {
                    window.location.href = "/Pending";
                } else if (user === "admin") {
                    window.location.href = "/Admin/Dashboard";
                } else {
                    return fail(400, { errorMessage: "Invalid user role." });
                }
            } else {
                return fail(response.status, { errorMessage: data.message || "Signup failed." });
            }
        }catch(error) {
            console.error("Error during signup:", error);
            return fail(500, { errorMessage: "An internal error occurred. Please try again." });
        }
    }
}