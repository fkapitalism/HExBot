var monitor = $jSpaghetti.module("monitor")
monitor.config.debugMode = false

monitor.procedure("checkMyOwnLogs", function(shared){
	function checkLogs(){
		sendXMLHttpRequest("/log", "GET", "", true, function(data){
			var parser = new DOMParser()
			var requestContentDOM = parser.parseFromString(data, "text/html")
			var container = requestContentDOM.getElementsByTagName("textarea")
			var isActivityFound = false
			if ((container) && (container.length > 0)){
				var logArea = container[0]
				if ((logArea.value) && (logArea.value.length > 0)){
					var suspectLines = logArea.value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2} - \[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\].*/gmi)
					if ((suspectLines) && (suspectLines.length > 0)){
						for (var i = 0; i < suspectLines.length; i++){ 
							if(controllers.bot.controlPanel.lists[FIELD_SUSPECT_LOGS].indexOf(suspectLines[i]) == -1){
								controllers.bot.controlPanel.lists[FIELD_SUSPECT_LOGS].unshift(suspectLines[i])
								controllers.bot.showMissionAlert = true
								controllers.storage.set(controllers.bot)
								isActivityFound = true
							}
						}
					}
				}
			}
			if((isActivityFound) || (controllers.bot.showMissionAlert)){
				views.colorSideBarMenu("log")
				if(window.location.pathname == "/log"){
					controllers.bot.showMissionAlert = false
					controllers.storage.set(controllers.bot)
				}
			}
		})
	}
	checkLogs()
	if (window.location.pathname == "/log"){
		if ((controllers.bot.controlPanel.lists[FIELD_SUSPECT_LOGS].length > 0) &&
			(controllers.bot.controlPanel.checkBoxes[SET_LOGS_MONITOR]))
		views.appendAndShowSuspectAccesses("--- SUSPECT ACTIVITIES ---\n" + controllers.bot.controlPanel.lists[FIELD_SUSPECT_LOGS].join("\n"))
	}
	var loop = setInterval(function(){
		if (controllers.bot.controlPanel.checkBoxes[SET_LOGS_MONITOR]){	
			checkLogs()
		} else {
			clearInterval(loop)
		}
	}, 1000)	
})

monitor.procedure("queryMissionPage", function(shared){
	shared.isMissionPageGot = false
	var requestContent = sendXMLHttpRequest("/missions", "GET", "", false)
	var parser = new DOMParser()
	var requestContentDOM = parser.parseFromString(requestContent, "text/html")
	var container = requestContentDOM.getElementsByClassName("span3")
	if ((container) && (container.length > 0)) {
		var secondsWidget = container[0].getElementsByClassName("widget-content padding")[0]
		if (secondsWidget){
			var secondsToNextMissions = secondsWidget.innerHTML.match(/[0-9]+/gm)
			if ((secondsToNextMissions) && (secondsToNextMissions.length > 0)){
				shared.secondsToNextMissions = secondsToNextMissions[0]
				shared.timeTarget = (Date.now() / 1000 + shared.secondsToNextMissions * 60) - 50
				shared.alertNewMissions = false
				shared.isMissionPageGot = true
			} else {
				shared.secondsToNextMissions = null
			}
		} else {
			shared.secondsToNextMissions = null
		}
	} else {
		shared.secondsToNextMissions = null
	}
})

monitor.procedure("checkTime", function(shared, func){
	function showAlert(){
		if (!shared.stopShowAlert){
			views.colorSideBarMenu("missions")
			shared.isUserAlerted = true
		}
	}
	function hideAlert(){
		if(shared.isUserAlerted){
			views.discolorSideBarMenu("missions")
			shared.isUserAlerted = false
		}
	}
	//Stop showing alert if user access the mission page
	if (window.location.pathname.indexOf("missions") >= 0){
		shared.stopShowAlert = true
	}

	if((shared.secondsToNextMissions > 1) && (!shared.isUserAlerted)){
		var now = Date.now() / 1000
		hideAlert()
		shared.stopShowAlert = false
		if(now >= shared.timeTarget){
			showAlert()
			func.sendSignal("ok, user is alerted")
		} else {
			var leftTime = shared.timeTarget - now
			var loop = setInterval(function(){
				if (controllers.bot.controlPanel.checkBoxes[SET_MISSIONS_MONITOR]){
					leftTime--
					if(leftTime <= 0){
						clearInterval(loop)
						showAlert()
						func.sendSignal("ok, user is alerted")
					}
				} else {
					clearInterval(loop)
				}
			}, 1000)
		}
	} else {
		if (shared.secondsToNextMissions <= 1){
			showAlert()
		} else {
			hideAlert()
		}	
		setTimeout(function(){
			func.sendSignal("try to get the left seconds again")
		}, 2000)
	}
})

