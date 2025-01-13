<script>
    import { onMount } from "svelte";
    import ElectionContainer from "$lib/Components/Election/ElectionContainer.svelte";

    let data = [];
    let message = null;
    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/api/election/');
            const result = await response.json();

            if (response.ok) {
                data = result.election;
            } else {
                message = result.message;
            }
        } catch (err) {
            error = err.message;
        }
    });
</script>

<main class="flex flex-wrap gap-4 justify-center">
    {#if data.length > 0}
        {#each data as election}
            <ElectionContainer
                title={election.electionTitle}
                start={election.electionStart}
                end={election.electionEnd}
                displayDate={election.displayElection}
                id={election._id}
            />
        {/each}
    {:else}
        <p>{message}</p>
    {/if}
</main>