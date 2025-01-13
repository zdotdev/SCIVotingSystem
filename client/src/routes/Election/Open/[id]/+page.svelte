<script>
    import Sidebar from "$lib/Components/Sidebar/Sidebar.svelte";
    import Navbar from "$lib/Components/Navbar/Navbar.svelte";
    import NavigationButton from '$lib/Components/Buttons/NavigationButton.svelte';
    import GetElection from "$lib/Components/Election/GetElection.svelte";
</script>
<h1>Admin</h1>
<main>
    <Navbar />
    <Sidebar />
    <div class="pl-20 pt-20 ml-64 h-screen w-4/5">
        <h1 class="text-6xl font-bold">Election data</h1>
        <GetElection />
    </div>
</main>