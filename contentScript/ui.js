setTimeout(() => {
    let graphElements = null;
    let entireDataLatest;
    let token = null;
    const newDiv = init();
    createBarChartButton(newDiv, token, graphElements, entireDataLatest);
}, 2000);

function init(){
    const newDiv = createTag("div", "newContentDiv");
    const newHead = createTag("h1", "newContentDiv-h1", "댓글분포");
    addChildDivTo(newDiv, newHead);

    const barChartDiv = createTag("div", "barChartDiv");
    addChildDivTo(newDiv, barChartDiv);
    const barChartGraphDiv = createTag("div", "newContentDiv-result");
    addChildDivTo(barChartDiv, barChartGraphDiv);

    const networkChartDiv = createTag("div", "networkChartDiv");
    addChildDivTo(newDiv, networkChartDiv);
    const networkChartGraphDiv = createTag("div", "networkChartGraphDiv");
    addChildDivTo(networkChartDiv, networkChartGraphDiv);

    addCustomDivToYoutube(newDiv);

    return newDiv;
}

function addCustomDivToYoutube(div) {
    const existingDiv = document.getElementById("secondary");
    if(existingDiv) {
        var firstChild = existingDiv.firstChild;
        existingDiv.insertBefore(div, firstChild);
    }
}

function createTag(tag, id, text) {
    const div = document.createElement(tag);
    div.setAttribute("id", id);

    if (text !== undefined) {
        div.textContent = text;
    }
    return div;
}

function addChildDivTo(parent, child) {
    parent.appendChild(child);
}

function createBarChartButton(parent, token, graphElements, entireDataLatest) {
    const chartButton = createTag("button", "barchart-button", "단어 빈도 계산하기");
    chartButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: "fetchData", token: token}, (response) => getComments(response, token, graphElements, entireDataLatest));
    });
    addChildDivTo(parent, chartButton);
}

function getComments(response, token, graphElements, entireDataLatest) {
    if (!response || !response.success) {
        console.error("데이터 가져오기 실패");
    }
    token = response.data.nextPageToken;
    comments = response.data.comments;

    if (graphElements !== null) {
        createNewBarChart(comments, graphElements);
        return;
    } 
    updateBarChart(comments, entireDataLatest);
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

function clearComments() {
    graphElements = null;
    entireDataLatest = null;
    token = null;
}