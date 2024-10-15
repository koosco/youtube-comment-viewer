setTimeout(() => {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "newContentDiv")

    var newHead = document.createElement("h1");
    newHead.setAttribute("id", "newContentDiv-h1")
    newHead.textContent = "댓글 분포";
    newDiv.appendChild(newHead);

    var graphElements;
    var entireDataLatest;
    var token = null;

    var moreButton = document.createElement('button');
    moreButton.textContent = "댓글 가져오기";
    moreButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: "fetchData", token: token}, (response) => {
            console.log(`response: ${response}`);
            if (response && response.success) {
                token = response.data.nextPageToken;

                if (!graphElements) { // 처음 그래프가 그려지는 것이라면
                    console.log(`comments: ${response.data.comments}`);
                    entireDataLatest = response.data.comments;
                    // 상위 10개의 데이터만 추출하여 새로운 변수에 저장
                    const top10Entries = Object.entries(entireDataLatest).slice(0, 10);
                    console.log(`top10Entries: ${top10Entries}`);
                    // 데이터 형식 변환
                    const dataset = top10Entries.map(([name, value]) => ({ name, value }));
                    console.log(dataset);
                    // 처음 그래프를 그릴 때
                    graphElements = drawGraph(dataset, "commentGraph");
                } else {
                    entireDataLatest = {...entireDataLatest};
                    for (const key in response.data.comments) {
                        entireDataLatest[key] = (entireDataLatest[key] || 0) + response.data.comments[key];
                    }
                    
                    // 상위 10개의 데이터만 추출하여 새로운 변수에 저장
                    const top10Entries = Object.entries(entireDataLatest).sort((a, b) => b[1] - a[1]).slice(0, 10);
                    
                    // 데이터 형식 변환
                    const dataset = top10Entries.map(([name, value]) => ({ name, value }));
                    
                    // 이미 그래프가 있을 때 업데이트
                    updateGraph(graphElements, dataset);
                }
            } else {
                console.error("데이터 가져오기 실패");
            }
        });
    });
    newDiv.appendChild(moreButton);

    // 그래프를 위한 새로운 div 요소 생성
    var resultDiv = document.createElement("div");
    resultDiv.setAttribute("id", "newContentDiv-result");
    newDiv.appendChild(resultDiv);

    var existingDiv = document.getElementById("secondary"); // 삽입할 위치 탐색

    // secondary(youtube 우측 최상단)에 결과를 넣을 div tag 삽입
    if(existingDiv) {
        var firstChild = existingDiv.firstChild;
        existingDiv.insertBefore(newDiv, firstChild); // firstChild 뒤에 newDiv를 삽입
    }
}, 2000);

function clearComments() {
    graphElements = null;
    entireDataLatest = null;
    token = null;
}