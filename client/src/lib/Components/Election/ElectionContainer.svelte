<script>
    export let title
    export let start
    export let end
    export let displayDate
    export let id

    import { onMount } from 'svelte';
    import OpenElectionButton from '$lib/Components/Buttons/OpenElectionButton.svelte';

    let formattedStart;
    let formattedEnd;
    let formattedDisplayDate;

    onMount(() => {
        formattedStart = formatDate(start);
        formattedEnd = formatDate(end);
        formattedDisplayDate = formatDate(displayDate);
    });

    function formatDate(date) {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${month}-${day}-${year}`;
    }

</script>

<main class="flex flex-wrap gap-4 justify-center">
    <div class="w-fit flex items-center space-x-4 p-4 border-gray-200 rounded-lg shadow-md">
        <div class="flex flex-col gap-2 px-8 py-4">
            <h2 class="text-2xl font-bold">{title}</h2>
            <div class="flex flex-col gap-4">
                <div class="flex gap-2">
                    <strong>Start date: </strong>
                    <p>{formattedStart}</p>
                </div>
                <div class="flex gap-2">
                    <strong>End date: </strong>
                    <p>{formattedEnd}</p>
                </div>
                <div class="flex gap-2">
                    <strong>Announcement date: </strong>
                    <p>{formattedDisplayDate}</p>
                </div>
            </div>
            <OpenElectionButton {id} />
        </div>
    </div>
</main>