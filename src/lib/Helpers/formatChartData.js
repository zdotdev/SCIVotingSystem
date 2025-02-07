export function formatChartData(partylistData) {
    // Get unique partylist names using Set
    const labels = [...new Set(partylistData.map(item => item.electionPartylistName))];
    
    // Group data by partylist name and sum votes
    const groupedData = partylistData.reduce((acc, item) => {
        acc[item.electionPartylistName] = (acc[item.electionPartylistName] || 0) + item.electionPartylistData;
        return acc;
    }, {});

    // Create separate dataset for each partylist
    const datasets = labels.map(label => ({
        label: `${label}'s Votes`,
        data: [groupedData[label]],
        borderWidth: 1
    }));

    return {
        labels,
        datasets
    };
}