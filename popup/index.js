async function getUrl() {
    let [tab] = await chrome.tabs.query({ active: true })
    chrome.scripting.executeScript({
        target: { tabId: tab.id},
        func: () => {
            document.body.style.backgroundColor = "red";
            alert(document.URL);
        }
    });
}

document.getElementById("start-button").addEventListener("click", getUrl);