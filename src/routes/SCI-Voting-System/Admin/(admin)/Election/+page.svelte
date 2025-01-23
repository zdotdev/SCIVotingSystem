<script>
    import Button from "$lib/Components/Button/Button.svelte";
    import formatDate from '$lib/dateFormatter.js'
    import { browser } from "$app/environment";
    export let data;
    const {electionList, errorMessage} = data;
    
</script>
<main class="p-48  flex flex-wrap gap-4 justify-center">
    {#if errorMessage}
        <p class="text-red-500 text-4xl text-center">{errorMessage}</p>
    {/if}
    {#if electionList.length > 0}
        {#each electionList as election}
            <div>
                <h2>{election.electionTitle}</h2>
                <p>Start: {formatDate(election.electionStart)}</p>
                <p>End: {formatDate(election.electionEnd)}</p>
                <p>Display date: {formatDate(election.displayElection)}</p>
                <Button type='Button' func={() => {if(browser){window.location.href = `/SCI-Voting-System/Admin/Election/${election._id}`}}} color='blue' text="View"/>
            </div>
        {/each}
    {:else}
        <p>No election data to display.</p>
    {/if}
    <Button type='Button' func={() => {if(browser){window.location.href = '/SCI-Voting-System/Admin/Election/Create'}}} color='blue' text="Create election"/>
</main>