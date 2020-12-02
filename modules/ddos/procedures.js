const ddos = $jSpaghetti.module("ddos")
ddos.config.debugMode = true

ddos.procedure("goToSoftwarePage", function (shared, hooks) {
    hooks.next()
    goToPage("/software")
    return null
})

ddos.procedure("goToDDoSPage", function (shared, hooks) {
    hooks.next()
    goToPage("/list?action=ddos")
    return null
})

/*ddos.procedure("checkProgressBar", function(shared, funcs){
	var loop = setInterval(function(){
		var progressBar = getDOMElement("div", "role", "progressbar", 0)
		if(!progressBar){
			clearInterval(loop)
			funcs.sendSignal("Mishchap, go ahead. It'll never crash anymore ;)")
		}
	}, 50)
    return null
})*/

cleanersMod.procedure("waitProgressBar", function (shared, hooks) {
    var loop = setInterval(function () {
        var progressBar = getDOMElement("div", "role", "progressbar", 0)
        if (!progressBar) {
            clearInterval(loop)
            hooks.next()
        }
    }, 100)
})

ddos.procedure("launchDDoS", function (shared, hooks) {
    var btns = document.getElementsByClassName("controls center")
    //btns[0].getElementsByTagName("input")[0].value = controllers.bot.ddos.target  
    if(btns.length > 1){
        hooks.next()
        btns[0].getElementsByTagName("input")[0].value = shared.ddosTarget
        btns[1].getElementsByTagName("input")[0].click()
    }
    return null
})

ddos.procedure("goToIp", function (shared, hooks) {
    //goToPage("/internet?ip=" + controllers.bot.ddos.target)
    hooks.next()
    goToPage("/internet?ip=" + shared.ddosTarget)
    return null
})

ddos.procedure("goToOwnLogTab", function (shared, hooks) {
    hooks.next()
    goToPage("/log")
    return null
})

ddos.procedure("cleanTextAreaContent", function (data, hooks) {
    var textArea = getDOMElement("textarea", "class", "logarea", 0)
    if (textArea.value.length > 0) {
        data.isEmpty = false
        textArea.value = ""
        hooks.next()
        getDOMElement("input", "class", "btn btn-inverse", 0).click()
    } else {
        data.isEmpty = true
    }
    return null
})

ddos.procedure("getInfos", function (shared) {
    //controllers.bot.ddos.target = document.getElementById(FIELD_DDOS_IP).value
    //controllers.bot.ddos.times = document.getElementById(FIELD_DDOS_TIMES).value
    shared.ddosTarget = controllers.bot.controlPanel.fieldsContent[FIELD_DDOS_IP]
    shared.ddosTimes = controllers.bot.controlPanel.fieldsContent[FIELD_DDOS_TIMES]
    return null
})

ddos.procedure("decreaseTimes", function (shared) {
    //controllers.bot.ddos.times--
    shared.ddosTimes = shared.ddosTimes - 1
    return null
})

ddos.procedure("checkTimes", function (shared) {
    if(shared.ddosTimes > 0)
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