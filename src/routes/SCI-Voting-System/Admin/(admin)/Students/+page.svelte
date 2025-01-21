<script>
    import Button from '$lib/Components/Button/Button.svelte';
    export let data;
    const { usersData, errorMessage } = data;

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

<main class="flex flex-col gap-8 mt-20 p-4">
    {#if errorMessage}
        <p class="text-red-500 text-4xl text-center">{errorMessage}</p>
    {/if}

    {#if Object.keys(groupedStudentsByCourse).length > 0}
        {#each Object.entries(groupedStudentsByCourse) as [course, students]}
            <section class="w-fit p-4 ml-96 border rounded-lg bg-gray-50">
                <h2 class="text-2xl w-fit font-bold text-gray-700 mb-4">{course}</h2>
                <div class="grid grid-cols-1 w-fit sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {#each students as user}
                        <div class="flex flex-col items-start space-y-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                            <div class="flex flex-col gap-1">
                                <h3 class="text-xl font-semibold text-gray-800">{user.name}</h3>
                                <p class="text-gray-600">{user.studentId}</p>
                                <p class="text-gray-600">{user.email}</p>
                            </div>
                            <form method="POST">
                                <input type="hidden" name="id" value={user._id} />
                                <Button type="submit" color="red" text="Delete" />
                            </form>
                        </div>
                    {/each}
                </div>
            </section>
        {/each}
    {:else}
        <p class="text-gray-500 text-center text-2xl">No students available to display.</p>
    {/if}
</main>

