<script>
    export let title;
    export let path;
</script>

<button on:click={() => {window.location.href = `/${path}/${title}`}} class="text-white text-2xl flex w-full justify-center items-center h-16 transition duration-300 ease-in-out transform bg-gray-900 hover:bg-gray-700">
    {title}
</button>