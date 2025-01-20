<script>
    export let func = () => {};
    export let text = '';
    export let color = 'blue';
    export let type = 'button';

    const colors = {
        red: 'bg-red-500 hover:bg-red-700',
        blue: 'bg-blue-500 hover:bg-blue-700',
        green: 'bg-green-500 hover:bg-green-700',
        gray: 'bg-gray-500 hover:bg-gray-700'
    };

    $: colorClass = colors[color] || colors.blue;
</script>

<button type={type} class={`${colorClass} text-white font-bold py-2 px-4 rounded`} on:click={func}>
    {text}
</button>
