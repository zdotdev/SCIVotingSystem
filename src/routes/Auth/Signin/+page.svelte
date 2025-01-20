<script>
    import { onMount } from 'svelte';

    export let form; // This will contain the data passed from the server

    let email = '';
    let password = '';
</script>

<main class="flex justify-center items-center h-screen">
    <form method="POST" class="w-fit flex flex-col gap-8 items-center space-x-4 p-8 border-gray-200 rounded-lg shadow-md">
        <h2 class="text-4xl font-bold">Login</h2>
        <div class="flex flex-col gap-4">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" bind:value={email} required placeholder="*" />
        </div>
        <div class="flex flex-col gap-4">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" bind:value={password} required placeholder="*" />
        </div>

        {#if form?.errorMessage}
            <p class="text-red-500">{form.errorMessage}</p>
        {/if}

        <div class="flex gap-4">
            <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Login
            </button>
            <button type="button" on:click={() => window.location.href = '/Auth/Signup'} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Sign up
            </button>
        </div>
    </form>
</main>
