<script>
    import GetAllNewUser from "../User/GetAllNewUser.svelte";
    import GetAllStudents from "../User/GetAllStudents.svelte";
    import Sidebar from "../Sidebar/Sidebar.svelte";
    import Navbar from "../Navbar/Navbar.svelte";
    import { globalData } from '$lib/stores';

    $: val = $globalData.val;

    $: {
        console.log(val);
    }
    

</script>
<h1>Admin</h1>
<main>
    <Navbar />
    <Sidebar title={["Dashboard", "Election", "Students", "Registration"]}/>
    <div class="pl-20 pt-20 ml-64 h-screen w-4/5">
        {#if val === 'Dashboard'}
            <h1 class="text-6xl font-bold">Dashboard</h1>
        {:else if val === 'Election'}
            <h1 class="text-6xl font-bold">Election</h1>
        {:else if val === 'Students'}
            <h1 class="text-6xl font-bold">Students</h1>
            <GetAllStudents />
        {:else if val === 'Registration'}
            <h1 class="text-6xl font-bold">Registration</h1>
            <GetAllNewUser />
        {/if}
    </div>
</main>