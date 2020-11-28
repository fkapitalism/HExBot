var ddos = $jSpaghetti.module("ddos")
ddos.config.debugMode = true

ddos.procedure("goToSoftwarePage", function () {
    goToPage("/software")
    return null
})

ddos.procedure("goToDDoSPage", function () {
    goToPage("/list?action=ddos")
    return null
})

ddos.procedure("checkProgressBar", function(shared, funcs){
	var loop = setInterval(function(){
		var progressBar = getDOMElement("div", "role", "progressbar", 0)
		if(!progressBar){
			clearInterval(loop)
			funcs.sendSignal("Mishchap, go ahead. It'll never crash anymore ;)")
		}
	}, 50)
    return null
})

ddos.procedure("launchDDoS", function () {
    var btns = document.getElementsByClassName("controls center")
    btns[0].getElementsByTagName("input")[0].value = controllers.bot.ddos.target
    btns[1].getElementsByTagName("input")[0].click()
    return null
})

ddos.procedure("goToIp", function () {
    goToPage("/internet?ip=" + controllers.bot.ddos.target)
    return null
})

ddos.procedure("goToOwnLogTab", function () {
    goToPage("/log")
    return null
})

ddos.procedure("cleanTextAreaContent", function (data) {
    var textArea = getDOMElement("textarea", "class", "logarea", 0)
    if (textArea.value.length > 0) {
        data.isEmpty = false
        textArea.value = ""
        getDOMElement("input", "class", "btn btn-inverse", 0).click()
    } else {
        data.isEmpty = true
    }
    return null
})

ddos.procedure("getInfos", function () {
    controllers.bot.ddos.target = document.getElementById(FIELD_DDOS_IP).value
    controllers.bot.ddos.times = document.getElementById(FIELD_DDOS_TIMES).value
    return null
})

ddos.procedure("decreaseTimes", function () {
    controllers.bot.ddos.times--
    return null
})

ddos.procedure("checkTimes", function () {
    if(controllers.bot.ddos.times > 0)
        return true
    return false
})

ddos.procedure("isThereMessageError", function(shared){
	var result = false
	if (getDOMElement("div", "class", "alert alert-error", 0) || document.getElementsByClassName("widget-content padding noborder")[0].innerText == "Error: hardware is not registered"){
		result = true
	}
	shared.isThereMError = result
	return shared.isThereMError
})

ddos.procedure("deleteRelatory", function (shared, hooks) {
    //var elms = $(".link.delete-ddos");
    const elms =  document.querySelector('.link.delete-ddos');
    if (elms.length > 0) {
        var Rate = elms[0];
        Rate.click();
        setTimeout(function () {
            document.getElementById("modal-form").submit();
            hooks.next()
        }, 1000);
    }
})