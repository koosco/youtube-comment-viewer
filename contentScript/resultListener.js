// 3. background에서 데이터 받음
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    // 5. DOM에 data 표시
    var newItem = document.getElementById("newContentDiv-result");
    newItem.innerHTML = request.result.text;
});