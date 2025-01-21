<script>
    import Button from '$lib/Components/Button/Button.svelte';
    export let data;
    const { usersData, errorMessage } = data;
</script>

<main class="flex flex-wrap gap-4 justify-center mt-40">
    {#if errorMessage}
        <p class="text-red-500 text-4xl">{errorMessage}</p>
    {/if}
    {#each usersData as user}
        <div class="w-fit flex items-center space-x-4 p-4 border-gray-200 rounded-lg shadow-md">
            <div class="flex flex-col gap-2">
                <h2 class="text-xl font-bold">{user.name}</h2>
                <h3>{user.studentCourse}</h3>
                <div class="flex gap-4">
                    <p>{user.studentId}</p>
                    <p>|</p>
                    <p>{user.email}</p>
                </div>
                <div class="flex gap-4 justify-center">
                    <form method="POST">
                        <input type="hidden" name="id" value={user._id} />
                        <Button type="submit" color="red" text="Delete" />
                    </form>
                </div>
            </div>
        </div>
    {/each}
</main>
