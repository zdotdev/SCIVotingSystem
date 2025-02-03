<script>
    import Button from '$lib/Components/Button/Button.svelte';
	import Container from '$lib/Components/Container/Container.svelte';
    import Ribbon from '$lib/Components/Ribbon/Ribbon.svelte';
    import * as Card from '$lib/Components/ui/card/index'
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
    <Ribbon {name} {studentId} />
    <main class="flex flex-col p-8 gap-8">
        {#if errorMessage}
            <p class="text-red-500 text-4xl text-center">{errorMessage}</p>
        {/if}

        {#if Object.keys(groupedStudentsByCourse).length > 0}
            {#each Object.entries(groupedStudentsByCourse) as [course, students]}
                <section class="w-full p-4 border rounded-lg shadow-lg bg-gray-50">
                    <h2 class="text-2xl w-fit font-bold text-gray-700 mb-4">{course}</h2>
                    <div class="flex justify-center flex-wrap gap-6">
                        {#each students as user}
                        <Card.Root>
                            <Card.Header>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Description>{user.studentId}</Card.Description>
                                <Card.Description>{user.email}</Card.Description>
                            </Card.Header>
                            <Card.Footer>
                                <form method="POST" class="flex pt-4 justify-center items-center w-full">
                                    <input type="hidden" name="id" value={user._id} />
                                    <Button type="submit" color="red" text="Delete" />
                                </form>
                            </Card.Footer>
                        </Card.Root>
                        {/each}
                    </div>
                </section>
            {/each}
        {:else}
            <p class="text-gray-500 text-center text-2xl">No students available to display.</p>
        {/if}
    </main>
</Container>

