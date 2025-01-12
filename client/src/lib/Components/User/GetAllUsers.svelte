<script>
    import { onMount } from 'svelte';
    import DeleteUserButton from '../Buttons/DeleteUserButton.svelte';

    let data = [];
    let message = '';
    let status = 0;
    let error = null;

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user');
            const result = await response.json();
            data = result.user;
            message = result.message;
            status = response.status;
        } catch (err) {
            error = err.message;
        }
    });
    
</script>

<main class="flex flex-wrap gap-4 justify-center">
    {#if error}
        <p style="color: red;">test</p>
    {/if}
    {#if status === 404}
        <p style="color: red;">{message}</p>
    {/if}
    {#each data as item}
        <div class="w-fit flex items-center space-x-4 p-4 border-gray-200 rounded-lg shadow-md">
            <div class="w-24 h-24 rounded-full bg-black"></div>
            <div class="flex flex-col gap-2">
                <h2 class="text-xl font-bold">{item.name}</h2>
                <div class="flex gap-4">
                    <p>{item.studentId}</p>
                    <p>|</p>
                    <p>{item.email}</p>
                </div>
                <DeleteUserButton userId={item._id} />
            </div>
        </div>
    {/each}
</main>