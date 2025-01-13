<script>
    export let title;
    import { globalData } from '$lib/stores';

    function updateGlobalData() {
        globalData.update((data) => {
            data.val = title;
            return data;
        });
    }

</script>

<button on:click={() => {updateGlobalData()}} class="text-white text-2xl flex w-full justify-center items-center h-16 transition duration-300 ease-in-out transform bg-gray-900 hover:bg-gray-700">
    {title}
</button>
