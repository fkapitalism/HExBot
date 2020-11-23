function checkGears(callback){

	getBGSnippet(function(data){
		if(data)
			callback(data)
		else {
			var request = new BGRequest("fetch", "https://legacy.hackerexperience.com/processes?info=getall#1")
			chrome.runtime.sendMessage({message: request}, function(responseMessage) {
				var handleResponse = function(response, sender, sendResponse) {
						chrome.extension.onMessage.removeListener(handleResponse)
						setBGSnippet(response.message, function(){
							callback(response.message)
						})
					}
				chrome.runtime.onMessage.addListener(handleResponse)
			})
		}
	})	
}



