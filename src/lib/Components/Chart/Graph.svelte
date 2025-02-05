<script>
    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';
    import { getRelativePosition } from 'chart.js/helpers';

    let ctx;

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Team A',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Team B',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }
        ]
    };

    onMount(
        async() => {
            const chart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    onClick: (e) => {
                        const canvasPosition = getRelativePosition(e, chart);

                        const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
                        const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
                    }
                }
            });
        }
    )
</script>
<section class="border rounded-md shadow p-6 mt-8">
    <canvas id="myChart" bind:this={ctx} class="w-full h-fit"></canvas>
</section>
