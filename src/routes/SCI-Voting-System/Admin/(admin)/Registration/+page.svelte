<script>
    import Button from '$lib/Components/Button/Button.svelte';
    export let data;
    const { newUsersData, errorMessage } = data;
</script>

<main class="flex flex-wrap gap-4 justify-center mt-40">
    {#if errorMessage}
        <p class="text-red-500 text-4xl">{errorMessage}</p>
    {/if}
    {#each newUsersData as user}
        <div class="w-fit flex items-center space-x-4 p-4 border-gray-200 rounded-lg shadow-md">
            <div class="w-24 h-24 rounded-full bg-black"></div>
            <div class="flex flex-col gap-2">
                <h2 class="text-xl font-bold">{user.name}</h2>
                <div class="flex gap-4">
                    <p>{user.studentId}</p>
                    <p>|</p>
                    <p>{user.email}</p>
                </div>
                <div class="flex gap-4 justify-center">
                    <form method="POST" action="?/patchUser">
                        <input type="hidden" name="id" value={user._id} />
                        <Button type="submit" color="green" text="Accept" />
                    </form>
                    <form method="POST" action="?/deleteUser">
                        <input type="hidden" name="id" value={user._id} />
                        <Button type="submit" color="red" text="Delete" />
                    </form>
                </div>
            </div>
        </div>
    {/each}
</main>
