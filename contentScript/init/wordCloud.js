var wordCloudElements = null;
var wordCloudEntireDataLatest = {};
var token = null;

function initWordCloud(parent) {
    const wordCloudDiv = createTag("div", "wordCloudDiv");
    wordCloudDiv.style.paddingBottom = "20px";
    appendChildDivTo(parent, wordCloudDiv);

    const d3Container = createTag("div", "commentWordCloud");
    appendChildDivTo(wordCloudDiv, d3Container);

    const button = createTag("button", "word-cloud-button", "워드 클라우드 계산하기");
    wordCloudDiv.style.paddingBottom = "10px";
    addWordCloudEvent(button);
    appendChildDivTo(wordCloudDiv, button);
}

function addWordCloudEvent(button) {
    button.addEventListener('click', () => {
        chrome.runtime.sendMessage({action: "getFrequency", token: token}, (response) => getWordCloud(response));
    });
    console.log("버튼에 이벤트 추가 완료");
}

function getWordCloud(response) {
    if (!response || !response.success) {
        console.error("데이터 가져오기 실패");
        return;
    }
    
    token = response.data.nextPageToken;
    comments = response.data.comments;

    console.log(`comments: ${JSON.stringify(comments)}`);
    if (wordCloudElements === null) {
        createWordCloud(comments, "commentWordCloud");
    } 
    // updateWordCloud(comments, wordCloudElements, wordCloudEntireDataLatest);
}

function createWordCloud(comments) {
    console.log("[createWordCloud] 호출");

    const words = Object.entries(comments).map(([k, v]) => ({
        text: k,
        size: v
    }));
    console.log("[createWordCloud] 호출");
    console.log(JSON.stringify(words));
    drawWordCloud(words, "commentWordCloud");
}

// function updateWordCloud(comments, graphElements, entireDataLatest) {
//     // const words = comments.map(comment => ({
//     //     text: comment.text,
//     //     size: comment.size // size는 댓글의 길이나 중요도에 따라 결정할 수 있습니다.
//     // }));
//     drawWordCloud(words); // drawWordCloud 호출
// }