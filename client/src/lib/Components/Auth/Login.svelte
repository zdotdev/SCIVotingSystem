<script>
    let error = null;
    async function login() {
        if (!document.getElementById('email').value || !document.getElementById('password').value) {
            error = 'Please fill in all fields.';
            return;
        }

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('http://localhost:3000/api/auth/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });
        const data = await response.json();
        if (response.ok) {
                const user = data.user;

                if (user == 'student') {
                    window.location.href = '/Client';
                } else if (user == 'admin') {
                    window.location.href = '/Admin';
                } else if (user == 'newUser') {
                    window.location.href = '/';
                }
            } else {
                error = data.message;
            }
    }
</script>

<main class="flex justify-center items-center h-screen">
    <form action="POST" class="w-fit flex flex-col  gap-8 items-center space-x-4 p-8 border-gray-200 rounded-lg shadow-md">
        
        <h2 class="text-4xl font-bold">Login</h2>
        <div class="flex flex-col gap-4">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required placeholder="*">
        </div>
        <div class="flex flex-col gap-4">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required placeholder="*">
        </div>
        {#if error}
            <p style="color: red;">{error}</p>
        {/if}
        <div class="flex gap-4">
            <button type="button" on:click={() => {login()}} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Login</button>
            <button type="button" on:click={() => {window.location.href = '/Auth/SignUp'}} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Sign up</button>
        </div>
    </form>
</main>