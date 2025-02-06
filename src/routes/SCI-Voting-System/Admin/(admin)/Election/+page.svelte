<script>
    import { Button } from "$lib/Components/ui/button/index";
    import formatDate from '$lib/Helpers/dateFormatter';
    import Container from "$lib/Components/Container/Container.svelte";
    import Ribbon from "$lib/Components/Ribbon/Ribbon.svelte";
    import * as Card from "$lib/Components/ui/card/index";
    import * as Table from "$lib/Components/ui/table/index";
    import { browser } from "$app/environment";

    export let data;
    const { electionList, name, studentId, errorMessage } = data;

    const groupElectionsByYear = (elections) => {
        const grouped = {};

        elections.forEach((election) => {
            const year = new Date(election.electionStart).getFullYear();

            if (!grouped[year]) {
                grouped[year] = [];
            }

            grouped[year].push(election);
        });

        return Object.keys(grouped).map((year) => ({
            year: parseInt(year, 10),
            elections: grouped[year],
        }));
    };

    const groupedElections = groupElectionsByYear(electionList);
</script>

<Container>
    <Ribbon location={"Election"} {name} {studentId} />
    <main class="flex flex-col justify-center py-8 px-28">
        {#if errorMessage}
            <p class="text-red-500 text-4xl text-center">{errorMessage}</p>
        {/if}
        <div class="ml-auto pt-4">
            <Button onclick={() => { if (browser) { window.location.href = '/SCI-Voting-System/Admin/Election/Create'; } }}>
                Create Election
            </Button>
        </div>
            {#if electionList.length > 0}
                {#each groupedElections as group}
                <h2 class="text-2xl font-bold mb-4">Elections in {group.year}</h2>
                    <Card.Root>
                        <Card.Content>
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.Head>Title</Table.Head>
                                        <Table.Head>Status</Table.Head>
                                        <Table.Head>Starting Date</Table.Head>
                                        <Table.Head>Ending Date</Table.Head>
                                        <Table.Head>Display Date</Table.Head>
                                        <Table.Head>Actions</Table.Head>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {#each group.elections as election}
                                        <Table.Row>
                                            <Table.Cell>{election.electionTitle}</Table.Cell>
                                            <Table.Cell>
                                                {#if new Date() < new Date(election.electionStart)}
                                                    Pending
                                                {:else if new Date() >= new Date(election.electionStart) && new Date() <= new Date(election.electionEnd)}
                                                    Ongoing
                                                {:else}
                                                    Released
                                                {/if}
                                            </Table.Cell>
                                            <Table.Cell>{formatDate(election.electionStart)}</Table.Cell>
                                            <Table.Cell>{formatDate(election.electionEnd)}</Table.Cell>
                                            <Table.Cell>{formatDate(election.displayElection)}</Table.Cell>
                                            <Table.Cell><Button onclick={() => {if(browser){window.location.href = `/SCI-Voting-System/Admin/Election/${election._id}`}}}>View</Button></Table.Cell>
                                        </Table.Row>
                                    {/each}
                                </Table.Body>
                            </Table.Root>
                        </Card.Content>
                    </Card.Root>
                {/each}
            {:else}
                <p>No election data to display.</p>
            {/if}
    </main>
</Container>