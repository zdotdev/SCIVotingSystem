<script>
    import GetActiveElection from "$lib/Components/Election/GetActiveElection.svelte";
    import GetElectionResult from "$lib/Components/Election/GetElectionResult.svelte";
    import { onMount } from 'svelte';
</script>

<main class="pt-20 ml-64 h-screen w-4/5 flex gap-56">
    <GetActiveElection />
    <GetElectionResult />
</main>