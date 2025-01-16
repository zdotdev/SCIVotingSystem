<script>
    import { onMount } from "svelte";

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/loginWithRefreshToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                const user = data.user;
                if (user === 'student' || user === 'admin' || user === 'newUser') {
                    window.location.href = '/';
                } else {
                    console.error(data.message);
                }
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    });

    let error = null;

    async function signUp(){
        if (!document.getElementById('name').value || !document.getElementById('email').value || !document.getElementById('password').value || !document.getElementById('image').value || !document.getElementById('studentId').value) {
            error = 'Please fill in all fields.';
            return;
        }

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const studentId = document.getElementById('studentId').value;

        const response = await fetch('http://localhost:3000/api/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                name,
                email,
                password,
                image,
                studentId
            })
        });
        const data = await response.json();
        if (response.ok) {
            const user = data.user;

            if (user == 'student' || user == 'admin' || user == 'newUser') {
                window.location.href = '/'
            }
        } else {
            error = data.message;
        }
    }

</script>

<main class="flex justify-center items-center h-screen">
    <form action="POST" class="w-fit flex flex-col gap-8 items-center space-x-4 p-8 border-gray-200 rounded-lg shadow-md">
        <h2 class="text-4xl font-bold">Sign up</h2>
        <div class="flex flex-col gap-4">
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" placeholder="Juan Dela Cruz" required>
        </div>
        <div class="flex flex-col gap-4">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="myemail@email.com" required>
        </div>
        <div class="flex flex-col gap-4">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="abcd1234!" required>
        </div>
        <div class="flex flex-col gap-4">
            <label for="studentId">Student Id:</label>
            <input type="text" id="studentId" name="studentId" required>
        </div>
        {#if error}
            <p style="color: red;">{error}</p>
        {/if}
        <div class="flex gap-4">
            <button type="button" on:click={() => {signUp()}} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Sign up</button>
            <button type="button" on:click={() => {window.location.href = '/Auth/Login'}} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Login</button>
        </div>
    </form>
</main>