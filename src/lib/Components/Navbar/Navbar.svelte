<script>
    import { signOut } from "$lib/uri";
    import {error, fail} from '@sveltejs/kit'
    import LogoutImage from '$lib/Image/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
    import Logo from '$lib/Image/icon.png';
    export let title = null;
    export let path = null;
    
    async function signout() {
        try {
            const response = await fetch(signOut, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const result = await response.json();
                throw error(400, {errorMessage: result.message});
            }
        } catch (err) {
            throw error(400, {errorMessage: err.message}); 
        }
        window.location.href = '/Auth/Signin';
    }
</script>

<main>
    {#if path}
    <nav class="w-screen z-10 flex justify-between items-center bg-red-900 h-28 fixed top-0 left-0 px-8">
        <button type="button" on:click={() => {window.location.href = `/${path}/${title}`}}>
            <img class="h-12 w-12" src="{Logo}" alt="Home">
        </button>
        <h1 class="text-white text-4xl font-extrabold">SCI Voting System</h1>
        <button type="button" on:click={() => {signout()}} class="w-12 h-12 rounded-full bg-white flex content-center p-2">
            <img src="{LogoutImage}" alt="Logout">
        </button>
    </nav>
    {:else}
    <nav class="w-screen z-10 flex items-center bg-gray-800 h-16 fixed top-0 left-0 px-8">
        <button type="button" on:click={() => {signout()}} class="w-12 h-12 rounded-full bg-white ml-auto flex content-center p-2">
            <img src="{LogoutImage}" alt="Logout">
        </button>
    </nav>
    {/if}
</main>
