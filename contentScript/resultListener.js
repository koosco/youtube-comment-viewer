// 3. background에서 데이터 받음
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // 5. DOM에 data 표시
    var newItem = document.getElementById("newContentDiv-result");
    newItem.innerHTML = request.result.text;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // 5. DOM에 data 표시
    if(request.moreContentresult){
        console.log(request.moreContentresult);
    }
});