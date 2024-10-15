var networkElements = null;
var networkEntireDataLatest = {};
var networkToken = null;

function initNetworkChart(parent) {
    const networkChartDiv = createTag("div", "networkChartDiv");
    appendChildDivTo(parent, networkChartDiv);

    const networkContainer = createTag("div", "commentNetworkGraph");
    appendChildDivTo(networkChartDiv, networkContainer);

    const button = createTag("button", "network-button", "단어 상관관계 계산하기");
    addNetworkChartEvent(button);
    appendChildDivTo(networkChartDiv, button);
}

function addNetworkChartEvent(button) {
    button.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: "getCorrelations", token: networkToken}, (response) => getCorrelations(response));
    });
}

function getCorrelations(response) {
    if (!response || !response.success) {
        console.error("데이터 가져오기 실패");
        return;
    }
    
    console.log("데이터 가져오기 성공");
    token = response.data.nextPageToken;
    nodes = response.data.nodes;
    links = response.data.links;

    if (networkElements === null) {
        createNewNetworkChart(nodes, links);
    }
    // updateNetworkChart(networkElements, barGraphElements, barEntireDataLatest);
}

function createNewNetworkChart(nodes, links) {
    barGraphElements = drawNetworkGraph(nodes, links, "commentNetworkGraph");
}
