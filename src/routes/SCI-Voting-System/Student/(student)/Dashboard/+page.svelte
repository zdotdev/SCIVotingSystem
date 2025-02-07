<script>
import Background from '$lib/Assets/Background.jpg';
import Ribbon from '$lib/Components/Ribbon/Ribbon.svelte';
import ElectionDetails from '$lib/Components/Container/ElectionDetails.svelte';
import VotingProgressContainer from '$lib/Components/Container/VotingProgressContainer.svelte';
import CandidateContainer from '$lib/Components/Container/CandidateContainer.svelte';
import ElectionResultsContainer from '$lib/Components/Container/ElectionResultsContainer.svelte';
export let data;
const {name, studentId, userChecker, electionData, displayedData, userCount} = data;
const location = 'Dashboard';
const totalVoteCount = electionData?.electionVoters?.length || 0;
</script>

<main class="relative h-screen w-screen pt-16">
    <Ribbon {location} {name} {studentId} />
    <div class="flex flex-col gap-4 md:gap-8 m-4">
        {#if electionData}
            <ElectionDetails {electionData} {userChecker}/>
            <VotingProgressContainer />
            <CandidateContainer {electionData} />
        {:else}
            <ElectionResultsContainer electionData={displayedData} />
        {/if}
    </div>
</main>