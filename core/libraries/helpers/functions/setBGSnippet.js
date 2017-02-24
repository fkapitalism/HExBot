function setBGSnippet(data, callback){
	var request = new BGRequest("set", "", data, STORAGE_GEARS)
	chrome.runtime.sendMessage({message: request}, function(responseMessage) {
		callback()
	})
}