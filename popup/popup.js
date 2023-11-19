chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs && tabs[0] && tabs[0].url) {
                const currentTabUrl = tabs[0].url;
                
                var inputElement = document.getElementById("urlInput");
                inputElement.value = currentTabUrl;
            }  
});