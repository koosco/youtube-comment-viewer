function createBarChartButton(parent, token, graphElements, entireDataLatest) {
    const chartButton = createTag("button", "barchart-button", "단어 빈도 계산하기");
    chartButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: "fetchData", token: token}, (response) => getComments(response, token, graphElements, entireDataLatest));
    });
    addChildDivTo(parent, chartButton);
}

function createNewBarChart(comments, graphElements) {
    entireDataLatest = comments;
    const top10Entries = Object.entries(entireDataLatest).slice(0, 10);
    const dataset = top10Entries.map(([name, value]) => ({ name, value }));
    graphElements = drawGraph(dataset, "commentGraph");
}

function updateBarChart(comments, entireDataLatest) {
    entireDataLatest = {...entireDataLatest};
    for (const key in comments) {
        entireDataLatest[key] = (entireDataLatest[key] || 0) + comments[key];
    }
    const top10Entries = Object.entries(entireDataLatest).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const dataset = top10Entries.map(([name, value]) => ({ name, value }));
    updateGraph(graphElements, dataset);
}