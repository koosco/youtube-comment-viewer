// 1. url 추출
// 2. background로 url 전송
chrome.runtime.sendMessage({url: document.URL}, () => {
    // background로 url 전송
});