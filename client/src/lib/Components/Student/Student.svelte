<script>
    import StudentSidebar from "$lib/Components/Sidebar/StudentSidebar.svelte";
    import Navbar from "$lib/Components/Navbar/Navbar.svelte";
    import Dashboard from "$lib/Components/Dashboard/Dashboard.svelte";
</script>
<h1>Admin</h1>
<main>
    <Navbar />
    <StudentSidebar/>
    <div class="pl-20 pt-20 ml-64 h-screen w-4/5">
        <h1 class="text-6xl font-bold">Dashboard</h1>
        <Dashboard />
    </div>
</main>