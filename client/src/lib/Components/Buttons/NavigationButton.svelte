<script>
    export let title;
</script>

<button on:click={() => {if (title == 'Dashboard'){window.location.href = '/'}else{window.location.href = `/${title}`}}} class="text-white text-2xl flex w-full justify-center items-center h-16 transition duration-300 ease-in-out transform bg-gray-900 hover:bg-gray-700">
    {title}
</button>
