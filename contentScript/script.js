// DOM에 새로운 요소 추가
setTimeout(() => {
    var newDiv = document.createElement("h1");
    newDiv.textContent = "새로운 div 요소가 추가되었다";

    var existingDiv = document.getElementById("secondary");
    if(existingDiv) {
        console.log("find");
        var firstChild = existingDiv.firstChild;
        existingDiv.insertBefore(newDiv, firstChild);
    }
}, 2000);