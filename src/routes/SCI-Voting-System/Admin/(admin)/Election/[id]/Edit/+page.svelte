<script>
    import formatDate from '$lib/Helpers/dateFormatter.js';
    import { Button } from '$lib/Components/ui/button/index';
    import Container from '$lib/Components/Container/Container.svelte';

    export let data;
    const { electionList, errorMessage } = data;

    // Initialize form fields
    let electionTitle = electionList.electionTitle;
    let electionStart = electionList.electionStart || new Date().toISOString().split('T')[0];
    let electionEnd = electionList.electionEnd || new Date().toISOString().split('T')[0];
    let displayElection = electionList.displayElection || new Date().toISOString().split('T')[0];
    let electionCandidates = [...electionList.electionCandidates];

    // Add a new candidate
    function addCandidate() {
        electionCandidates = [
            ...electionCandidates,
            { candidateName: '', candidatePosition: '', candidateParty: '' },
        ];
    }

    // Remove a candidate by index
    function removeCandidate(index) {
        electionCandidates = electionCandidates.filter((_, i) => i !== index);
    }
</script>

<Container>
    <main class="pl-20 pt-20 ml-64 h-screen w-4/5">
        <h1 class="text-6xl font-bold">Edit Election</h1>

        {#if errorMessage}
            <p style="color: red;">Error: {errorMessage}</p>
        {/if}

        <form method="POST" class="flex flex-col items-center justify-center">
            <!-- Election Details -->
            <div class="flex flex-col gap-4 my-4">
                <label class="flex flex-col gap-2">
                    <strong>Election Title:</strong>
                    <input
                        name="electionTitle"
                        class="w-fit"
                        type="text"
                        bind:value={electionTitle}
                        required
                    />
                </label>

                <label class="flex flex-col gap-2">
                    <strong>Start Date:</strong>
                    <input
                        name="electionStart"
                        class="w-fit"
                        type="date"
                        bind:value={electionStart}
                        required
                    />
                </label>

                <label class="flex flex-col gap-2">
                    <strong>End Date:</strong>
                    <input
                        name="electionEnd"
                        class="w-fit"
                        type="date"
                        bind:value={electionEnd}
                        required
                    />
                </label>

                <label class="flex flex-col gap-2">
                    <strong>Display Election Date:</strong>
                    <input
                        name="displayElection"
                        class="w-fit"
                        type="date"
                        bind:value={displayElection}
                        required
                    />
                </label>
            </div>

            <!-- Candidates Section -->
            <h2 class="text-2xl font-bold mt-4 mb-2">Candidates</h2>

            {#each electionCandidates as candidate, index}
                <div class="flex flex-col gap-4 mb-4">
                    <label class="flex flex-col gap-2">
                        <strong>Candidate Name:</strong>
                        <input
                            name={`candidateName_${index}`}
                            class="w-fit"
                            type="text"
                            bind:value={candidate.candidateName}
                            required
                        />
                    </label>

                    <label class="flex flex-col gap-2">
                        <strong>Candidate Position:</strong>
                        <input
                            name={`candidatePosition_${index}`}
                            class="w-fit"
                            type="text"
                            bind:value={candidate.candidatePosition}
                            required
                        />
                    </label>

                    <label class="flex flex-col gap-2">
                        <strong>Candidate Party:</strong>
                        <input
                            name={`candidateParty_${index}`}
                            class="w-fit"
                            type="text"
                            bind:value={candidate.candidateParty}
                            required
                        />
                    </label>

                    <Button variant="destructive" onclick={() => removeCandidate(index)}>
                        Remove Candidate
                    </Button>
                </div>
            {/each}

            <!-- Hidden Fields -->
            <input type="hidden" name="candidateCount" value={electionCandidates.length} />
            <input type="hidden" name="id" value={electionList._id} />

            <!-- Action Buttons -->
            <div class="flex gap-8">
                <Button variant="outline" onclick={addCandidate}>
                    Add Candidate
                </Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
    </main>
</Container>