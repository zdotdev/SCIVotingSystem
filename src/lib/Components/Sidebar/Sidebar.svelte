<script>
    import NavigationButton from '$lib/Components/Button/Navigation.svelte'
    import Logo from '$lib/Assets/icon.png';
    export let title = ''
    export let path = ''
</script>
<nav class="w-80 px-8 flex flex-col bg-red-900 h-screen fixed top-0 left-0 rounded-tr-3xl rounded-br-3xl">
    <div class="flex justify-center items-center gap-4 my-8">
        <img class="h-12 w-12" src="{Logo}" alt="Home">
        <p class="text-white flex flex-col items-center"><span>SCI Voting System</span><span class="text-sm">Santa Cruz Institute</span></p>
    </div>
    <div class="flex mt-20 flex-col items-center gap-8 h-full">
        {#each title as item}
            <NavigationButton {path} title={item} />
        {/each}
    </div>
    <div class="flex justify-center items-center gap-4 my-8">
        <a href="https://web.facebook.com/scimarinduqueinc" class="text-white">@SCI Maridnuque</a>
    </div>
</nav>
