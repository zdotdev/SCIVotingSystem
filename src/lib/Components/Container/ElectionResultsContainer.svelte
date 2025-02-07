<script>
    import { sortCandidates } from '$lib/Helpers/candidateSorter';
    import * as Table from '$lib/Components/ui/table/index';
    export let electionData;

    let candidatesData = sortCandidates(electionData, electionData);
    

</script>
<section class="border rounded-md shadow p-6 mt-8 w-full">
    <p class="text-3xl mb-4 font-bold">Election Results</p>
    {#if electionData}
        {#if new Date().toDateString() === new Date(electionData.displayElection).toDateString()}
            {#each candidatesData as candidate}
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
        {:else}
            <p class="text-gray-500">Please wait for the election results...</p>
        {/if}
        {:else}
        <p class="text-lg text-gray-500 mb-3">No results available.</p>
    {/if}
</section>