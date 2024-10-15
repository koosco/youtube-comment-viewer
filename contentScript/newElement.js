var newDiv = document.createElement("div");
newDiv.setAttribute("id", "newContentDiv")

var newHead = document.createElement("h1");
newHead.setAttribute("id", "newContentDiv-h1")
newHead.textContent = "댓글 분포";
newDiv.appendChild(newHead);

// 그래프를 위한 새로운 div 요소 생성
var resultDiv = document.createElement("div");
resultDiv.setAttribute("id", "newContentDiv-result");
newDiv.appendChild(resultDiv);

var moreButton = document.createElement('button');
moreButton.textContent = "더 보기";
moreButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({moreContent: true}, () => {
        
    });
});
newDiv.appendChild(moreButton);

var existingDiv = document.getElementById("secondary"); // 삽입할 위치 탐색

// secondary(youtube 우측 최상단)에 결과를 넣을 div tag 삽입
if(existingDiv) {
    var firstChild = existingDiv.firstChild;
    existingDiv.insertBefore(newDiv, firstChild); // firstChild 뒤에 newDiv를 삽입
}