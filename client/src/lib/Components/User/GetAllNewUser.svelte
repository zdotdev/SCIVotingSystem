<script>
    import { onMount } from 'svelte';
    import UserContainer from './UserContainer.svelte';
    import DeleteUserButton from '../Buttons/DeleteUserButton.svelte';
    import AcceptUserButton from '../Buttons/AcceptUserButton.svelte';

    let data = [];
    let message = '';
    let status = 0;
    let error = null;

    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user/new');
            const result = await response.json();
            data = result.user;
            message = result.message;
            status = response.status;
        } catch (err) {
            error = err.message;
        }
    });
</script>
<UserContainer {data} {error} {message} {status} ActionButton={AcceptUserButton} ActionButtonTwo={DeleteUserButton}/>