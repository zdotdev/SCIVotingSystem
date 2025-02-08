<script>
    import EditCandidateContainer from "./editCandidateContainer.svelte";
    import { Button } from "$lib/Components/ui/button/index";
    export let electionData = null;
    export let action;
    export let method;
</script>

<form method="{method}" action="{action}">
    <div class="max-h-[80vh] overflow-y-auto p-2">
        <div>
            <label for="electionTitle">Election Title:</label>
            <input class="border rounded p-2 w-full" type="text" name="electionTitle" value="{electionData?.electionTitle}" required>
        </div>
        <div>
            <label for="electionStart">Election Start:</label>
            {#if electionData}
                <input class="border rounded p-2 w-full" type="datetime-local" name="electionStart" value={electionData.electionStart ? new Date(electionData.electionStart).toISOString().slice(0, 16) : ''} required>
            {:else}
                <input class="border rounded p-2 w-full" type="date" name="electionStart" required>
            {/if}
        </div>
        <div>
            <label for="electionEnd">Election End:</label>
            {#if electionData}
                <input class="border rounded p-2 w-full" type="datetime-local" name="electionEnd" value={electionData.electionEnd ? new Date(electionData.electionEnd).toISOString().slice(0, 16) : ''} required>
            {:else}
                <input class="border rounded p-2 w-full" type="date" name="electionEnd" required>
            {/if}
        </div>
        <div>
            <label for="displayElection">Election Announcement:</label>
            {#if electionData}
                <input class="border rounded p-2 w-full" type="datetime-local" name="displayElection" value={electionData.displayElection ? new Date(electionData.displayElection).toISOString().slice(0, 16) : ''} required>
            {:else}
                <input class="border rounded p-2 w-full" type="date" name="displayElection" required>
            {/if}
        </div>
        <EditCandidateContainer candidate={electionData?.electionCandidates} />
        {#if electionData}
            <input type="hidden" name="electionId" value="{electionData?._id}">
        {/if}
        <div class="flex justify-center">
            <Button type="submit" variant='accept'>Save</Button>
        </div>
    </div>
</form>