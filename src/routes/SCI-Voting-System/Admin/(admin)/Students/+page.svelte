<script>
	import Container from '$lib/Components/Container/Container.svelte';
    import Ribbon from '$lib/Components/Ribbon/Ribbon.svelte';
    import { Button } from '$lib/Components/ui/button/index';
    import * as Card from '$lib/Components/ui/card/index';
    import * as Table from '$lib/Components/ui/table/index';
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
    <main class="flex flex-col p-8 gap-8">
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
                                                <form method="POST">
                                                    <input type="hidden" name="id" value={user._id} />
                                                    <Button type="submit" variant={"destructive"}>Delete</Button>
                                                </form>
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

