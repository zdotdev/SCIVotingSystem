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

    function formatDate(date) {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${month}-${day}-${year}`;
    }
</script>

<main>
    <h1 class="text-6xl font-bold mb-8">{data.electionTitle}</h1>
    <p><strong>Start date:</strong> {formatDate(data.electionStart)}</p>
    <ul class="flex flex-col my-4">
        {#each data.electionCandidates as candidate}
            <li>
                <p><strong>Name:</strong> {candidate.candidateName}</p>
                <p><strong>Position:</strong> {candidate.candidatePosition}</p>
                <p><strong>Votes:</strong> {candidate.candidateVotes}</p>
            </li>
        {/each}
    </ul>
    <p><strong>End date:</strong> {formatDate(data.electionEnd)}</p>
    <p><strong>Announcement date:</strong> {formatDate(data.displayElection)}</p>
    <div class="flex my-4 gap-4">
        <EditElectionButton id={data._id} />
        <DeletElectionButton id={data._id} />
    </div>
</main>