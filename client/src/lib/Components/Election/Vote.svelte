<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    let candidateList = [];
    let groupedCandidates = {};
    let selectedCandidates = {};
    const id = $page.params.id;
    let votersId;

    onMount(async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/election/candidates/${id}`);
            const data = await res.json();
            candidateList = data.candidates || [];
            groupCandidatesByPosition();
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    });
    onMount(async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/auth/`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await res.json();
            votersId = data.user;
        } catch (error) {
            console.error("Error fetching voters:", error);
        }
    }); 

    // Group candidates by their position
    function groupCandidatesByPosition() {
        groupedCandidates = candidateList.reduce((acc, candidate) => {
            if (!acc[candidate.candidatePosition]) {
                acc[candidate.candidatePosition] = [];
            }
            acc[candidate.candidatePosition].push(candidate);
            return acc;
        }, {});
    }

    // Submit vote
    async function vote() {
        const votesData = Object.entries(selectedCandidates).map(([position, candidateId]) => ({
            candidateId,
            votes: 1
        }));

        if (votesData.length === 0) {
            alert("Please select a candidate for each position.");
            return;
        }

        const body = {
            votesData,
            votersId
        };
        console.log(body);
        

        try {
            const response = await fetch(`http://localhost:3000/api/election/vote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                alert("Vote submitted successfully!");
            } else {
                const error = await response.json();
                alert(`Error: ${error.message}`);
            }
        } catch (error) {
            console.error("Error submitting vote:", error);
            alert("Failed to submit your vote. Please try again.");
        }
        window.location.href = "/";
    }
</script>

<main class="pl-20 pt-20 ml-64 h-screen w-4/5">
    {#if Object.keys(groupedCandidates).length === 0}
        <h1 class="text-4xl text-center">No candidates available</h1>
    {:else}
        <h1 class="text-4xl text-center mb-4">Candidates</h1>
        <form on:submit|preventDefault={vote}>
            {#each Object.entries(groupedCandidates) as [position, candidates]}
                <div class="mb-8">
                    <h2 class="text-3xl font-bold mb-4">{position}</h2>
                    <div class="grid grid-cols-3 gap-4">
                        {#each candidates as candidate}
                            <div class="bg-white shadow-md rounded-lg p-4">
                                <label>
                                    <input
                                        type="radio"
                                        name={position}
                                        value={candidate._id}
                                        bind:group={selectedCandidates[position]}
                                    />
                                    <h3 class="text-2xl font-bold">{candidate.candidateName}</h3>
                                </label>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
            <button type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit Vote</button>
        </form>
    {/if}
</main>
