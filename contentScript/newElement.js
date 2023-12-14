// 4. DOM에 새로운 요소 추가
setTimeout(() => {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "newContentDiv")

    var newHead = document.createElement("h1");
    newHead.setAttribute("id", "newContentDiv-h1")
    newHead.textContent = "댓글 분포";
    newDiv.appendChild(newHead);
    
    // var resDiv = document.createElement("div");
    // resDiv.setAttribute("id", "newContentDiv-result");

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
}, 2000);