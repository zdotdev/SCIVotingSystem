<script>
    import { onMount } from 'svelte';
    import Admin from '$lib/Components/Admin/Admin.svelte';
    import Student from '$lib/Components/Student/Student.svelte';

    let userChecker = null;

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
                if (user === 'student') {
                    userChecker = 'student'
                } else if (user === 'admin') {
                    userChecker = 'admin';
                } else if (user === 'newUser') {
                    userChecker = 'newUser';
                } else {
                    console.error(data.message);
                    window.location.href = '/Auth/Login';
                }
            } else {
                console.error(data.message);
                window.location.href = '/Auth/Login';
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            window.location.href = '/Auth/Login';
        }
    });
</script>

{#if !userChecker}
    <main class="flex justify-center items-center h-screen">
        <img src="/src/Image/1497.gif" alt="Loading..." />
    </main>
{:else if userChecker === 'newUser'}
    <main class="flex justify-center items-center h-screen">
        <h1 class="text-4xl">Please wait for the admin to accept your registration.</h1>
    </main>
{:else if userChecker === 'student'}
    <Student />
{:else if userChecker === 'admin'}
    <Admin />
{/if}
