<script>
    import Button from '$lib/Components/Button/Button.svelte';
	import Container from '$lib/Components/Container/Container.svelte';
    import Ribbon from '$lib/Components/Ribbon/Ribbon.svelte';
    import * as Card from '$lib/Components/ui/card/index'
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
    <Ribbon {name} {studentId} />
    <main class="flex flex-col gap-8 p-8">
        {#if errorMessage}
            <p class="text-red-500 text-4xl text-center">{errorMessage}</p>
        {/if}

        {#if Object.keys(groupedUsers).length > 0}
            {#each Object.entries(groupedUsers) as [course, users]}
                <section class="w-full p-4 border rounded-lg shadow-lg bg-gray-50">
                    <h2 class="text-2xl font-bold text-gray-700 mb-4">{course}</h2>
                    <div class="flex justify-center flex-wrap gap-6">
                        {#each users as user}
                        <Card.Root>
                            <Card.Header>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Description>{user.studentId}</Card.Description>
                                <Card.Description>{user.email}</Card.Description>
                            </Card.Header>
                            <Card.Footer>
                                <div class="flex gap-4 pt-8 justify-center">
                                    <form method="POST" action="?/patchUser">
                                        <input type="hidden" name="id" value={user._id} />
                                        <Button type="submit" color="green" text="Accept" />
                                    </form>
                                    <form method="POST" action="?/deleteUser">
                                        <input type="hidden" name="id" value={user._id} />
                                        <Button type="submit" color="red" text="Delete" />
                                    </form>
                                </div>
                            </Card.Footer>
                        </Card.Root>
                        {/each}
                    </div>
                </section>
            {/each}
        {:else}
            <p class="text-gray-500 text-center text-2xl">No users to display.</p>
        {/if}
    </main>
</Container>