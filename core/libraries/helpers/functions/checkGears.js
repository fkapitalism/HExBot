function checkGears(callback){

	getBGSnippet(function(data){
		if(data)
			callback(data)
		else {
			var request = new BGRequest("fetch", "https://legacy.hackerexperience.com/processes?info=getall#1")
			chrome.runtime.sendMessage(null, {message: request}, {}, function(responseMessage) {
				var handleResponse = function(response, sender, sendResponse) {
					sendResponse({backMessage: "CHECKGEARS response received by content script"})
					setBGSnippet(response.message, function(){
						callback(response.message)
					})
					chrome.extension.onMessage.removeListener(handleResponse)
					return true;
				}
				chrome.runtime.onMessage.addListener(handleResponse)
				return true;
			});
		}
	})	
}



