chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("[background] chrome.runtime.onMessage.addListener()");
    
    fetch("http://127.0.0.1:8081/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: request.url
        })
    })
    sendResponse({url: request.url})
})