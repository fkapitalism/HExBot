var cleanersMod = $jSpaghetti.module("cleaners")
cleanersMod.config.debugMode = true

cleanersMod.procedure("goToOwnLogTab", function(){
	goToPage("/log")
})

cleanersMod.procedure("cleanTextAreaContent", function(data){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if (textArea.value.length > 0){
		data.isEmpty = false
		textArea.value = ""
		getDOMElement("input", "class", "btn btn-inverse", 0).click()
	} else {
		data.isEmpty = true
	}
})

cleanersMod.procedure("goToSoftwareTab", function(){
	goToPage("/software")
})

cleanersMod.procedure("goToTargetLogs", function(){
	if (!getDOMElement("textarea", "class", "logarea", 0) || (location.href.indexOf("/internet") == -1))
	goToPage("/internet?view=logs")
})


cleanersMod.procedure("cleanMyIpClues", function(shared){
	shared.myCluesFound = false
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if (textArea){
		var pattern = new RegExp("^.*" + getMyIp(true) + ".*$")
		var textFiltered = removeLinesFromText(textArea.value, pattern)
		if (textArea.value != textFiltered){
			shared.myCluesFound = true
			textArea.value = textFiltered
		}
		return true
	} else {
		return false
	}
})

cleanersMod.procedure("isThereProgressBar", function(){
	var progressBar = getDOMElement("div", "role", "progressbar", 0)
	if (progressBar){
		return true
	} else {
		return false
	}
})

cleanersMod.procedure("submitLogs", function(shared){
	getDOMElement("input", "class", "btn btn-inverse", "last").click()
}) 

cleanersMod.procedure("goToLoginPage", function(){
	goToPage("/internet?action=login")
})

cleanersMod.procedure("hackTargetBruteForce", function(){
	goToPage("/internet?action=hack&method=bf")
})

cleanersMod.procedure("isThereMessageError", function(){
	if (getDOMElement("div", "class", "alert alert-error", 0))
	return true
})

cleanersMod.procedure("isAccessForbidden", function(){
	var errorContainer = getDOMElement("div", "class", "alert alert-error", 0)
	var labels = ["You do not have the needed software to perform this action", "Vocẽ não tem o software necessário para realizar essa ação", "your cracker is not good enough", "seu cracker não é bom o suficiente"]
	if (errorContainer){
		if(strposOfArray(errorContainer.innerHTML, labels) >= 0)
		return true
	}
	return false
})

cleanersMod.procedure("signInTarget", function(){
	getDOMElement("input", "type", "submit", 1).click(); //Click on the Login button
})

cleanersMod.procedure("checkProgressBar", function(shared, funcs){
	var loop = setInterval(function(){
		var progressBar = getDOMElement("div", "role", "progressbar", 0)
		if(!progressBar){
			clearInterval(loop)
			funcs.sendSignal("Mishchap, go ahead. It'll never crash anymore ;)")
		}
	}, 50)
})

cleanersMod.procedure("goToLoginPage", function(){
	if (location.href.indexOf("/internet?action=login") == -1)
	goToPage("/internet?action=login")
})


