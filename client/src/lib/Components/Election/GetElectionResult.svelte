<script>
    import { onMount } from 'svelte';

    let dislayedElectionTitle = '';
    let electionCandidates = [];
    let electionVoters = [];
    let error = '';

    async function getDisplayed() {
        try {
            const response = await fetch(`http://localhost:3000/api/election/displayed`);
            const res = await response.json();
            const result = res.election[0];
            console.log(result);
            
            if (!response.ok && !result.election) {
                error = result.message || 'Failed to retrieve election data.';
            }else{
                dislayedElectionTitle = result.electionTitle;
                electionCandidates = result.electionCandidates || [];
                electionVoters = result.electionVoters || [];
            }
        } catch (err) {
            error = err.message || 'An error occurred while fetching data.';
            error = error;
        }
    }

    function formatDate(date) {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${month}-${day}-${year}`;
    }

    onMount(async () => {
        await getDisplayed();
    });
    
</script>

<main>
    <h1 class="text-4xl font-bold">Election Results</h1>
    <div class="mt-4">
        {#if error}
            <p class="text-red-500">{error}</p>
        {:else}
            <h2 class="text-2xl font-bold">{dislayedElectionTitle}</h2>
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
        {/if}
    </div>
</main>
