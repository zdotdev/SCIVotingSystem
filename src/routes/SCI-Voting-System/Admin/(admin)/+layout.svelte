<script>
    import Navbar from '$lib/Components/Navbar/Navbar.svelte';
    import Sidebar from '$lib/Components/Sidebar/Sidebar.svelte';

    const title = ['Dashboard', 'Election', 'Students', 'Registration'];
    const path = 'Admin';
</script>
<Navbar />
<Sidebar {path} {title} />
<slot />
