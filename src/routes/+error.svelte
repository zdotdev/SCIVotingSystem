<script>
    import { page } from '$app/stores';
</script>
<h1 class="text-red-500">{$page.error.errorMessage || 'Unauthorized'}</h1>