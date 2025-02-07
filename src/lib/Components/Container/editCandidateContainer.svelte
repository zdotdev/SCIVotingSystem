<script>
    import { Button } from '$lib/Components/ui/button/index';
    export let candidate;
    console.log(candidate);
    

    let candidateData = Array.isArray(candidate) ? [...candidate] : [candidate];

    function addCandidate() {
        candidateData = [
            ...candidateData,
            { candidateName: '', candidatePosition: '', candidateParty: '' },
        ];
    }

    // Remove a candidate by index
    function removeCandidate(index) {
        candidateData = candidateData.filter((_, i) => i !== index);
    }

</script>
<div>
    {#each candidateData as candidate, index}
        <div class="bg-slate-200 my-8 p-2 rounded-sm">
            <div>
                <label for="candidateName">Candidate Name: </label>
                <input class="border rounded p-2 w-full" type="text" name="candidateName" value="{candidate.candidateName}" required> 
            </div>
            <div>
                <label for="candidatePosition">Candidate Position: </label>
                <input class="border rounded p-2 w-full" type="text" name="candidatePosition" value="{candidate.candidatePosition}" required> 
            </div>
            <div>
                <label for="candidateParty">Candidate Party: </label>
                <input class="border rounded p-2 w-full" type="text" name="candidateParty" value="{candidate.candidateParty}" required> 
            </div>
        </div>
        <div>
            <Button variant="destructive" onclick={() => removeCandidate(index)}>
                    Remove Candidate
            </Button>
        </div>
    {/each}
    <div class="flex justify-end m-2">
        <Button onclick={addCandidate}>
            Add Candidate
        </Button>
    </div>
</div>