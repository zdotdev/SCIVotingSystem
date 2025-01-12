<!-- <script>
    import { onMount } from 'svelte';

    let data = [];
    let error = null;

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user');

            if (response.ok) {
                const result = await response.json();
                data = result.user;
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (err) {
            error = err.message;
        }
    });
</script>

<main>
    <h1>Data</h1>
    {#if error}
        <p style="color: red;">{error}</p>
    {/if}
    <ul>
        {#each data as item}
            <li>{item.name}</li>
        {/each}
    </ul>
</main> -->

<script>

</script>

<main>
    
</main>