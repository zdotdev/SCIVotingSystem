<script>
    import { sign_out } from "$helpers/uri";
    import {error, fail} from '@sveltejs/kit'
    import LogoutImage from '$lib/Assets/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg';
    import User from 'lucide-svelte/icons/user'
    import ChevronRight from 'lucide-svelte/icons/chevron-right'
    import * as AlertDialog from '$ui/alert-dialog/index';
    export let name = null
    export let studentId = null
    export let location = null

    async function sign_out_func() {
        try {
            const response = await fetch(sign_out, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const result = await response.json();
                throw error(400, result.message);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            throw error(400, errorMessage);
        }
        window.location.href = '/Auth/Signin';
    }
</script>

<nav class="flex justify-end pt-4 md:items-center md:pt-8 sm:pt-0 md:pr-28 md:pl-28 gap-4 md:justify-between">
    <div class="hidden sm:flex gap-4 items-center">
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
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <div class="border border-black border-l-2 border-r-0 border-b-0 border-t-0 pl-4">
                    <button type="button" class="w-12 h-12 bg-white flex content-center p-2">
                        <img src="{LogoutImage}" alt="Logout">
                    </button>
                </div>         
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Header>
                    <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                        <AlertDialog.Description>
                            This action cannot be undone. This will permanently logout your account.
                        </AlertDialog.Description>
                </AlertDialog.Header>
                <AlertDialog.Footer>
                    <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                    <AlertDialog.Action onclick={() => {sign_out_func()}}>Continue</AlertDialog.Action>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog.Root>
    </div>
</nav>