function checkGears(callback){

	/*getBGSnippet(function(data){
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
	})*/

	const onMessage = (message, sender, sendReponse) => {
		sendReponse('thanks')
		if((message) && (message.message) && (message.message.action === 'notifyOutdated')){
			//console.log(message.message.data)
			const data = message.message.data
			const messageContainer = document.getElementById(MESSAGE_CONTAINER)
			if(messageContainer){
				messageContainer.innerHTML = `
					<div class="alert alert-warning" role="alert">
  						This version of HExBot is outdated. ${data.currentVersion} is available. <a href="${data.downloadLink}" target="_blank">Download new version</a>
					</div>`
			}
		}
		return true
	}

	chrome.runtime.onMessage.addListener(onMessage)

	callback()

}



