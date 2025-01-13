<script>
    import Sidebar from "$lib/Components/Sidebar/Sidebar.svelte";
    import Navbar from "$lib/Components/Navbar/Navbar.svelte";
    import GetAllStudents from "$lib/Components/User/GetAllStudents.svelte";

</script>
<h1>Admin</h1>
<main>
    <Navbar />
    <Sidebar />
    <div class="pl-20 pt-20 ml-64 h-screen w-4/5">
        <h1 class="text-6xl font-bold">Students</h1>
        <GetAllStudents />
    </div>
</main>