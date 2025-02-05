<script>
    import { Progress } from '$lib/Components/ui/progress/index';
    export let totalVoteCount = 0;
    export let userCount = 0;
    const totalStudentVotesPercentage = (totalVoteCount / userCount) * 100;
</script>

<section class="border rounded-md h-fit shadow p-6">
    <div class="w-fit">
        <p class="text-3xl mb-4 font-bold">Vote Progress</p>
        <div class="flex flex-col gap-4">
            <Progress value={totalStudentVotesPercentage} />
            <p class="text-lg text-gray-500 mb-3">Total student votes: {totalVoteCount} out of {userCount} students.</p>
        </div>
    </div>
</section>