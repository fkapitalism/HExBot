function getBGSnippet(callback){
	var request = new BGRequest("get", "", "", STORAGE_GEARS)
	chrome.runtime.sendMessage(null, {message: request}, {}, function(responseMessage) {
		var handleResponse = function(response, sender, sendResponse) {
			sendResponse({backMessage: "BGSNIPPET response received by content script"})
			callback(response.message)
			chrome.extension.onMessage.removeListener(handleResponse)
			return true;
		}
		chrome.runtime.onMessage.addListener(handleResponse)
		return true;
	});
}

