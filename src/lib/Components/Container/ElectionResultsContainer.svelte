<script>
    export let electionData = {};
    import * as Table from '$lib/Components/ui/table/index';
</script>
<section class="border rounded-md shadow p-6 mt-8">
    <p class="text-3xl mb-4 font-bold">Election Results</p>
    {#if Object.keys(electionData).length > 0}
        {#if new Date().toDateString() === new Date(electionData.displayElection).toDateString()}
            {#each electionData.electionCandidates as candidate}
                    {#each electionData.electionCandidates.sort((a, b) => {
                        const positions = ["President", "Vice president", "Secretary", "Auditor", "Treasurer", "PIO", "Project Manager", "Representatives", "Muse", "Escort"];
                        const positionComparison = positions.indexOf(a.position) - positions.indexOf(b.position);
                        if (positionComparison !== 0) return positionComparison;
                        return b.votes - a.votes;
                    }) as candidate}
                        <Table.Root>
                            <Table.Header>
                                <Table.Row>
                                    <Table.Head>Candidate Name</Table.Head>
                                    <Table.Head>Position</Table.Head>
                                    <Table.Head>Votes</Table.Head>
                                    <Table.Head>Result</Table.Head>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{candidate.candidateName}</Table.Cell>
                                    <Table.Cell>{candidate.candidatePosition}</Table.Cell>
                                    <Table.Cell>{candidate.candidateVotes}</Table.Cell>
                                    <Table.Cell>{candidate.candidateVotes === Math.max(...electionData.electionCandidates.filter(c => c.position === candidate.position).map(c => c.candidateVotes)) ? 'Win' : 'Lose'}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table.Root>
                    {/each}
            {/each}
        {:else}
            <p class="text-gray-500">Please wait for the election results...</p>
        {/if}
    {/if}
</section>