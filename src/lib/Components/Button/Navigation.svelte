<script>
    import Dashboard from "lucide-svelte/icons/layout-dashboard";
    import Election from "lucide-svelte/icons/square-chart-gantt";
    import Students from "lucide-svelte/icons/book";
    import Registration from "lucide-svelte/icons/clipboard";
    import { browser } from "$app/environment";

    export let title;
    export let path;

    const icons = {
        Dashboard,
        Election,
        Students,
        Registration
    };

    let Component = icons[title];

    $: activeClass = browser && window.location.pathname === `/SCI-Voting-System/${path}/${title}` ? 'bg-red-800' : 'bg-red-900';
</script>

<button
    on:click={() => { window.location.href = `/SCI-Voting-System/${path}/${title}` }}
    class="text-white pl-4 flex gap-8 text-2xl w-full items-center h-16 transition duration-300 ease-in-out transform {activeClass} hover:bg-red-100 hover:text-black rounded-xl"
>
    <Component /> {title}
</button>