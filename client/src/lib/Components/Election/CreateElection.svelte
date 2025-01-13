<script>
    let candidateCount = 1;

    async function createElection() {
        const title = document.getElementById('title').value;
        const start_date = document.getElementById('start_date').value;
        const end_date = document.getElementById('end_date').value;
        const display_date = document.getElementById('display_date').value;

        if (!title || !start_date || !end_date || !display_date) {
            console.error('Please fill in all fields.');
            return;
        }

        const candidates = [];
        for (let i = 0; i < candidateCount; i++) {
            const candidateName = document.getElementById(`candidate_name_${i}`).value;
            const candidatePosition = document.getElementById(`candidate_position_${i}`).value;
            candidates.push({ candidateName, candidatePosition });
        }

        const election = { electionTitle: title, electionStart: start_date, electionEnd: end_date, displayElection: display_date, electionCandidates: candidates };
        console.log(election);
        

        const response = await fetch('http://localhost:3000/api/election', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(election)
        });
        const data = await response.json();
        if (response.ok) {
            window.location.href = '/Election';
        } else {
            error = data.message;
        }
    }

</script>

<main class="flex justify-center items-center min-h-screen">
    <form action="POST" class="w-fit flex flex-col gap-8 items-center space-x-4 p-8 border-gray-200 rounded-lg shadow-md">
        <div class="flex flex-col gap-4">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" placeholder="Title">
        </div>
        <div class="flex flex-col gap-4">
            <label for="start_date">Start Date:</label>
            <input type="date" id="start_date" name="start_date">
        </div>
        <div class="flex flex-col gap-4">
            <label for="end_date">End Date:</label>
            <input type="date" id="end_date" name="end_date">
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
                    {/each}
                </div>
                <div>
                    <button on:click|preventDefault={() => candidateCount += 1} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Add Candidate</button>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <label for="end_date">Announcement Date:</label>
            <input type="date" id="display_date" name="display_date">
        </div>
        <div>
            <button on:click|preventDefault={createElection} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Create Election</button>
        </div>
    </form>
</main>