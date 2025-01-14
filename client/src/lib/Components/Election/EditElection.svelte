<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let electionTitle = '';
    let electionStart = '';
    let electionEnd = '';
    let displayElection = '';
    let electionCandidates = [];
    let error = '';
    let message = '';
    let electionId;

    $: electionId = $page.params.id;

    async function fetchElectionData() {
        try {
            const response = await fetch(`http://localhost:3000/api/election/${electionId}`);
            const result = await response.json();

            if (response.ok) {
                electionTitle = result.election.electionTitle;
                electionStart = result.election.electionStart;
                electionEnd = result.election.electionEnd;
                displayElection = result.election.displayElection;
                electionCandidates = result.election.electionCandidates;
            } else {
                message = result.message || 'Failed to retrieve election data.';
            }
        } catch (err) {
            error = err.message || 'An error occurred while fetching data.';
        }
    }

    async function updateElection() {
        try {
            const response = await fetch(`http://localhost:3000/api/election/${electionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    electionTitle,
                    electionStart,
                    electionEnd,
                    displayElection,
                    electionCandidates,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                message = 'Election updated successfully!';
            } else {
                message = result.message || 'Failed to update election.';
            }
        } catch (err) {
            error = err.message || 'An error occurred while updating the election.';
        }
    }

    function addCandidate() {
        electionCandidates = [
            ...electionCandidates,
            {
                candidateName: '',
                candidatePosition: '',
                candidateVotes: 0,
            },
        ];
    }

    function removeCandidate(index) {
        electionCandidates = electionCandidates.filter((_, i) => i !== index);
    }

    onMount(async () => {
        await fetchElectionData();
    });
</script>

<main class="pl-20 pt-20 ml-64 h-screen w-4/5">
    <h1 class="text-6xl font-bold">Edit Election</h1>
    {#if error}
        <p style="color: red;">Error: {error}</p>
    {:else if message}
        <p style="color: orange;">{message}</p>
    {/if}

    <form on:submit|preventDefault={updateElection} class="flex flex-col items-center justify-center">
        <div class="flex flex-col gap-4 my-4">
            <label class="flex flex-col gap-2">
                <strong>Election Title:</strong>
                <input class="w-fit" type="text" bind:value={electionTitle} required />
            </label>

            <label class="flex flex-col gap-2">
                <strong>Start Date:</strong>
                <input class="w-fit" type="date" bind:value={electionStart} required />
            </label>

            <label class="flex flex-col gap-2">
                <strong>End Date:</strong>
                <input class="w-fit" type="date" bind:value={electionEnd} required />
            </label>

            <label class="flex flex-col gap-2">
                <strong>Display Election Date:</strong>
                <input class="w-fit" type="date" bind:value={displayElection} required />
            </label>
        </div>
        <h2 class="text-2xl font-bold mt-4 mb-2">Candidates</h2>
        {#each electionCandidates as candidate, index}
            <div class="flex flex-col">
                <label class="flex flex-col gap-2">
                    <strong>Candidate Name:</strong>
                    <input class="w-fit" type="text" bind:value={candidate.candidateName} required />
                </label>

                <label class="flex flex-col gap-2">
                    <strong>Candidate Position:</strong>
                    <input class="w-fit" type="text" bind:value={candidate.candidatePosition} required />
                </label>

                <button class="w-fit my-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" on:click={() => removeCandidate(index)}>Remove Candidate</button>
            </div>
        {/each}
            <div class="flex gap-8">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" on:click={addCandidate}>Add Candidate</button>
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit" on:click={() => {window.location.href = '/Election'}}>Save Changes</button>
            </div>

    </form>
</main>
