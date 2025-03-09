function init(){
    console.log("init start");
    rootDiv = initHead();
    initBarChart(rootDiv);
    // initNetworkChart(rootDiv);
    initWordCloud(rootDiv);
    addCustomDivToYoutube(rootDiv);
}

function initHead() {
    const newDiv = createTag("div", "newContentDiv");
    const newHead = createTag("h1", "newContentDiv-h1", "Youtube 댓글 분석하기!");
    appendChildDivTo(newDiv, newHead);
    
    return newDiv;
}

function addCustomDivToYoutube(rootDiv) {
    const existingDiv = document.getElementById("secondary");
    if(existingDiv) {
        var firstChild = existingDiv.firstChild;
        existingDiv.insertBefore(rootDiv, firstChild);
    }
}