var barGraphElements = null;
var barEntireDataLatest = {};
var token = null;

function initBarChart(parent) {
    const barChartDiv = createTag("div", "barChartDiv");
    appendChildDivTo(parent, barChartDiv);

    const d3Container = createTag("div", "commentBarGraph");
    appendChildDivTo(barChartDiv, d3Container);

    const button = createTag("button", "barchart-button", "단어 빈도 계산하기");
    addBarChartEvent(button);
    appendChildDivTo(barChartDiv, button);
}

function addBarChartEvent(button) {
    button.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: "getFrequency", token: token}, (response) => getComments(response));
    });
}

function getComments(response) {
    if (!response || !response.success) {
        console.error("데이터 가져오기 실패");
        return;
    }
    
    console.log("데이터 가져오기 성공");
    token = response.data.nextPageToken;
    comments = response.data.comments;

    if (barGraphElements === null) {
        createBarChart(comments);
    } 
    updateBarChart(comments, barGraphElements, barEntireDataLatest);
}

function createBarChart(comments) {
    console.log("createBarChart 호출");
    barEntireDataLatest = comments;
    const top10Entries = Object.entries(barEntireDataLatest).slice(0, 10);
    const dataset = top10Entries.map(([name, value]) => ({ name, value }));
    barGraphElements = drawBarChart(dataset, "commentBarGraph");
    console.log(`barGraphElements: ${barGraphElements}`);
}

function updateBarChart(comments, graphElements, entireDataLatest) {
    entireDataLatest = {...entireDataLatest};
    for (const key in comments) {
        entireDataLatest[key] = (entireDataLatest[key] || 0) + comments[key];
    }
    const top10Entries = Object.entries(entireDataLatest).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const dataset = top10Entries.map(([name, value]) => ({ name, value }));
    reDrawBarChart(graphElements, dataset);
}