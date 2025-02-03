<script>
	import Container from '$lib/Components/Container/Container.svelte';
    import Ribbon from '$lib/Components/Ribbon/Ribbon.svelte';
    import { Button } from '$lib/Components/ui/button/index'
    import * as Card from '$lib/Components/ui/card/index'
    import * as Table from '$lib/Components/ui/table/index'
    export let data;
    const { newUsersData, name, studentId, errorMessage } = data;

    function groupUsersByCourse() {
        if (!Array.isArray(newUsersData)) {
            throw new Error('Invalid input: users must be an array');
        }
        return newUsersData.reduce((acc, user) => {
            const course = user.studentCourse;
            if (!acc[course]) {
                acc[course] = [];
            }
            acc[course].push(user);
            return acc;
        }, {});
    }

    const groupedUsers = groupUsersByCourse();
</script>

<Container>
    <Ribbon location={"Registration"} {name} {studentId} />
    <main class="flex flex-col gap-8 py-8 px-28">
        {#if errorMessage}
            <p class="text-red-500 text-4xl text-center">{errorMessage}</p>
        {/if}

        {#if Object.keys(groupedUsers).length > 0}
            {#each Object.entries(groupedUsers) as [course, users]}
                <section class="w-full p-4 border rounded-lg shadow-lg bg-gray-50">
                    <h2 class="text-2xl font-bold text-gray-700 mb-4">{course}</h2>
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                <Table.Head>Name</Table.Head>
                                <Table.Head>Student ID</Table.Head>
                                <Table.Head>Email</Table.Head>
                                <Table.Head>Actions</Table.Head>
                            </Table.Row>
                        </Table.Header>
                        {#each users as user}
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>{user.studentId}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>
                                        <div class="flex gap-4">
                                            <form method="POST" action="?/patchUser">
                                                <input type="hidden" name="id" value={user._id} />
                                                <Button type="submit" variant="outline">Accept</Button>
                                            </form>
                                            <form method="POST" action="?/deleteUser">
                                                <input type="hidden" name="id" value={user._id} />
                                                <Button type="submit">Reject</Button>
                                            </form>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        {/each}
                    </Table.Root>
                </section>
            {/each}
        {:else}
            <p class="text-gray-500 text-center text-2xl">No users to display.</p>
        {/if}
    </main>
</Container>