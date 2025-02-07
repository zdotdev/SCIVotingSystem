<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { getRelativePosition } from 'chart.js/helpers';
    import { formatChartData } from '$lib/Helpers/formatChartData'
    export let electionGraphData;
    console.log(electionGraphData);
    
    
    let ctx;

const data = formatChartData(electionGraphData);

    onMount(
        async() => {
            const chart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                        y: {
                        beginAtZero: true
                        }
                    }
                }
            });
        }
    )
</script>
<section class="border rounded-md shadow p-6 mt-8">
    <p class="text-3xl mb-4 font-bold text-nowrap">Partylist Status</p>
    {#if electionGraphData}
        <canvas id="myChart" bind:this={ctx} class="w-full h-fit"></canvas>
    {:else}
        <p class="text-lg text-gray-500">No data available.</p>
    {/if}
</section>
