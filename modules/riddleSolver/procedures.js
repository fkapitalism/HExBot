const riddle = $jSpaghetti.module("riddleSolver")
riddle.config.debugMode = true

riddle.procedure("init", function(shared, hooks){
	getMyIp(false, (myip) => {
		//shared.myIp = getMyIp()
		shared.myIp = myip
		shared.isCrackerOutdated = false
		shared.crackerToInstall = null
		hooks.next()
	})
})

riddle.procedure("isThereRiddle", function(shared, hooks){
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

riddle.procedure("getNewCrackerId", function(shared, hooks){
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

riddle.procedure("goToPageRiddle", function(shared, hooks){
	hooks.next()
	goToPage("/internet?view=software&cmd=riddle")
})

riddle.procedure("isThereLocalCracker", function(shared, hooks){
	/*var playerCrackers = */
	getSoftwaresByPattern("\.crc$", "/software", "", false, (playerCrackers) => {
		//console.log("player", playerCrackers)
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

riddle.procedure("goToTargetLogs", function(shared, hooks){
	hooks.next()
	goToPage("/internet?view=logs")
})

riddle.procedure("submitLogs", function(shared, hooks){
	const interval = setInterval(() => {
		const button = getDOMElement("input", "class", "btn btn-inverse", "last")
		if(button){
			hooks.next()
			button.click()
		} else {
			console.warn('BUTTON NOT FOUND!')
		}
	}, 100);
	
	//return null
}) 

riddle.procedure("test", function(){
	const text = `
	fdsafd[12.3.45.45 3.4.2.1  3.4.2.1
	192.368.0.53(
	`;
	var ips = extractIPsFromText(text, ['3.4.2.1'])
	console.log(ips)
})
		
riddle.procedure("cleanMyIpClues", function(data, hooks){
		
	//getMyIp(true, (myip) => {
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if (textArea && textArea.value.length > 0){
		data.isEmpty = false

		const ipsSource = textArea.value + ' ' + controllers.bot.controlPanel.fieldsContent[FIELD_IPS_START_SEARCHING]
		var ips = []
		if(ipsSource){
			ips = extractIPsFromText(ipsSource, [data.myIp])
		}
		//console.log("ips found", ips)
		controllers.bot.controlPanel.fieldsContent[FIELD_IPS_START_SEARCHING] = ips.join()
		controllers.storage.set(controllers.bot)

		//var pattern = new RegExp("^.*" + getMyIp(true) + ".*$")
		var pattern = new RegExp("^.*" + data.myIp + ".*$")
		textArea.value = removeLinesFromText(textArea.value, pattern)
		const button = getDOMElement("input", "class", "btn btn-inverse", "last")
		hooks.next()
		if(button){
			button.click()
		} else {
			console.warn('BUTTON NOT FOUND!')
		}
	} else {
		if(!textArea){
			console.warn('TEXT AREA NOT FOUND!')
		}
		data.isEmpty = true
		hooks.next()
	}
	if(data.cleanerCount != undefined) data.cleanerCount++
	//})
		
})

riddle.procedure("isThereTargetCracker", function(shared, hooks){
	/*var targetCrackers = */
	getSoftwaresByPattern("\.crc$", "/internet", "view=software", false, (targetCrackers) => {
		//console.log("target", targetCrackers)
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

riddle.procedure("goToTargetLogs", function(shared, hooks){
	if (!getDOMElement("textarea", "class", "logarea", 0) || (location.href.indexOf("/internet") == -1)){
		hooks.next()
		goToPage("/internet?view=logs")
	}	
	return null
})

riddle.procedure("isCrackerStrongEnough", function(){
	var errorContainer = getDOMElement("div", "class", "alert alert-error", 0)
	const dangerContainer = getDOMElement("div", "class", "alert alert-danger", 0)
	var labels = ["You do not have the needed software to perform this action", "Vocẽ não tem o software necessário para realizar essa ação", "your cracker is not good enough", "seu cracker não é bom o suficiente"]
	if ((errorContainer)||(dangerContainer)){
		if((strposOfArray(errorContainer.innerHTML, labels) >= 0) || (strposOfArray(dangerContainer.innerHTML, labels) >= 0))
		return false
	}
	return true
})

riddle.procedure("removeOutdatedCracker", function(shared, hooks){
	hooks.next()
	goToPage("/software?action=del&id=" + shared.playerCracker.id)
})

/*riddle.procedure("checkProgressBar", function(shared, funcs){
	var loop = setInterval(function(){
		var progressBar = getDOMElement("div", "role", "progressbar", 0)
		if(!progressBar){
			clearInterval(loop)
			funcs.sendSignal("Mishchap, go ahead. It'll never crash anymore ;)")
		}
	}, 50)
	return null
})*/

/*riddle.procedure("waitProgressBar", function (shared, hooks) {
    var loop = setInterval(function () {
        var progressBar = getDOMElement("div", "role", "progressbar", 0)
        if (!progressBar) {
            clearInterval(loop)
            hooks.next()
        }
    }, 100)
})*/


riddle.procedure('waitProgressBar', (shared, hooks) => {
	var counter = 0;
	var loop = setInterval(() => {

		const successContainer = getDOMElement("div", "class", "alert alert-success", 0)
		const errorContainer = getDOMElement("div", "class", "alert alert-error", 0)
		const dangerContainer = getDOMElement("div", "class", "alert alert-danger", 0)
		//var progressBar = getDOMElement("div", "role", "progressbar", 0)
		if ((successContainer) || (errorContainer) || (dangerContainer)) {
			clearInterval(loop)
			shared.cleanLogs = void 0;
			shared.isThereMessageError = false;
			if((errorContainer)||(dangerContainer)){
				shared.isThereMessageError = true;
				console.warn('ERROR MESSAGE')
			} else {
				console.warn('SUCCESS MESSAGE')
			}
			hooks.next()
		} else {
			var progressBar = getDOMElement("div", "role", "progressbar", 0)
			if(!progressBar){
				counter += 200;
				if(counter > 5000){//It wait 5 seconds for the progress bar 
					shared.isThereMessageError = false;
					clearInterval(loop)
					hooks.next()
				}
			} else {
				counter = 0;
				console.log("I see! Waiting progressbar!")
			}
		}
	}, 200)
})

riddle.procedure("installLocalCracker", function(shared, hooks){
	hooks.next()
	goToPage("/software?action=install&id=" + shared.crackerToInstall.id)
})

riddle.procedure("downloadCracker", function(shared, hooks){
	shared.crackerToInstall = shared.targetCracker
	//console.log("ata", shared.targetCracker)
	hooks.next()
	goToPage("/internet?view=software&cmd=dl&id=" + shared.targetCracker.id)
})

riddle.procedure("isThereMessageError", function(){
	const errorContainer = getDOMElement("div", "class", "alert alert-error", 0)
	const dangerContainer = getDOMElement("div", "class", "alert alert-danger", 0)
	if ((errorContainer)||(dangerContainer))
		return true
	return null
})

riddle.procedure("isRiddleSolved", function(shared){
	if(getNextPuzzleIP()){
		return true
	} else {
		return false
	}
})

riddle.procedure("forceToAccessTarget", function(shared, hooks){
	hooks.next()
	goToPage("/internet?action=hack")
})

riddle.procedure("hackTargetBruteForce", function(shared, hooks){
	hooks.next()
	goToPage("/internet?action=hack&method=bf")
})

riddle.procedure("goToLoginPage", function(shared, hooks){
	if (location.href.indexOf("/internet?action=login") == -1){
		hooks.next()
		goToPage("/internet?action=login")
	}
	return null
})

riddle.procedure("cancelLogProcesses", function(shared, hooks){
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
						if(pidContainer){
							var pid = pidContainer[0].match(/[0-9]+/)
							processesId.push(pid[0])
						}
					}
				}
			}
		}
		if(processesId.length){
			for (var i = 0; i < processesId.length; i++) {
				sendXMLHttpRequest("/processes", "GET", "pid=" + processesId[i] + "&del=1", false, () => {
					console.log("HExBot webcrawler: Process " + processesId[i] + " is terminated")
					if(i === processesId.length - 1){
						hooks.next()
					}
				})
			}
		} else {
			hooks.next()
		}
			
	})
		
})

riddle.procedure("signInKnownTarget", function(shared, hooks){
	hooks.next()
	getDOMElement("input", "type", "submit", 1).click(); //Click on the Login button
	return null
})

riddle.procedure("getNextIP", function(shared){
	shared.nextPuzzleIP = getNextPuzzleIP()
	return null
})

riddle.procedure("getNextIPFake", function(shared){
	shared.nextPuzzleIP = '208.55.14.95'
	return null
})

riddle.procedure("goToNextPuzzle", function(shared, hooks){
	hooks.next()
	goToPage("/internet?ip=" + shared.nextPuzzleIP)
})

riddle.procedure("logout", function(shared, hooks){
	hooks.next()
	goToPage("/internet?view=logout")
})

riddle.procedure("reload", function(shared, hooks){
	hooks.next()
	location.reload()
})

riddle.procedure("checkPuzzle", function(){
	puzzle_id = getPuzzleId()
	console.log(puzzle_id)
	return true
})

riddle.procedure("solvePuzzleAuto", function(){
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

riddle.procedure("solvePuzzle", function(){
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


riddle.procedure("isTooManySecretsNow", function(shared){
	var isTooManySecretsNow = false
	const container = document.getElementsByClassName('whois')
	if (container && container.length > 0 && container[0].nodeName == 'UL'){
		const members = document.querySelectorAll('span.whois-member')
		members.forEach((item) => {
			if(item.innerHTML == 'Too Many Secrets'){
				if(item.previousSibling && item.previousSibling.previousSibling){
					shared.nextPuzzleIP = item.previousSibling.previousSibling.innerHTML
					item.style.color = "red"
					item.previousSibling.previousSibling.style.color = "red"
					isTooManySecretsNow = true
				}
			}
		})
	}
	return isTooManySecretsNow
})

riddle.procedure("cleanLogs", function(shared, hooks){
	switch(shared.cleanLogs) {
		case undefined:
			shared.cleanLogs='on-logs'
			goToPage("/internet?view=logs")
			break
		case 'on-logs':
			var textArea = getDOMElement("textarea", "class", "logarea", 0)

			if(!textArea){
				console.warn('LOGS TEXT AREA NOT FOUND!')
				hooks.next()
			} else 
			
			if (textArea.value.length > 0){
				shared.isEmpty = false

				const ipsSource = textArea.value + ' ' + controllers.bot.controlPanel.fieldsContent[FIELD_IPS_START_SEARCHING]
				var ips = []
				if(ipsSource){
					ips = extractIPsFromText(ipsSource, [shared.myIp])
				}
				//console.log("ips found", ips)
				controllers.bot.controlPanel.fieldsContent[FIELD_IPS_START_SEARCHING] = ips.join()
				controllers.storage.set(controllers.bot)

				//var pattern = new RegExp("^.*" + getMyIp(true) + ".*$")
				var pattern = new RegExp("^.*" + shared.myIp + ".*$")

				const newLogs = removeLinesFromText(textArea.value, pattern)

				if(newLogs !== textArea.value){
					textArea.value = newLogs;
					const button = getDOMElement("input", "class", "btn btn-inverse", "last")
					if(button){
						shared.cleanLogs = 'after-submit'
						button.click()
					} else {
						console.warn('LOGS SUBMIT BUTTON NOT FOUND!')
						shared.cleanLogs = void 0; //void 0 returns undefined
						hooks.next()
					}
				} else {
					console.warn('LOGS are the same')
					hooks.next()
				}
			} else {
				console.warn('LOGS ARE EMPTY!')
				shared.isEmpty = true
				shared.cleanLogs = void 0; //void 0 returns undefined
				hooks.next()
			}
			if(shared.cleanerCount != undefined){
				shared.cleanerCount++
			}
			break
		case 'after-submit':
			var loop = setInterval(() => {
				const successContainer = getDOMElement("div", "class", "alert alert-success", 0)
				const errorContainer = getDOMElement("div", "class", "alert alert-error", 0)
				const dangerContainer = getDOMElement("div", "class", "alert alert-danger", 0)
				//var progressBar = getDOMElement("div", "role", "progressbar", 0)
				if ((successContainer) || (errorContainer) || (dangerContainer)) {
					clearInterval(loop)
					shared.cleanLogs = void 0;
					shared.isThereMessageError = false;
					if((errorContainer) || (dangerContainer)){
						shared.isThereMessageError = true;
						console.warn('ERROR MESSAGE')
					} else {
						console.warn('SUCCESS MESSAGE')
					}
					hooks.next()
				}
			}, 100)
			break
		default:
			console.warn('UNKNOWN STATE')
			shared.cleanLogs = void 0;
			return null;
	}
})