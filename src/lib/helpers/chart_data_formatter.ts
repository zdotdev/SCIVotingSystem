import type { Partylist_Graph_Interface } from "$interface/election_interface";

export function formatChartData(partylistData: Partylist_Graph_Interface[]) {
    
    if (!partylistData) {
        return {
            labels: [],
            datasets: []
        };
    }
    
    const labels = [...new Set(partylistData.map(item => item.electionPartylistName))];
    
    const groupedData = partylistData.reduce<Record<string, number>>((acc, item) => {
        acc[item.electionPartylistName] = (acc[item.electionPartylistName] || 0) + item.electionPartylistData;
        return acc;
    }, {});

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