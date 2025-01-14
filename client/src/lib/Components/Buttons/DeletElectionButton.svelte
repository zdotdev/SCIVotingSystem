<script>
    export let id;

    async function deleteElection() {
        try {
            const response = await fetch(`http://localhost:3000/api/election/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data);
            }
        } catch (err) {
            error = err.message;
        }
        window.location.href = '/Election';
    }


</script>

<button on:click={() => {deleteElection()}} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
    Delete</button>
