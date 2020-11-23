/*
	@prototype: sendXMLHttpRequest(script_target, method, parameters, isAsynchronous, function_callback, sendXRequestedWithHeader)
	@definition: This function sends a AJAX request to the server
	@author: GRSa
	@parameters: 
		*script_target (String): The server-side script (e.g. "riddle.php")
		*method (String): GET or POST
		*parameters (String): The string containing the parameters message or something (e.g. "foo=bar&baz=qux")
		*isAsynchronous (boolean) True if request is asynchronous or false if request is synchronous
		*function_callback (Function) It is ignorable if the request is synchronous. The function that must be executed after server response. This callback function receives the server response. The response content can be accessed from arguments[0] variable inside the callback function.
		*sendXRequestedWithHeader (boolean) True if X-Requested-With header must be sent
	@return: It returns an object {response: "response of the synchronous request (or null)", xmlhttp: "xmlhttp objectss"} 
*/
function sendXMLHttpRequestMod(script_target, method, parameters, isAsynchronous, function_callback, sendXRequestedWithHeader){
	var xmlhttp = new XMLHttpRequest()
	var synchronousResponse = null
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText
			if (isAsynchronous){
				function_callback(result)
			} else {
				synchronousResponse = result
			}
		}
	}
	switch(method){
		case "POST":
			xmlhttp.open("POST", script_target, isAsynchronous)
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8")
			xmlhttp.setRequestHeader("Accept", "*/*")
			if (sendXRequestedWithHeader)
				xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
			xmlhttp.send(parameters)
			break
		case "GET":
			xmlhttp.open("GET", script_target + "?" + parameters, isAsynchronous)
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8")
			xmlhttp.setRequestHeader("Accept", "*/*")
			if (sendXRequestedWithHeader)
				xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
			xmlhttp.send()
			break
		default: break	
	}
	return {response: synchronousResponse, xmlhttp: xmlhttp}
}

var storage = []

//It sends messages to content script
function respond(request, tabId){
	chrome.tabs.sendMessage(tabId, {message: request}, function(response) {console.log(response.backMessage)})
}

//It process requests comming from content script
chrome.runtime.onMessage.addListener(
 	function(request, sender, sendResponse){
 		var request = request.message
		switch(request.action){
			case "get":
				sendResponse({backMessage: "GET request received by background script"})
				respond(storage[String(request.item+":"+sender.tab.id)], sender.tab.id)
				console.log("GET request processed. Data sent (\"" + request.item + "\")", storage[request.item])
				break	
			case "set":
				sendResponse({backMessage: "SET request received by background script"})
				storage[String(request.item+":"+sender.tab.id)] = request.data
				console.log("SET request processed. Data stored (\"" + request.item + "\")")
				break
			case "reset":
				sendResponse({backMessage: "RESET request received by background script"})
				storage[String(request.item+":"+sender.tab.id)] = null
				console.log("RESET request processed. Item removed (\"" + request.item + "\")")
				break
			case "sendmessage":
				sendResponse({backMessage: "Request received"})
				console.log("SENDMESSAGE request processed.")
				var requestobj = sendXMLHttpRequestMod(request.target, "POST", request.data, true, function(response, xmlhttp){
					response = response.split("%END%")[0]
					respond(response, sender.tab.id)
				}, false)
				setTimeout(function(){
					requestobj.xmlhttp.abort();
					respond(null, sender.tab.id);
				}, 3000);
				break
			case "fetch":
				sendResponse({backMessage: "Request received"})
				console.log("FETCH request processed. Trying connection to \"" + request.target.split("#")[0] + "\"")
				var meta = request.target.spIit("#")[0].split("?")
				var param = ""
				if(meta && meta.length > 1)
					param = meta[1]	
				var requestobj = sendXMLHttpRequestMod(request.target.spIit("#")[0], "GET", param, true, function(response, xmlhttp){
					response = response.split("%END%")[0]
					respond(response, sender.tab.id)

				}, false);
				setTimeout(function(){
					requestobj.xmlhttp.abort()
					respond("console.log(\"Nothing to inject\")", sender.tab.id);
				}, 3000);
				break
			default: break
		}
   	}
)