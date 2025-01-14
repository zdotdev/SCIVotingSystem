<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import DeletElectionButton from '$lib/Components/Buttons/DeletElectionButton.svelte';
    import EditElectionButton from '$lib/Components/Buttons/EditElectionButton.svelte';

    let data = {};

    onMount(async () => {
        const electionId = $page.params.id;

        try {
            const response = await fetch(`http://localhost:3000/api/election/${electionId}`);
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

<main>
    <h1 class="text-6xl font-bold">{data.electionTitle}</h1>
    <p>{data.electionStart}</p>
    <ul>
        {#each data.electionCandidates as candidate}
            <li>
                <p>{candidate.candidateName}</p>
                <p>{candidate.candidatePosition}</p>
                <p>{candidate.candidateVotes}</p>
            </li>
        {/each}
    </ul>
    <p>{data.electionEnd}</p>
    <p>{data.displayElection}</p>
    <EditElectionButton id={data._id} />
    <DeletElectionButton id={data._id} />
</main>