<script>
    import Button from '$lib/Components/Button/Button.svelte';
    import { browser } from '$app/environment';
    export let data;
    let candidateCount = 0;
    if (data?.redirect) {
        window.location.href = data.redirect;
    }
    
</script>

<main class="flex justify-center items-center min-h-screen">
    <form method="POST" class="w-fit flex flex-col gap-8 items-center space-x-4 p-8 border-gray-200 rounded-lg shadow-md">
        <div class="flex flex-col gap-4">
            <label for="electionTitle">Title:</label>
            <input type="text" id="electionTitle" name="electionTitle" placeholder="Title" required>
        </div>
        <div class="flex flex-col gap-4">
            <label for="electionStart">Start Date:</label>
            <input type="date" id="electionStart" name="electionStart" required>
        </div>
        <div class="flex flex-col gap-4">
            <label for="electionEnd">End Date:</label>
            <input type="date" id="electionEnd" name="electionEnd" required>
        </div>
        <div class="flex flex-col gap-4">
            <p>Candidates:</p>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-4">
                    {#each Array(candidateCount) as _, i}
                        <div class="flex flex-col gap-4">
                            <label for="candidate_name_{i}">Name:</label>
                            <input type="text" id="candidate_name_{i}" name="candidate_name_{i}" placeholder="Name">
                        </div>
                        <div class="flex flex-col gap-4">
                            <label for="candidate_position_{i}">Position:</label>
                            <input type="text" id="candidate_position_{i}" name="candidate_position_{i}" placeholder="Position">
                        </div>
                        <div class="flex flex-col gap-4">
                            <label for="candidate_partylist_{i}">Partylist:</label>
                            <input type="text" id="candidate_partylist_{i}" name="candidate_partylist_{i}" placeholder="Partylist">
                        </div>
                    {/each}
                </div>
                <div>
                    <Button func={() => {candidateCount += 1}} color="gray" text="Add Candidate" />
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <label for="displayElection">Announcement Date:</label>
            <input type="date" id="displayElection" name="displayElection" required>
        </div>
        <input type="text" id="candidateCount" name="candidateCount" bind:value={candidateCount} hidden>
        <div>
            <Button type="submit" color="blue" text="Create Election" />
        </div>
    </form>
</main>

