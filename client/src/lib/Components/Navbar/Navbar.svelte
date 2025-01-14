<script>
    function logout(){
        console.log('logout');
    }
</script>

<main>
    <nav class="w-screen z-10 flex items-center bg-gray-800 h-16 fixed top-0 left-0 px-8">
        <button type="button" on:click={() => {logout()}} class="w-12 h-12 rounded-full bg-white ml-auto flex content-center p-2">
            <img src="/src/Image/person_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="">
        </button>
    </nav>
</main>
