<script>
    import { signOut } from "$lib/helpers/uri";
    import {error, fail} from '@sveltejs/kit'
    import LogoutImage from '$lib/Assets/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
    import Logo from '$lib/Assets/icon.png';
    export let title = null;
    export let path = null;
</script>

<main>
    <nav class="w-screen z-10 flex justify-between items-center bg-red-900 h-16 sm:h-20 md:h-24 lg:h-20 fixed top-0 left-0 px-4 sm:px-6 md:px-8">
        <button type="button" on:click={() => {window.location.href = `/${path}/${title}`}}>
            <img class="h-12 w-12" src="{Logo}" alt="Home">
        </button>
        <h1 class="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium sm:font-bold">SCI Voting System</h1>
    </nav>
</main>
