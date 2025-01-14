<script>
    import { page } from "$app/stores";
</script>

<button on:click={() => {window.location.href = `/Election/Update/${$page.params.id}`}} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Edit</button>
