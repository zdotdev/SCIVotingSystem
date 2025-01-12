<script>
    export let userId;
    let data = [];
    let error = '';

    async function deleteUser() {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                data = data.filter(user => user.id !== userId);
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (err) {
            error = err.message;
        }
        window.location.reload();
    }
</script>

<button on:click={() => {deleteUser()}} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
    Delete</button>