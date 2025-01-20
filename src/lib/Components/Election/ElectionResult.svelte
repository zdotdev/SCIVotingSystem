<script>
    export let displayedData = {};

    let electionTitle = displayedData?.electionTitle || '';
    let electionCandidates = displayedData?.electionCandidates || [];
    let electionVoters = displayedData?.electionVoters || [];
</script>

<div>
    <h1 class="text-4xl font-bold">Election Results</h1>
    <div class="mt-4">
        {#if electionTitle}
            <h2 class="text-2xl font-bold">{electionTitle}</h2>
            <p>Total student voted: {electionVoters.length}</p>
            <p class="text-lg">Candidates:</p>
            {#if electionCandidates.length > 0}
                <ul>
                    {#each electionCandidates as candidate}
                        <li class="mb-2">
                            <p class="text-lg font-semibold">{candidate.candidateName}</p>
                            <p class="text-sm text-gray-600">Votes: {candidate.candidateVotes}</p>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p class="text-gray-500">No candidates available.</p>
            {/if}
        {:else}
            <p class="text-gray-500">No election results to display.</p>
        {/if}
    </div>
</div>
