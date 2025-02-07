<script>
    import { Button, Root } from "$lib/Components/ui/button/index";
    import formatDate from '$lib/Helpers/dateFormatter';
    import Container from "$lib/Components/Container/Container.svelte";
    import Ribbon from "$lib/Components/Ribbon/Ribbon.svelte";
    import * as Card from "$lib/Components/ui/card/index";
    import * as Table from "$lib/Components/ui/table/index";
    import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
    import { sortCandidates } from "$lib/Helpers/candidateSorter";
    import EditCandidateContainer from "$lib/Components/Container/EditCandidateContainer.svelte";
    import ElectionForm from "$lib/Components/Container/ElectionForm.svelte";
    import { browser } from "$app/environment";
	import { enhance } from "$app/forms";

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
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button>Create Election</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Header>Create Election</AlertDialog.Header>
                    <AlertDialog.Content>
                        <ElectionForm method={'POST'} action={'?/postAction'} />
                    </AlertDialog.Content>
                    <AlertDialog.Footer>
                        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog.Root>
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
                                            <Table.Cell>
                                                <AlertDialog.Root>
                                                    <AlertDialog.Trigger>
                                                        <Button>View</Button>
                                                    </AlertDialog.Trigger>
                                                    <AlertDialog.Content>
                                                        <AlertDialog.Header>
                                                            <AlertDialog.Title>{election.electionTitle}</AlertDialog.Title>
                                                            <AlertDialog.Description>
                                                                <Table.Root>
                                                                    <Table.Header>
                                                                        <Table.Row>
                                                                            <Table.Head>Candidates</Table.Head>
                                                                            <Table.Head>Position</Table.Head>
                                                                            <Table.Head>Votes</Table.Head>
                                                                            <Table.Head>Party</Table.Head>
                                                                        </Table.Row>
                                                                    </Table.Header>
                                                                    <Table.Body>
                                                                        {#each sortCandidates(election) as candidate}
                                                                            <Table.Row>
                                                                                <Table.Cell>{candidate.candidateName}</Table.Cell>
                                                                                <Table.Cell>{candidate.candidatePosition}</Table.Cell>
                                                                                <Table.Cell>{candidate.candidateVotes}</Table.Cell>
                                                                                <Table.Cell>{candidate.candidateParty}</Table.Cell>
                                                                            </Table.Row>
                                                                        {/each}
                                                                    </Table.Body>
                                                                </Table.Root>
                                                            </AlertDialog.Description>
                                                            <AlertDialog.Footer>
                                                                <AlertDialog.Root>
                                                                    <AlertDialog.Trigger>
                                                                        <Button>Edit</Button>
                                                                    </AlertDialog.Trigger>
                                                                    <AlertDialog.Content>
                                                                        <AlertDialog.Header>
                                                                            <AlertDialog.Title>{election.electionTitle}</AlertDialog.Title>
                                                                            <form method="POST" action="?/putAction">    
                                                                                <AlertDialog.Description>
                                                                                   <div class="max-h-[80vh] overflow-y-auto">
                                                                                        <input type="hidden" name="electionId" value={election._id}>
                                                                                        <div>
                                                                                            <label for="electionTitle">Election Title:</label>
                                                                                            <input class="border rounded p-2 w-full" type="text" name="electionTitle" value="{election.electionTitle}" required> 
                                                                                        </div>
                                                                                        <div>
                                                                                            <label for="electionStart">Election Start:</label>
                                                                                            <input class="border rounded p-2 w-full" type="datetime-local" name="electionStart" value={new Date(election.electionStart).toISOString().slice(0, 16)} required> 
                                                                                        </div>
                                                                                        <div>
                                                                                            <label for="electionEnd">Election End:</label>
                                                                                            <input class="border rounded p-2 w-full" type="datetime-local" name="electionEnd" value={new Date(election.electionEnd).toISOString().slice(0, 16)} required> 
                                                                                        </div>
                                                                                        <div>
                                                                                            <label for="displayElection">Election Announcement:</label>
                                                                                            <input class="border rounded p-2 w-full" type="datetime-local" name="displayElection" value={new Date(election.displayElection).toISOString().slice(0, 16)} required> 
                                                                                        </div>
                                                                                        <input type="text" name="electionId" bind:value={election._id} hidden>
                                                                                        <EditCandidateContainer candidate={election.electionCandidates} />
                                                                                    </div>
                                                                                </AlertDialog.Description>
                                                                                <div class="flex justify-center">
                                                                                    <Button type="submit" variant='accept'>Save</Button>
                                                                                </div>
                                                                            </form>
                                                                            <AlertDialog.Footer>
                                                                                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                                                                            </AlertDialog.Footer>
                                                                        </AlertDialog.Header>
                                                                    </AlertDialog.Content>
                                                                </AlertDialog.Root>
                                                                <form method="POST" action="?/deleteAction">
                                                                    <input type="hidden" name="electionId" bind:value="{election._id}">
                                                                    <Button type="submit" variant='destructive'>Delete</Button>
                                                                </form>
                                                                <AlertDialog.Cancel>Exit</AlertDialog.Cancel>
                                                            </AlertDialog.Footer>
                                                        </AlertDialog.Header>
                                                    </AlertDialog.Content>
                                                </AlertDialog.Root>
                                            </Table.Cell>
                                        </Table.Row>
                                    {/each}
                                </Table.Body>
                            </Table.Root>
                        </Card.Content>
                    </Card.Root>
                {/each}
            {:else}
                <p class="text-lg text-gray-500 mb-3">No Election Data to display.</p>
            {/if}
    </main>
</Container>