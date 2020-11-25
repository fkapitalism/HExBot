var foo = $jSpaghetti.module("riddleSolver")
foo.config.debugMode = true

foo.procedure("init", function(shared, hooks){
	getMyIp(false, (myip) => {
		//shared.myIp = getMyIp()
		shared.myIp = myip
		shared.isCrackerOutdated = false
		shared.crackerToInstall = null
		hooks.next()
	})
})

foo.procedure("isThereRiddle", function(shared, hooks){
	/*var softwareList = */
	getSoftwaresByPattern("(enigma.exe|riddle.exe)", "/internet", "view=software", false, (softwareList) => {
		if(softwareList){
			//return true
			hooks.next(true)
		} else {
			window.alert(LANG.COMPLETE_PATH_ERROR)
			//return false
			hooks.next(false)
		}
	})
})

foo.procedure("getNewCrackerId", function(shared, hooks){
	/*var playerCrackers = */
	getSoftwaresByPattern("\.crc", "/software", "", false, (playerCrackers) => {
		if(playerCrackers){
			shared.crackerToInstall = playerCrackers[0]
			//return true
			hooks.next(true)
		} else {
			//return false
			hooks.next(false)
		}
	})		
})

foo.procedure("goToPageRiddle", function(){
	goToPage("/internet?view=software&cmd=riddle")
	return null
})

foo.procedure("isThereLocalCracker", function(shared, hooks){
	/*var playerCrackers = */
	getSoftwaresByPattern("\.crc", "/software", "", false, (playerCrackers) => {
		if(playerCrackers.length > 0){
			shared.playerCracker = playerCrackers[0]
			if(!shared.playerCracker.installed){
				shared.crackerToInstall = shared.playerCracker
			} else {
				shared.crackerToInstall = null
			}
			//return true
			hooks.next(true)
		} else {
			//return false
			hooks.next(false)
		}
	})
})

foo.procedure("goToTargetLogs", function(){
	goToPage("/internet?view=logs")
	return null
})

foo.procedure("submitLogs", function(shared){
	getDOMElement("input", "class", "btn btn-inverse", "last").click()
	return null
}) 

foo.procedure("cleanMyIpClues", function(data, hooks){

	getMyIp(true, (myip) => {
		var textArea = getDOMElement("textarea", "class", "logarea", 0)
		if (textArea.value.length > 0){
			data.isEmpty = false
			//var pattern = new RegExp("^.*" + getMyIp(true) + ".*$")
			var pattern = new RegExp("^.*" + myip + ".*$")
			textArea.value = removeLinesFromText(textArea.value, pattern)
			getDOMElement("input", "class", "btn btn-inverse", "last").click()
		} else {
			data.isEmpty = true
		}
		if(data.cleanerCount != undefined) data.cleanerCount++
		hooks.next()
	})
		
})

foo.procedure("isThereTargetCracker", function(shared, hooks){
	/*var targetCrackers = */
	getSoftwaresByPattern("\.crc", "/internet", "view=software", false, (targetCrackers) => {
		if(targetCrackers.length > 0){
			shared.targetCracker = targetCrackers[0]
			if(parseFloat(shared.targetCracker.version) > parseFloat(shared.playerCracker.version)){
				shared.isCrackerOutdated = true
			} else {
				if(!shared.playerCracker.installed){
					shared.crackerToInstall = shared.playerCracker
				}
				shared.isCrackerOutdated = false
			}
			//return true
			hooks.next(true)
		} else {
			//return false
			hooks.next(false)
		}
	})	
})

foo.procedure("goToTargetLogs", function(){
	if (!getDOMElement("textarea", "class", "logarea", 0) || (location.href.indexOf("/internet") == -1))
	goToPage("/internet?view=logs")	
	return null
})

foo.procedure("isCrackerStrongEnough", function(){
	var errorContainer = getDOMElement("div", "class", "alert alert-error", 0)
	var labels = ["You do not have the needed software to perform this action", "Vocẽ não tem o software necessário para realizar essa ação", "your cracker is not good enough", "seu cracker não é bom o suficiente"]
	if (errorContainer){
		if(strposOfArray(errorContainer.innerHTML, labels) >= 0)
		return false
	}
	return true
})

foo.procedure("removeOutdatedCracker", function(shared){
	goToPage("/software?action=del&id=" + shared.playerCracker.id)
	return null
})

