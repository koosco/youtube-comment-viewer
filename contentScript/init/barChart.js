var graphElements = null;
var entireDataLatest = {};
var token = null;

function createBarChartButton(parent) {
    const chartButton = createTag("button", "barchart-button", "단어 빈도 계산하기");
    chartButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: "fetchData", token: token}, (response) => getComments(response));
    });
    addChildDivTo(parent, chartButton);
}

function getComments(response) {
    if (!response || !response.success) {
        console.error("데이터 가져오기 실패");
        return;
    }
    
    token = response.data.nextPageToken;
    comments = response.data.comments;

    if (graphElements === null) {
        createNewBarChart(comments);
    } 
    updateBarChart(comments, graphElements, entireDataLatest);
}

function createNewBarChart(comments) {
    entireDataLatest = comments;
    const top10Entries = Object.entries(entireDataLatest).slice(0, 10);
    const dataset = top10Entries.map(([name, value]) => ({ name, value }));
    graphElements = drawGraph(dataset, "commentGraph");
}

function updateBarChart(comments, graphElements, entireDataLatest) {
    entireDataLatest = {...entireDataLatest};
    for (const key in comments) {
        entireDataLatest[key] = (entireDataLatest[key] || 0) + comments[key];
    }
    const top10Entries = Object.entries(entireDataLatest).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const dataset = top10Entries.map(([name, value]) => ({ name, value }));
    updateGraph(graphElements, dataset);
}