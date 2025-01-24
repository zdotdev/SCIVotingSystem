<script>
    import NavigationButton from '$lib/Components/Button/Navigation.svelte'
    export let title = ''
    export let path = ''
</script>

<nav class="w-64 flex flex-col pt-48 bg-red-900 h-screen fixed top-0 left-0">
    {#each title as item}
        <NavigationButton {path} title={item} />
    {/each}
</nav>
