<script>
    import { Button } from '$lib/Components/ui/button/index';
    export let candidate;

    let candidateData = Array.isArray(candidate) ? [...candidate] : [];

    function addCandidate() {
        candidateData = [
            ...candidateData,
            { candidateName: '', candidatePosition: '', candidateParty: '' },
        ];
    }

    function removeCandidate(index) {
        candidateData = candidateData.filter((_, i) => i !== index);
    }

</script>
<div>
    {#each candidateData as candidate, index}
        <div class="bg-slate-200 my-8 p-2 rounded-sm">
            <div>
                <label for="candidateName_{index}">Candidate Name: </label>
                <input class="border rounded p-2 w-full" type="text" name="candidateName_{index}" value="{candidate.candidateName}" required> 
            </div>
            <div>
                <label for="candidatePosition_{index}">Candidate Position: </label>
                <input class="border rounded p-2 w-full" type="text" name="candidatePosition_{index}" value="{candidate.candidatePosition}" required> 
            </div>
            <div>
                <label for="candidateParty_{index}">Candidate Party: </label>
                <input class="border rounded p-2 w-full" type="text" name="candidateParty_{index}" value="{candidate.candidateParty}" required> 
            </div>
        </div>
        <div>
            <Button variant="destructive" onclick={() => removeCandidate(index)}>
                    Remove Candidate
            </Button>
        </div>
    {/each}
    <input type="text" name="candidateCount" bind:value={candidateData.length} hidden>
    <div class="flex justify-end m-2">
        <Button onclick={addCandidate}>
            Add Candidate
        </Button>
    </div>
</div>