setTimeout(() => {
    let graphElements = null;
    let entireDataLatest;
    let token = null;
    const newDiv = init();
    createBarChartButton(newDiv, token, graphElements, entireDataLatest);
}, 2000);

function getComments(response, token, graphElements, entireDataLatest) {
    if (!response || !response.success) {
        console.error("데이터 가져오기 실패");
    }
    
    token = response.data.nextPageToken;
    comments = response.data.comments;

    if (graphElements === null) {
        createNewBarChart(comments, graphElements);
        return;
    } 
    updateBarChart(comments, entireDataLatest);
}



function clearComments() {
    graphElements = null;
    entireDataLatest = null;
    token = null;
}