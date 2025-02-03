<script>
    import ElectionResults from '$lib/Components/Election/ElectionResult.svelte';
    import Container from '$lib/Components/Container/Container.svelte';
    import Election from '$lib/Components/Container/Election.svelte';
	import Ribbon from '$lib/Components/Ribbon/Ribbon.svelte';
    import { Button } from '$lib/Components/ui/button/index';
    import { Progress } from "$lib/Components/ui/progress/index";

    export let data;

    const { electionData, displayedData, userChecker, name, userCount, studentId, errorMessage } = data;
    const totalVoteCount = electionData.electionVoters.length

</script>

<Container>
    <Ribbon location={"Dashboard"} {name} {studentId} />
    <main class="h-fit w-full flex gap-56">
        {#if errorMessage}
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-lg">
                <p>{errorMessage}</p>
            </div>
        {:else}
            {#if electionData}
            <Election {totalVoteCount} {userCount} {electionData} />
            
            {:else}
            <ElectionResults {displayedData} />
            {/if} 
        {/if}
    </main>
</Container>
