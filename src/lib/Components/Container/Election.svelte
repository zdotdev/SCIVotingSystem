<script>
    import { Button } from '$lib/Components/ui/button/index';
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { Calendar } from "$lib/Components/ui/calendar/index";
    import { browser } from '$app/environment';
    import ElectionDetails from '$lib/Components/Container/ElectionDetails.svelte';
    import VotingProgressContainer from '$lib/Components/Container/VotingProgressContainer.svelte';
    import ElectionResultsContainer from '$lib/Components/Container/ElectionResultsContainer.svelte';
    import RangeCalendar from '$lib/Components/Container/RangeCalendar.svelte';
    import Graph from '$lib/Components/Chart/Graph.svelte';
    export let electionData = {};
    export let totalVoteCount = 0;
    export let userCount = 0;
    export let electionStatus = 'Active';

    let electionStart = electionData.electionStart;
    let electionEnd = electionData.electionEnd;
    
    
    let value = today(getLocalTimeZone());
</script>

<main class="flex flex-col w-screen py-8 px-28">
    <div class="flex justify-between items-center pb-8">
        <h2 class="text-4xl font-bold">{electionStatus} Election</h2>
        <Button onclick={() => {if(browser){window.location.reload()}}}>Refresh</Button>
    </div>
    <div class="flex">
        <div>
            <div class="flex gap-8">
                <ElectionDetails {electionData} />
                <VotingProgressContainer {totalVoteCount} {userCount} />
            </div>
            <div>
                <ElectionResultsContainer {electionData} />
            </div>
            <div>
                <Graph />
            </div>
        </div>
        <div class="w-fit ml-8">
            {#if electionStatus === 'Active'}
                <RangeCalendar {electionStart} {electionEnd} />
            {:else}
                <Calendar type="single" bind:value class="rounded-md border shadow" />
            {/if}
        </div>
    </div>
</main>
