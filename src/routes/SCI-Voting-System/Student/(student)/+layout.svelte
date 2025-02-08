<script>
    import Navbar from '$lib/Components/Navbar/Navbar.svelte';

    const title = 'Dashboard';
    const path = 'SCI-Voting-System/Student';
</script>
<Navbar {path} {title} />
<slot />
