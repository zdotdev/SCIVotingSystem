<script>
    import formatDate from '$lib/Helpers/dateFormatter.js';
    import Button from '$lib/Components/Button/Button.svelte';
    import { browser } from '$app/environment';
    import { page } from '$app/stores';
    export let data;
    const { electionList, errorMessage, redirect } = data;
    const id = $page.params.id;
    
    if (redirect) {
        if (browser) {
            window.location.href = redirect;
        }
    }
    
</script>

<main>
    {#if errorMessage}
        <p class="text-red-500 text-4xl text-center">{errorMessage}</p>
    {/if}
    {#if electionList}
        <div class="p-96">
            <h1 class="text-6xl font-bold mb-8">{electionList.electionTitle}</h1>
            <p><strong>Start date:</strong> {formatDate(electionList.electionStart)}</p>
            <ul class="flex flex-col my-4">
                {#each electionList.electionCandidates as candidate}
                    <li>
                        <p><strong>Name:</strong> {candidate.candidateName}</p>
                        <p><strong>Position:</strong> {candidate.candidatePosition}</p>
                        <p><strong>Votes:</strong> {candidate.candidateVotes}</p>
                    </li>
                {/each}
            </ul>
            <p><strong>End date:</strong> {formatDate(electionList.electionEnd)}</p>
            <p><strong>Announcement date:</strong> {formatDate(electionList.displayElection)}</p>
            <div class="flex my-4 gap-4">
                <Button type='button' func={() => {if(browser){window.location.href = `/SCI-Voting-System/Admin/Election/${id}/Edit`}}} text='Edit' color='blue' />
                <form method="POST">
                    <input type="hidden" name="id" value={electionList._id} />
                    <Button type="submit" color="red" text="Delete" />
                </form>
            </div>
        </div>
    {/if}
</main>