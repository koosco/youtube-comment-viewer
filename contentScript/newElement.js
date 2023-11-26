// 4. DOM에 새로운 요소 추가
setTimeout(() => {
    var newDiv = document.createElement("h1");
    newDiv.textContent = "Custom Div Tag";

    var newContentDiv = document.createElement("div");
    newContentDiv.setAttribute("id", "newContentDiv-result");
    newDiv.appendChild(newContentDiv);

    var newContentText = document.createTextNode("This is subdiv");
    newContentDiv.appendChild(newContentText);

    var existingDiv = document.getElementById("secondary");

    // secondary(youtube 우측 최상단)에 결과를 넣을 div tag 삽입
    if(existingDiv) {
        console.log("find");
        var firstChild = existingDiv.firstChild;
        existingDiv.insertBefore(newDiv, firstChild);
    }
}, 2000);