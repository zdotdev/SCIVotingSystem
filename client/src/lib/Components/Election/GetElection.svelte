<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let data = {};

    onMount(async () => {
        const electionId = $page.params.id;
        console.log(electionId);

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
    <h1>{data.electionTitle}</h1>
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
</main>