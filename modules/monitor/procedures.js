const monitor = $jSpaghetti.module("monitor")
monitor.config.debugMode = false

monitor.procedure("checkMyOwnLogs", function(shared){
	function checkLogs(){
		sendXMLHttpRequest("/log", "GET", "", true, function(data){
			var parser = new DOMParser()
			var requestContentDOM = parser.parseFromString(data, "text/html")
			var container = requestContentDOM.getElementsByClassName("logarea")
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
								playSound("someone_invaded.mp3")
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

monitor.procedure("readEmail", function(shared, hooks){
	if (controllers.bot.controlPanel.checkBoxes[SET_MONITOR_EMAIL]){
		sendXMLHttpRequest("/mail", "GET", "", true, function(response){
			const parser = new DOMParser()
			const requestContentDOM = parser.parseFromString(response, "text/html")
			const as = requestContentDOM.getElementsByTagName("strong")
			const emails = []
			for(let i = 0;i < as.length; i++){
				const line = as[i]
				const emailParsed = parser.parseFromString(line.outerHTML, "text/html")
				const aElement = emailParsed.getElementsByTagName("a")

				if(aElement.length>0){
					item = aElement[0]
					const href = item.getAttribute('href')
				    if(typeof href === 'string'){
				    	if(href.match(/^mail\?id=[0-9]+/)){
				    		let emailParsed = parser.parseFromString(item.outerHTML, "text/html")
				    		var boldItem = emailParsed.getElementsByTagName("a")
				    		if(boldItem.length > 0){
				    			emails.push(boldItem[0].innerHTML)
				    		}
				    	}
				    }
				}    
			}
			if(emails.length > 0){
				const elements = document.getElementsByClassName('text')
				for(let j = 0;j < elements.length; j++){
					const element = elements[j]
					if(element.innerHTML.includes('E-Mail')){
						var danger = 0
						emails.forEach(subject => {
							if((subject.match(/^DDoS Incom+ing.*?/)) && (danger < 3)){
								danger = 3
								element.style.color = "red"
								playSound("ddos_comming.mp3")
							} else 

							if((subject.match(/^Suspeito do FBI.*?|^Sua recompensa aumentou.*?|^FBI suspect.*?|^Bounty increased.*?/)) && (danger < 2)){
								danger = 2
								element.style.color = "yellow"
							} else 

							if((subject.match(/^Safenet está atrás de você.*?|^Safenet is tracking you.*?/)) && (danger < 1)){
								danger = 1
								element.style.color = "blue"
							} else

							if(subject.match(/^New friend.*?|^Você ganhou um novo emblema.*?|^You earned a new badge!.*?/)){
								element.style.color = "green"
							}
						})
						break
					}
				}
			}
				
		})
	}
	return true
})

monitor.procedure("queryMissionPage", function(shared, hooks){
	shared.isMissionPageGot = false
	/*var requestContent = */
	sendXMLHttpRequest("/missions", "GET", "", false, (requestContent) => {
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
		hooks.next()
	})
})

monitor.procedure("checkTime", function(shared, hooks){
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
			hooks.next("ok, user is alerted")
		} else {
			var leftTime = shared.timeTarget - now
			var loop = setInterval(function(){
				if (controllers.bot.controlPanel.checkBoxes[SET_MISSIONS_MONITOR]){
					leftTime--
					if(leftTime <= 0){
						clearInterval(loop)
						showAlert()
						hooks.next("ok, user is alerted")
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
			hooks.next("try to get the left seconds again")
		}, 2000)
	}
	//return null
})

