<script>
    import Sidebar from "$lib/Components/Sidebar/Sidebar.svelte";
    import Navbar from "$lib/Components/Navbar/Navbar.svelte";
    import GetAllElection from "$lib/Components/Election/GetAllElection.svelte";

</script>
<h1>Admin</h1>
<main>
    <Navbar />
    <Sidebar />
    <div class="pl-20 pt-20 ml-64 h-screen w-4/5">
        <h1 class="text-6xl font-bold">Election</h1>
        <GetAllElection />
        <button on:click={() => {window.location.href = '/Election/CreateElection'}} class="bg-gray-500 mt-20 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Create Election</button>
    </div>
</main>