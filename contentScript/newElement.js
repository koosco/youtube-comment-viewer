// 4. DOM에 새로운 요소 추가
setTimeout(() => {
    var newDiv = document.createElement("div");

    var newHead = document.createElement("h1");
    newHead.textContent = "Custom Div Tag";
    newDiv.appendChild(newHead);

    var newContentDiv = document.createElement("div");
    newContentDiv.setAttribute("id", "newContentDiv-result");
    newDiv.appendChild(newContentDiv);

    var moreButton = document.createElement('button');
    moreButton.textContent = "더 보기";
    moreButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({moreContent: true}, () => {
            
        }); 
    });
    newDiv.appendChild(moreButton);

    var existingDiv = document.getElementById("secondary");

    // secondary(youtube 우측 최상단)에 결과를 넣을 div tag 삽입
    if(existingDiv) {
        var firstChild = existingDiv.firstChild;
        existingDiv.insertBefore(newDiv, firstChild);
    }
}, 2000);