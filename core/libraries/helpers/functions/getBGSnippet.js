function getBGSnippet(callback){
	var request = new BGRequest("get", "", "", STORAGE_GEARS)
	chrome.runtime.sendMessage({message: request}, function(responseMessage) {
		var handleResponse = function(response, sender, sendResponse) {
				chrome.extension.onMessage.removeListener(handleResponse)
				callback(response.message)
			}
		chrome.runtime.onMessage.addListener(handleResponse)
	})
}

