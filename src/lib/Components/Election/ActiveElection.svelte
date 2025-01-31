<script>
    import formatDate from '$lib/Helpers/dateFormatter';
    export let electionData = {};
    export let userChecker = null;

</script>

<div>
    <h2 class="text-4xl font-bold">Active Election</h2>
    <div class="mt-4">
        {#if electionData?.electionTitle}
            <p class="text-2xl font-bold">{electionData.electionTitle}</p>
            <p class="text-lg">Start: {formatDate(electionData.electionStart)}</p>
            <p class="text-lg">End: {formatDate(electionData.electionEnd)}</p>
            {#if electionData.electionId}
                {#if userChecker === 'admin'}
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        on:click={() => { window.location.href = `/Election/Open/${electionData.electionId}`; }}>
                        View
                    </button>
                {:else if userChecker === 'student'}
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        on:click={() => { window.location.href = `/Election/Vote/${electionData.electionId}`; }}>
                        Vote
                    </button>
                {/if}
            {/if}
        {:else}
            <p class="text-gray-500">No active election available.</p>
        {/if}
    </div>
</div>
