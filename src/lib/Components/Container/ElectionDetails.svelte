<script>
    import { browser } from '$app/environment';
    import formatDate from '$lib/Helpers/dateFormatter';
    import { Button } from '$lib/Components/ui/button/index';
    export let electionData = null;
    export let userChecker = null;
    

</script>
<section class="border rounded-md shadow p-6 w-full h-auto">
    {#if electionData}
        <p class="text-3xl mb-4 font-bold">{electionData.electionTitle}</p>
        <div>
            <div>
                <p class="text-lg text-gray-500">From {formatDate(electionData.electionStart)} to {formatDate(electionData.electionEnd)}. The announcement of the election results will be on {formatDate(electionData.displayElection)}.</p>
            </div>
            {#if userChecker !== null && userChecker === 'admin'}
                <div class="flex justify-end">
                    <Button onclick={() => {if(browser){window.location.href = `/SCI-Voting-System/Admin/Election`}}}>View</Button>
                </div>
                {:else}
                <div class="flex justify-end">
                    <Button onclick={() => {if(browser){window.location.href = `/SCI-Voting-System/Student/Voting`}}}>Vote</Button>
                </div>
            {/if}
        </div>
    {:else}
        <p class="text-lg text-gray-500 mb-3">No election available.</p>
    {/if}
</section>