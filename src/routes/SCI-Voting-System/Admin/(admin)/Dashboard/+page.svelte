<script>
    import ActiveElection from '$lib/Components/Election/ActiveElection.svelte';
    import ElectionResults from '$lib/Components/Election/ElectionResult.svelte';

    export let data;

    const { electionData, displayedData, userChecker, errorMessage } = data;
    
</script>

<main class="pt-20 ml-64 h-screen w-4/5 flex gap-56">
    {#if errorMessage}
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-lg">
            <p>{errorMessage}</p>
        </div>
    {:else}
        <ActiveElection {electionData} {userChecker} />
        <ElectionResults {displayedData} />
        <p>{userChecker}</p>
    {/if}
</main>
