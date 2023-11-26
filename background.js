chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("[background] chrome.runtime.onMessage.addListener()");
    // 0. content script와의 통신 확인 - o
    // sendResponse({url: request.url});

    // 1. server로 url 전달 - o
    fetch("http://127.0.0.1:8081/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: request.url
        })
    })
        .then(response => response.json())
        .then(data => {
            // 2. server에서 data response 받음 - o
            // 3. content script로 data 전달 - o
            chrome.tabs.query({ active: true, currentWindow: true }, (pages) => {
                chrome.tabs.sendMessage(pages[0].id, { result: data });
            });
        })
});