/*Customized storage to work with Chrome extension*/
Storage = function(storageName){
	this.storageName = storageName
	var Request = function(action, item, data){
		this.action = action
		this.item = item
		this.data = data
	}
	this.get = function(callback){
		var request = new Request("get", this.storageName)
		chrome.runtime.sendMessage({message: request}, function(response) {
			//console.log(response.backMessage)
			var runSequence = function(getResponse, sender, sendResponse) {
				chrome.extension.onMessage.removeListener(runSequence)
				sendResponse({backMessage: "GET response received by content script"})
				//console.log("GET response", getResponse.message)
				if(callback)
				callback(getResponse.message)
			}
			chrome.runtime.onMessage.addListener(runSequence)
			
		})
	}
	this.set = function(data, callback){
		var request = new Request("set", this.storageName, data)
		chrome.runtime.sendMessage({message: request}, function(response) {
			//console.log(response.backMessage)
			if(callback)
			callback()
		})
	}
	this.reset = function(callback){
		var request = new Request("reset", this.storageName)
		chrome.runtime.sendMessage({message: request}, function(response) {
			//console.log(response.backMessage)
			if(callback)
			callback()
		})
	}
}