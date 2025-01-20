<script>
    import Navbar from '$lib/Components/Navbar/Navbar.svelte';

    const title = 'Home';
    const path = 'Student';
</script>
<Navbar {path} {title} />
<slot />
