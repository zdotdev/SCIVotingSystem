export function formatChartData(partylistData) {
    const labels = partylistData.map(item => item.electionPartylistName);
    
    const datasets = partylistData.map(item => ({
        label: '# of Votes',
        data: [item.electionPartylistData],
        borderWidth: 1
    }));
    
    return {
        labels,
        datasets
    };
}