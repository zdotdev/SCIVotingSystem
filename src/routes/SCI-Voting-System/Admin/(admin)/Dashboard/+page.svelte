<script>
    import Container from '$lib/Components/Container/Container.svelte';
    import Election from '$lib/Components/Container/Election.svelte';
	import Ribbon from '$lib/Components/Ribbon/Ribbon.svelte';
    import { Button } from '$lib/Components/ui/button/index';
    import { Progress } from "$lib/Components/ui/progress/index";

    export let data;

    const electionData = data.electionData || null;
    const displayedData = data.displayedData || null;
    const name = data.name || null;
    const userCount = data.userCount || 0;
    const studentId = data.studentId || 0;
    const errorMessage = data.errorMessage || null;
    

    const totalVoteCount = electionData?.electionVoters?.length || 0;
</script>

<Container>
    <Ribbon location={"Dashboard"} {name} {studentId} />
    <main class="h-fit w-full flex gap-56">
        {#if errorMessage}
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-4 rounded-lg">
                <p>{errorMessage}</p>
            </div>
        {:else}
            {#if electionData.electionTitle}
                <Election {totalVoteCount} {userCount} {electionData} electionStatus='Active' />
            {:else if displayedData.electionTitle}
                <Election {totalVoteCount} {userCount} electionData={displayedData} electionStatus='Previous' />
            {:else}
                <Election />
            {/if}
        {/if}
    </main>
</Container>
