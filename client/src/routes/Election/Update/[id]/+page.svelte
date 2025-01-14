<script>
    import { page } from "$app/stores";
    import EditElection from "$lib/Components/Election/EditElection.svelte";
    import Sidebar from "$lib/Components/Sidebar/Sidebar.svelte";
    import Navbar from "$lib/Components/Navbar/Navbar.svelte";
    const electionId = $page.params.id;
</script>
<main>
    <Navbar />
    <Sidebar />
    <EditElection />
</main>