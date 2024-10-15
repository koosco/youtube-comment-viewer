function init(){
    rootDiv = initHead();
    initBarChart(rootDiv);
    initNetworkChart(rootDiv);
    addCustomDivToYoutube(rootDiv);
}

function initHead() {
    const newDiv = createTag("div", "newContentDiv");
    const newHead = createTag("h1", "newContentDiv-h1", "댓글분포");
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