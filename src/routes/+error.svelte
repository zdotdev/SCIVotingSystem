<script>
    import { page } from '$app/stores';
    export let error;
</script>
<h1 class="text-red-500">{$page.error.message || error.errorMessage}</h1>