<script>
    import Button from '$lib/Components/Button/Button.svelte';
	import Container from '$lib/Components/Container/Container.svelte';
    import Ribbon from '$lib/Components/Ribbon/Ribbon.svelte';
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
    <main class="flex flex-col gap-8 p-4">
        {#if errorMessage}
            <p class="text-red-500 text-4xl text-center">{errorMessage}</p>
        {/if}

        {#if Object.keys(groupedUsers).length > 0}
            {#each Object.entries(groupedUsers) as [course, users]}
                <section class="w-full p-4 border rounded-lg shadow-lg bg-gray-50">
                    <h2 class="text-2xl font-bold text-gray-700 mb-4">{course}</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {#each users as user}
                            <div class="flex flex-col items-center space-y-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                                <div class="w-24 h-24 rounded-full bg-black"></div>
                                <div class="flex flex-col gap-1 items-center">
                                    <h3 class="text-xl font-semibold text-gray-800">{user.name}</h3>
                                    <p class="text-gray-600">{user.studentId}</p>
                                    <p class="text-gray-600">{user.email}</p>
                                </div>
                                <div class="flex gap-4 justify-center">
                                    <form method="POST" action="?/patchUser">
                                        <input type="hidden" name="id" value={user._id} />
                                        <Button type="submit" color="green" text="Accept" />
                                    </form>
                                    <form method="POST" action="?/deleteUser">
                                        <input type="hidden" name="id" value={user._id} />
                                        <Button type="submit" color="red" text="Delete" />
                                    </form>
                                </div>
                            </div>
                        {/each}
                    </div>
                </section>
            {/each}
        {:else}
            <p class="text-gray-500 text-center text-2xl">No users to display.</p>
        {/if}
    </main>
</Container>