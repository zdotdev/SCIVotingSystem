export interface Election_Interface {
    electionTitle: string
    electionStart: string
    electionEnd: string
    displayElection: string
    electionCandidates: Candidate_Interface[]
    electionPartylistGraph: Partylist_Graph_Interface[]
    electionVoters: string[]
}

export interface Candidate_Interface {
    candidateName: string
    candidatePosition: string
    candidateParty: string
    candidateVotes: number
}

export interface Partylist_Graph_Interface {
    electionPartylistName: string
    electionPartylistData: number
}