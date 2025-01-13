<script>
    import { onMount } from 'svelte';

    export let id;

</script>
<button on:click={() => { if (id) { window.location.href = `/Election/Open/${id}`; } }} class="bg-blue-500 text-white px-4 py-2 rounded-lg">View</button>