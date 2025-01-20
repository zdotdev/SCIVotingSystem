<script>
    import NavigationButton from '$lib/Components/Button/Navigation.svelte'
    export let title = ''
</script>

<nav class="w-64 flex flex-col pt-48 bg-gray-800 h-screen fixed top-0 left-0">
    {#each title as item}
        <NavigationButton title={item} />
    {/each}
</nav>
