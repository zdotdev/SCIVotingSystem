<script>
    import { onMount } from 'svelte';

    let electionTitle = '';
    let electionStart = '';
    let electionEnd = '';
    let electionId = '';
    let error = '';
    let message = '';

    async function getActive() {
        try {
            const response = await fetch(`http://localhost:3000/api/election/active`);
            const result = await response.json();
            
            if (response.ok && result.election) {
                electionTitle = result.election.electionTitle;
                electionStart = result.election.electionStart
                electionEnd = result.election.electionEnd
                electionId = result.election._id;
            } else {
                message = result.message || 'Failed to retrieve election data.';
            }
        } catch (err) {
            error = err.message || 'An error occurred while fetching data.';
        }
    }

    function formatDate(date) {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${month}-${day}-${year}`;
    }

    onMount(async () => {
        await getActive();
    });
    
</script>

<main>
    <div>
        <h2 class="text-4xl font-bold">Active Election</h2>
        <div class="mt-4">
            {#if error}
                    <p class="text-red-500">{error}</p>
                {:else if message}
                    <p class="text-red-500">{message}</p>
                {:else if electionTitle}
                    <p class="text-2xl font-bold">{electionTitle}</p>
                    <p class="text-lg">Start: {formatDate(electionStart)}</p>
                    <p class="text-lg">End: {formatDate(electionEnd)}</p>
                {:else}
                    <p class="text-gray-500">No active election available.</p>
                {/if}
            {#if electionId}
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => {window.location.href = `/Election/Open/${electionId}`}}>View</button>
            {/if}
            </div>
    </div>
</main>
