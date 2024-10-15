// URL 변경 감지 함수
function detectURLChange() {
    console.log("detectURLChange 호출");
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        // URL이 변경되었을 때 background.js로 메시지 전송
        console.log("url 변경 감지");
        chrome.runtime.sendMessage({action: 'urlChanged', newUrl: url});
      }
    }).observe(document, {subtree: true, childList: true});
  }

  // 함수 실행
  detectURLChange();