foo.procedure("checkProgressBar", function(shared, funcs){
	var loop = setInterval(function(){
		var progressBar = getDOMElement("div", "role", "progressbar", 0)
		if(!progressBar){
			clearInterval(loop)
			funcs.sendSignal("Mishchap, go ahead. It'll never crash anymore ;)")
		}
	}, 50)
})

foo.procedure("installLocalCracker", function(shared){
	goToPage("/software?action=install&id=" + shared.crackerToInstall.id)
	return null
})

foo.procedure("downloadCracker", function(shared){
	shared.crackerToInstall = shared.targetCracker
	goToPage("/internet?view=software&cmd=dl&id=" + shared.targetCracker.id)
	return null
})

foo.procedure("isThereMessageError", function(){
	if (getDOMElement("div", "class", "alert alert-error", 0))
		return true
	return null
})

foo.procedure("isRiddleSolved", function(shared){
	if(getNextPuzzleIP()){
		return true
	} else {
		return false
	}
})

foo.procedure("forceToAccessTarget", function(){
	goToPage("/internet?action=hack")
	return null
})

foo.procedure("hackTargetBruteForce", function(){
	goToPage("/internet?action=hack&method=bf")
	return null
})

foo.procedure("goToLoginPage", function(){
	if (location.href.indexOf("/internet?action=login") == -1)
	goToPage("/internet?action=login")
	return null
})

foo.procedure("cancelLogProcesses", function(shared, hooks){
	/*var processesPage = */
	sendXMLHttpRequest("/processes", "GET", "", false, (processesPage) => {
		var parser = new DOMParser()
		var requestContentDOM = parser.parseFromString(processesPage, "text/html")
		var container = requestContentDOM.getElementsByClassName("widget-content padding noborder")
		var processesId = []
		if((container) && (container.length > 0)){
			var processes = container[0].getElementsByTagName("LI")
			if ((processes) && (processes.length > 0)){
				var labels = ["Edit log at", "Editar log at"]
				for (var i = 0; i < processes.length; i++) {
					if(strposOfArray(processes[i].innerHTML, labels) >= 0){
						var pidContainer = processes[i].innerHTML.match(/processBlock[0-9]+/)
						var pid = pidContainer[0].match(/[0-9]+/)
						processesId.push(pid[0])
					}
				}
			}
		}
		for (var i = 0; i < processesId.length; i++) {
			sendXMLHttpRequest("/processes", "GET", "pid=" + processesId[i] + "&del=1", false, () => {
				console.log("HExBot webcrawler: Process " + processesId[i] + " is terminated")
				if(i == (processesId.length - 1)){
					hooks.next()
				}
			})
		}
	})
		
})

foo.procedure("signInKnownTarget", function(){
	getDOMElement("input", "type", "submit", 1).click(); //Click on the Login button
	return null
})

foo.procedure("getNextIP", function(shared){
	shared.nextPuzzleIP = getNextPuzzleIP()
	return null
})

foo.procedure("goToNextPuzzle", function(shared){
	goToPage("/internet?ip=" + shared.nextPuzzleIP)
	return null
})

foo.procedure("logout", function(){
	goToPage("/internet?view=logout")
	return null
})

foo.procedure("reload", function(){
	location.reload();
	return null
})

foo.procedure("solvePuzzleAuto", function(){
	//Puzzle handler controller
	var puzzle_id = null
	puzzle_id = getPuzzleId()
	if ((puzzle_id != null) && (!getNextPuzzleIP())){
		lang = detectLang()
		var button_content = null;
		switch(lang){
			case LANG_EN:
				button_content = "Solve riddle";
				break;
			case LANG_BR:
				button_content = "Resolver este enigma";
				break;
			default:
				button_content = "Solve riddle";
		}
		solvePuzzle(puzzle_id)
		return true
	} else {
		return false
	}
})

foo.procedure("solvePuzzle", function(){
	//Puzzle handler controller
	var puzzle_id = null
	puzzle_id = getPuzzleId()
	if ((puzzle_id != null) && (!getNextPuzzleIP())){
		lang = detectLang()
		var button_content = null;
		switch(lang){
			case LANG_EN:
				button_content = "Solve riddle";
				break;
			case LANG_BR:
				button_content = "Resolver este enigma";
				break;
			default:
				button_content = "Solve riddle";
		}
		getDOMElement("div", "class", "widget-title", 1).innerHTML += '<button id="solvePuzzleButton" class="btn btn-danger mission-abort">' + button_content + '</button>';
		document.getElementById("solvePuzzleButton").addEventListener("click", function(){
				solvePuzzle(puzzle_id)
		})
	}
	return null
})