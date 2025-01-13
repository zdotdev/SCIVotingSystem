<script>
    export let data;
    export let error;
    export let status;
    export let message;
    export let ActionButton
    export let ActionButtonTwo
</script>
<main class="flex flex-wrap gap-4 justify-center">
    {#if error}
        <p class="text-red-500 text-4xl">{error}</p>
    {/if}
    {#if status === 404}
        <p class="text-red-500 text-4xl">{message}</p>
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
                <ActionButton userId={item._id} />
                {#if ActionButtonTwo}
                    <ActionButtonTwo userId={item._id} />
                {/if}
            </div>
        </div>
    {/each}
</main>