<script lang="ts">
    import type { Color_Interface } from "$interface/color";

    export let func = () => {};
    export let text = '';
    export let color = 'blue';
    export let type: 'button' | 'submit' | 'reset' = 'button';

    const colors: Color_Interface = {
        red: 'bg-red-500 hover:bg-red-700',
        blue: 'bg-blue-500 hover:bg-blue-700',
        green: 'bg-green-500 hover:bg-green-700',
        gray: 'bg-gray-500 hover:bg-gray-700'
    };

</script>

<button type={type} class={`${colors[color as keyof Color_Interface] || colors.blue} text-white font-bold py-2 px-4 rounded`} on:click={func}>
    {text}
</button>