/*Customized storage to work with Chrome extension*/
Storage = function(storageName){
	this.storageName = storageName
	const Request = function(action, item, data){
		this.action = action
		this.item = item
		this.data = data
	}
	this.get = function(callback){
		const request = new Request("get", this.storageName)
		chrome.runtime.sendMessage(null, {message: request}, {}, function(response) {
			//console.log(response.backMessage)
			const runSequence = function(getResponse, sender, sendResponse) {
				sendResponse({backMessage: "GET response received by content script"})
				//console.log("GET response", getResponse.message)
				if(callback) callback(getResponse.message)
				chrome.extension.onMessage.removeListener(runSequence)
				return true;
			}
			chrome.runtime.onMessage.addListener(runSequence)
			return true;
		});
	}
	this.set = function(data, callback){
		const request = new Request("set", this.storageName, data)
		chrome.runtime.sendMessage(null, {message: request}, {}, function(response) {
			//console.log(response.backMessage)
			const runCallback = function(getResponse, sender, sendResponse) {
				sendResponse({backMessage: "SET response received by content script"})
				if(callback) callback()
				chrome.extension.onMessage.removeListener(runCallback)
				return true;
			}
			chrome.runtime.onMessage.addListener(runCallback)
			return true;
		});
	}
	this.reset = function(callback){
		const request = new Request("reset", this.storageName)
		chrome.runtime.sendMessage(null, {message: request}, {}, function(response) {
			//console.log(response.backMessage)
			const runCallback = function(getResponse, sender, sendResponse) {
				sendResponse({backMessage: "RESET response received by content script"})
				if(callback) callback()
				chrome.extension.onMessage.removeListener(runCallback)
				return true;
			}
			chrome.runtime.onMessage.addListener(runCallback)
			return true;
		});
	}
}