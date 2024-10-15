document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const statusMessage = document.getElementById('statusMessage');
    let active = false;

    function updateStatus() {
        statusMessage.textContent = active ? "실행중입니다" : "실행해주세요!";
        startButton.textContent = active ? "비활성화" : "활성화";
    }

    startButton.addEventListener('click', function() {
        active = !active;
        updateStatus();
        if (active) {
            chrome.runtime.sendMessage({active: true, isActive: true});
        } else {
            chrome.runtime.sendMessage({active: true, isActive: false});
        }   
    });

    // 초기 상태 확인 및 설정
    chrome.runtime.sendMessage({checkStatus: true}, function(response) {
        active = response.isActive;
        updateStatus();
    });
});
