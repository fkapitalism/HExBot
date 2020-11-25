function setBGSnippet(data, callback){
	var request = new BGRequest("set", "", data, STORAGE_GEARS)
	chrome.runtime.sendMessage(null, {message: request}, {}, function(responseMessage) {
		callback()
		return true
	})
}