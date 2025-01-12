<script>
    export let userId;
    let data = [];
    let error = '';

    async function acceptUser() {
        try {
            const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: 'student' })
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

<button on:click={() => {acceptUser()}} class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
    Accept</button>