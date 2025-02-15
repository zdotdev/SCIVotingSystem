<script>
	import Container from '$lib/Components/Container/Container.svelte';
    import Ribbon from '$lib/Components/Ribbon/Ribbon.svelte';
    import { Button } from '$lib/Components/ui/button/index';
    import * as Card from '$lib/Components/ui/card/index';
    import * as Table from '$lib/Components/ui/table/index';
    import * as AlertDialog from '$lib/Components/ui/alert-dialog/index';
    export let data;
    const { usersData, name, studentId, errorMessage } = data;

    function groupStudentsByCourse() {
        if (!Array.isArray(usersData)) {
            throw new Error('Invalid input: usersData must be an array');
        }
        return usersData.reduce((acc, student) => {
            const course = student.studentCourse || 'Unknown';
            if (!acc[course]) {
                acc[course] = [];
            }
            acc[course].push(student);
            return acc;
        }, {});
    }

    const groupedStudentsByCourse = groupStudentsByCourse();
</script>

<Container>
    <Ribbon location={"Students"} {name} {studentId} />
    <main class="flex flex-col py-8 px-28 gap-8">
        {#if errorMessage}
            <p class="text-red-500 text-4xl text-center">{errorMessage}</p>
        {/if}

        {#if Object.keys(groupedStudentsByCourse).length > 0}
            {#each Object.entries(groupedStudentsByCourse) as [course, students]}
                    <h2 class="text-2xl w-fit font-bold text-gray-700 mb-4">{course}</h2>
                    <Card.Root>
                        <Card.Content>
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.Head>Name</Table.Head>
                                        <Table.Head>Student ID</Table.Head>
                                        <Table.Head>Email</Table.Head>
                                        <Table.Head>Actions</Table.Head>
                                    </Table.Row>
                                </Table.Header>
                                {#each students as user}
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>{user.name}</Table.Cell>
                                            <Table.Cell>{user.studentId}</Table.Cell>
                                            <Table.Cell>{user.email}</Table.Cell>
                                            <Table.Cell>
                                                <AlertDialog.Root>
                                                    <AlertDialog.Trigger><Button variant="destructive">Delete</Button></AlertDialog.Trigger>
                                                    <AlertDialog.Content>
                                                        <AlertDialog.Header>
                                                            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
                                                            <AlertDialog.Description>
                                                                This action cannot be undone. This will permanently delete the account
                                                                and remove the data from our servers.
                                                            </AlertDialog.Description>
                                                        </AlertDialog.Header>
                                                        <AlertDialog.Footer>
                                                            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                                                            <form method="POST">
                                                                <input type="hidden" name="id" value={user._id} />
                                                                <AlertDialog.Action type="submit">Continue</AlertDialog.Action>
                                                            </form>
                                                        </AlertDialog.Footer>
                                                    </AlertDialog.Content>
                                                </AlertDialog.Root>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                {/each}
                            </Table.Root>
                        </Card.Content>
                    </Card.Root>
            {/each}
        {:else}
            <p class="text-gray-500 text-center text-2xl">No students available to display.</p>
        {/if}
    </main>
</Container>

