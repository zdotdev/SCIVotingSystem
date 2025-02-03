<script>
    import formatDate from '$lib/Helpers/dateFormatter';
    import { Progress } from '$lib/Components/ui/progress/index';
    import { Button } from '$lib/Components/ui/button/index';
    import * as Card from '$lib/Components/ui/card/index';
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { Calendar } from "$lib/Components/ui/calendar/index.js";
    import { browser } from '$app/environment';
    export let electionData = {};
    export let totalVoteCount = 0;
    export let userCount = 0;
    export let displayedData = {};
    console.log(displayedData);
    
    const electionTitle = displayedData.electionTitle || '';
    const electionCandidates = displayedData.electionCandidates || [];
    const electionVoters = displayedData.electionVoters || [];
    const totalStudentVotesPercentage = (totalVoteCount / userCount) * 100;
    let value = today(getLocalTimeZone());
</script>

<main class="flex flex-col w-screen py-8 px-28">
    <div class="flex justify-between items-center pb-8">
        <h2 class="text-4xl font-bold">Active Election</h2>
        <Button onclick={() => {if(browser){window.location.reload()}}}>Refresh</Button>
    </div>
    <div class="flex">
        <div>
            <div class="flex gap-8">
                <section class="border rounded-md shadow p-6 h-fit">
                    {#if electionData}
                    <p class="text-3xl mb-4 font-bold">{electionData.electionTitle}</p>
                    <div>
                        <div>
                            <p class="text-lg text-gray-500">From {formatDate(electionData.electionStart)} to {formatDate(electionData.electionEnd)}. The announcement of the election results will be on {formatDate(electionData.displayElection)}.</p>
                        </div>
                        <div class="flex justify-end">
                            <Button onclick={() => {if(browser){window.location.href = `/SCI-Voting-System/Admin/Election`}}}>View</Button>
                        </div>
                    </div>
                    {:else}
                        <p class="text-gray-500">No active election available.</p>
                    {/if}
                </section>
                <section class="border rounded-md h-fit shadow p-6">
                    <div class="w-fit">
                        <p class="text-3xl mb-4 font-bold">Election Progress</p>
                        <div class="flex flex-col gap-4">
                            <Progress value={totalStudentVotesPercentage} />
                            <p class="text-lg text-gray-500 mb-3">Total student votes: {totalVoteCount} out of {userCount} students.</p>
                        </div>
                    </div>
                </section>
            </div>
            <div>
                <section class="border rounded-md shadow p-6 mt-8">
                    <p class="text-3xl mb-4 font-bold">Election Results</p>
                    {#if Object.keys(displayedData).length > 0}
                        <p>Add Table for election results here...</p>
                    {:else}
                        <p class="text-gray-500">Please Wait for the Election Results...</p>
                    {/if}
                    <div class="flex justify-between items-center">
                        
                    </div>
                </section>
            </div>
        </div>
        <div class="w-fit ml-8">
            <Calendar type="single" bind:value class="rounded-md border shadow" />
        </div>
    </div>
</main>
