<script>
    import { onMount } from 'svelte';

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/loginWithRefreshToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                const user = data.user;

                if (user == 'student') {
                    window.location.href = '/Client';
                } else if (user == 'admin') {
                    window.location.href = '/Admin';
                } else if (user == 'newUser') {
                    window.location.href = '/NewUser';
                } else {
                    console.error('Invalid user:', user);
                    window.location.href = '/Auth/Login';
                }
            } else {
                console.error('Authentication failed:', await response.json());
                window.location.href = '/Auth/Login';
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            window.location.href = '/Auth/Login';
        }
    });
</script>
<main class="flex justify-center items-center h-screen">
    <img src="/src/Image/1497.gif" alt="Loading..." class="" />
</main>