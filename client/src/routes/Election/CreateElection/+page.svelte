<script>
    import CreateElection from "$lib/Components/Election/CreateElection.svelte";
    import Sidebar from "$lib/Components/Sidebar/Sidebar.svelte";
    import Navbar from "$lib/Components/Navbar/Navbar.svelte";

</script>
<main>
    <Navbar />
    <Sidebar />
    <div class="pl-20 pt-20 ml-64 h-screen w-4/5">
        <h2 class="text-6xl font-bold">Create Election</h2>
        <CreateElection />
    </div>
</main>