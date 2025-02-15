<script lang="ts">
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import type { ChartData } from 'chart.js';
    import { format_chart_data } from '$helpers/chart_data_formatter';
    export let electionGraphData: any;
    
    let ctx: HTMLCanvasElement;

    const data: ChartData = format_chart_data(electionGraphData);

    onMount(() => {
            new Chart(ctx, {
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
    );
</script>
<section class="border rounded-md shadow p-6 mt-8">
    <p class="text-3xl mb-4 font-bold text-nowrap">Partylist Status</p>
    {#if electionGraphData}
        <canvas id="myChart" bind:this={ctx} class="w-full h-fit"></canvas>
    {:else}
        <p class="text-lg text-gray-500">No data available.</p>
    {/if}
</section>