export function sortCandidates(electionData, sortBy = 'votes') {
    const positionOrder = ["President", "Vice president", "Secretary", "Auditor", "Treasurer", "PIO", "Project Manager", "Representatives", "Muse", "Escort"];
    const candidates = [...electionData.electionCandidates];
    
    return candidates.sort((a, b) => {
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