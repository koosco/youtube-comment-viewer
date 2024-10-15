chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.result){
        const dataset = request.result.data;
        
        const existingGraph = document.querySelector("#newContentDiv-result svg");
        if (existingGraph && barGraphElements) {
            updateBarChart(barGraphElements, dataset);
        } else {
            barGraphElements = drawBarChart(dataset, "newContentDiv-result");
        }
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.moreContentresult){
        console.log(request.moreContentresult);
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'clearGraph') {
        clearGraph('newContentDiv'); 
        sendResponse({status: "그래프가 성공적으로 지워졌습니다."});
        clearComments();
    }
});