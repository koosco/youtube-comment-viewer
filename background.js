let isActive = false;
let nextPageToken = '';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.active === true) {
        isActive = true;
        getFrequency();
    } else if (request.active === false) {
        isActive = false;
        clearInterval(pollingInterval);
    }   
    if (request.checkStatus === true) {
        sendResponse({isActive: isActive});
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'urlChanged') {
        console.log("urlChanged 감지");
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {action: 'clearGraph'});
                console.log("clearGraph 메시지 전송");
            }
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getCorrelations") {
        console.log("getCorrelations 감지");
        getFrequency(request.token)
            .then((result) => {
                console.log(result);
                sendResponse({success: true, data: result})
            })
            .catch((error) => sendResponse({success: false, error: error.message}));
        return true;
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getFrequency") {
        console.log("getFrequency 감지");
        getFrequency(request.token)
            .then((result) => {
                console.log(result);
                sendResponse({success: true, data: result})
            })
            .catch((error) => sendResponse({success: false, error: error.message}));
        return true;
    }
});

async function getFrequency(token) {
    try {
        const url = await getCurrentTabUrl();
        let apiUrl = `http://127.0.0.1:8000/api/youtube/frequency?url=${url}`;
        
        if (token) {
            apiUrl += `&page_token=${encodeURIComponent(token)}`;
        }
        console.log(`apiUrl: ${apiUrl}`);
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        console.log(data.comments);
        
        return data;
        
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        throw error;
    }
}

let pollingInterval;

function startPolling() {
    pollingInterval = setInterval(getFrequency, 5000);
}

// 더 보기 버튼 클릭 시 댓글 데이터 요청
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request && request.moreContent && isActive === true) {
        getFrequency();
    }
});

function getCurrentTabUrl() {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            resolve(tabs[0].url);
        });
    });
}

// // 초기 데이터 가져오기 및 폴링 시작
// if (isActive) {
//     fetchDataAndSend();
//     startPolling();
// }