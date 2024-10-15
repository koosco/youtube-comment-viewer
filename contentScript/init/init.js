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