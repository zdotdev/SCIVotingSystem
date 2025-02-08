<script>
import Ribbon from "$lib/Components/Ribbon/Ribbon.svelte";
import * as Card from "$lib/Components/ui/card/index";
import { Button } from "$lib/Components/ui/button/index";

export let data;
let { name, studentId, electionData, dataId } = data;
const title = electionData?.electionTitle || "No election available";
const positionOrder = ["President", "Vice president", "Secretary", "Auditor", "Treasurer", "PIO", "Project Manager", "Representatives", "Muse", "Escort"];

// Sorting functions remain the same
export function sortCandidates(candidates = [], sortBy = 'position') {
    if (!candidates.length) return [];
    return [...candidates].sort((a, b) => {
        if (sortBy === 'position') {
            const posA = positionOrder.indexOf(a.candidatePosition);
            const posB = positionOrder.indexOf(b.candidatePosition);
            const finalPosA = posA === -1 ? Infinity : posA;
            const finalPosB = posB === -1 ? Infinity : posB;
            return finalPosA - finalPosB;
        } else {
            return b.candidateVotes - a.candidateVotes;
        }
    });
}

const groupedCandidates = electionData?.electionCandidates.reduce((acc, candidate) => {
    const position = candidate.candidatePosition;
    if (!acc[position]) {
        acc[position] = [];
    }
    acc[position].push(candidate);
    return acc;
}, {});

Object.keys(groupedCandidates).forEach(position => {
    groupedCandidates[position] = sortCandidates(groupedCandidates[position], 'votes');
});

const sortedPositions = Object.keys(groupedCandidates).sort((a, b) => {
    const posA = positionOrder.indexOf(a);
    const posB = positionOrder.indexOf(b);
    const finalPosA = posA === -1 ? Infinity : posA;
    const finalPosB = posB === -1 ? Infinity : posB;
    return finalPosA - finalPosB;
});

// Submit handler
async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Add your form submission logic here
    console.log('Form submitted successfully!');
}
</script>

<main>
    <div class="relative h-screen w-screen pt-16">
        <Ribbon location='Voting' {name} {studentId} />
        <div class="px-6">
            <h2 class="text-2xl font-bold">{title}</h2>
        </div>
        <form method="POST">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {#each sortedPositions as position}
                    <Card.Root class="w-full">
                        <Card.Header class="pb-2">
                            <h3 class="text-xl font-bold">{position}</h3>
                        </Card.Header>
                        
                        <Card.Content class="p-4">
                            <div class="space-y-2">
                                {#each groupedCandidates[position] as candidate}
                                    <div class="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name={`vote-${position}`}
                                            value={candidate._id}
                                            id={`${position}-${candidate._id}`}
                                            required
                                            class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-500"
                                        />
                                        <label
                                            for={`${position}-${candidate._id}`}
                                            class="flex-1 cursor-pointer"
                                        >
                                            <div class="flex flex-col">
                                                <span class="font-medium">{candidate.candidateName}</span>
                                                <span class="text-sm text-gray-500">
                                                    {candidate.candidateParty}
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                {/each}
                            </div>
                            
                            <p class="mt-2 text-sm text-red-500">Please select a candidate for this position.</p>
                        </Card.Content>
                    </Card.Root>
                {/each}
            </div>
            <input type="text" name="userId" bind:value={dataId} hidden />
            <div class="flex justify-center p-6">
                <Button type='submit'>Submit Vote</Button>
            </div>
        </form>
    </div>
</main>