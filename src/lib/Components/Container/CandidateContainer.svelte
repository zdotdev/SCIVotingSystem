<script>
    import { sortCandidates } from '$lib/Helpers/candidateSorter';
    import * as Table from '$lib/Components/ui/table/index';
    export let electionData;

    let candidatesData = sortCandidates(electionData, electionData);
    

</script>
<section class="border rounded-md shadow p-6 w-full">
    <p class="text-3xl mb-4 font-bold">Election Results</p>
    {#if electionData}
            {#each candidatesData as candidate}
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>Candidate Name</Table.Head>
                            <Table.Head>Position</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{candidate.candidateName}</Table.Cell>
                            <Table.Cell>{candidate.candidatePosition}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            {/each}
    {:else}
        <p class="text-lg text-gray-500 mb-3">No results available.</p>
    {/if}
</section>