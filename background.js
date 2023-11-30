chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // 0. content script와의 통신 확인
    // sendResponse({url: request.url});
    if(request && request.url){
        // 1. server로 url 전달
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
                // 2. server에서 data response 받음
                // 3. content script로 data 전달
                chrome.tabs.query({ active: true, currentWindow: true }, (pages) => {
                    chrome.tabs.sendMessage(pages[0].id, { result: data });
                });
            })
        }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request && request.moreContent) {
        chrome.tabs.query({ active: true, currentWindow: true }, (pages) => {
            chrome.tabs.sendMessage(pages[0].id, { moreContentresult: 'moreContent success' });
        });
    }
});