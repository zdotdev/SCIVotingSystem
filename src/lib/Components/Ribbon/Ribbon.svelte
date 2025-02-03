<script>
    import { signOut } from "$lib/helpers/uri";
    import {error, fail} from '@sveltejs/kit'
    import LogoutImage from '$lib/Assets/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
    import Logo from '$lib/Assets/icon.png';
    import User from 'lucide-svelte/icons/user'
    import ChevronRight from 'lucide-svelte/icons/chevron-right'
    export let name = null
    export let studentId = null
    export let location = null

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

<nav class="flex items-center pt-8 pr-44 pl-28 gap-4 justify-between">
    <div class="flex gap-4 items-center">
        <ChevronRight/>
        <h2 class="text-3xl font-bold">{location}</h2>
    </div>
    <div class="flex gap-4 items-center">
        <div>
            <User />
        </div>
        <div class="flex flex-col justify-center items-center">
            <strong>{name}</strong>
            <p>{studentId}</p>
        </div>
        <div class="border border-black border-l-2 border-r-0 border-b-0 border-t-0 pl-4">
            <button type="button" on:click={() => {signout()}} class="w-12 h-12 bg-white flex content-center p-2">
                <img src="{LogoutImage}" alt="Logout">
            </button>
        </div>
    </div>
</nav>