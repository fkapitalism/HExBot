var camping = $jSpaghetti.module("camping")
camping.config.debugMode = true

camping.procedure("startBankCamping", function(shared){
	shared.myAccountsInfo = getBankAccountAddr()
	shared.ip = controllers.bot.controlPanel.fieldsContent[FIELD_BANK_IP_TARGET]
	shared.myAccount = shared.myAccountsInfo[shared.ip]
	shared.transferToBTC = controllers.bot.controlPanel.checkBoxes[SET_TRANSFER_TO_BTC]

	if(shared.transferToBTC){
		shared.BTCInfo = getBTCWalletInfo()
		//console.log(shared.BTCInfo)
		if(!shared.BTCInfo.isLogged){
			shared.isBTCLogged = false
			window.alert(LANG.DISCONNECTED_BTC_WALLET)
			return false
		} else {
			shared.isBTCLogged = true
		}
	}

	if (shared.myAccount === undefined){
		if(shared.ip.length){
			LANG.CAMPING_WITHOUT_VINCULATED_ACCOUNT
			window.alert(LANG.CAMPING_WITHOUT_VINCULATED_ACCOUNT.replace('{CONTENT}', ' "' + shared.ip + '"'))
		} else {
			window.alert(LANG.CAMPING_CHOOSE_IP)
		}
		return false
	}
	shared.accounts = []
	shared.myCluesFound = false
	shared.myIp = getMyIp(true)
	shared.listenForTransferActivities = true
	shared.listenForAccountAccessActivities = false
	shared.isLogged = false
	return true
})

camping.procedure("goToIp", function(shared){
	goToPage("/internet?ip=" + shared.ip)
})

camping.procedure("logout", function(shared){
	shared.isLogged = false
	goToPage("/internet?view=logout")
})

camping.procedure("logoutAccount", function(){
	goToPage("/internet?bAction=logout")
})

camping.procedure("isThereMessageError", function(){
	if (getDOMElement("div", "class", "alert alert-error", 0))
	return true
})

camping.procedure("forceToAccessTarget", function(){
	goToPage("/internet?action=hack")
})

camping.procedure("signInTarget", function(shared){
	shared.isLogged = true
	getDOMElement("input", "type", "submit", 1).click(); //Click on the Login button
})

camping.procedure("hackTargetBruteForce", function(){
	goToPage("/internet?action=hack&method=bf")
})

camping.procedure("hackAccount", function(shared){
	goToPage("/internet?action=hack&acc=" + shared.accounts.shift())
})

camping.procedure("accessKnownAccount", function(shared){
	var labels = ["This bank account does not exists", "Invalid bank account", "Essa conta bancária não existe", "inválida"]
	var errorMessageContainer = getDOMElement("div", "class", "alert alert-error", 0)
	if (strposOfArray(errorMessageContainer.innerHTML, labels) == -1){
		getDOMElement("input", "name", "acc", 0).value = getDOMElement("div", "class", "alert alert-error", 0).innerHTML.match(/[0-9]+/)[0]
		getDOMElement("input", "name", "pass", 0).value = getDOMElement("strong", null, null, 1).childNodes[0].nodeValue //Fill the password field with the password on screen
		getDOMElement("input", "type", "submit", 1).click() //Click on the Login button
	}
})

camping.procedure("accessUnknownAccount", function(shared){
	getDOMElement("input", "type", "submit", 1).click() //Click on the Login button
})

camping.procedure("goToOwnLogTab", function(){
	goToPage("/log")
})

camping.procedure("cleanMyIpClues", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	var pattern = new RegExp("^.*" + shared.myIp + ".*$")
	var textFiltered = removeLinesFromText(textArea.value, pattern)
	if (textArea.value != textFiltered){
		shared.myCluesFound = true
		textArea.value = textFiltered
	} else {
		shared.myCluesFound = false
	}
})

camping.procedure("cleanTextAreaContent", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	textArea.value = ""
	getDOMElement("input", "class", "btn btn-inverse", "last").click()
})

camping.procedure("submitLogs", function(shared){
	getDOMElement("input", "class", "btn btn-inverse", "last").click()
}) 

camping.procedure("extractDataFromLog", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	var lines = textArea.value.split(/[\n\r]/)
	var outputLines = []
	var myIpPattern = new RegExp("^.*" + shared.myIp + ".*$")
	var myAccounttTransferPattern = new RegExp("^.* to #" + shared.myAccount + ".*$")
	var myAccounttAccessPattern = new RegExp("^.* on account #" + shared.myAccount + ".*$")
	for (var i = 0; i < lines.length; i++) {
		if ((shared.listenForTransferActivities) &&
			((/^.*transferred \$[0-9]+ from #[0-9]+.*to #[0-9]+ at localhost$/.test(lines[i]))) &&
			(!myIpPattern.test(lines[i])) && (!myAccounttTransferPattern.test(lines[i]))) {
			var result = lines[i].match(/#[0-9]+/g)
			shared.accounts.push(result[1].replace("#", ""))
		} else 
		if ((shared.listenForAccountAccessActivities) &&
			((/^.*logged on account #[0-9]+$/.test(lines[i]))) &&
			(!myIpPattern.test(lines[i])) && (!myAccounttAccessPattern.test(lines[i]))) {
			var result = lines[i].match(/#[0-9]+/g)
			shared.accounts.push(result[0].replace("#", ""))
		} else {
			outputLines.push(lines[i])
		}
	}
	console.log("Caught accounts:", shared.accounts)
	var accounts = shared.accounts
	shared.accounts = accounts.filter(function(value, pos) {
		return accounts.indexOf(value) == pos
	})
	textArea.value = outputLines.join("\n")
})

camping.procedure("goToTargetLogs", function(){
	//if (!getDOMElement("textarea", "class", "logarea", 0) || (location.href.indexOf("/internet") == -1))
	goToPage("/internet?view=logs")
})

camping.procedure("transferMoneyToTarget", function(shared){
	getDOMElement("input", "name", "acc", 0).value = shared.myAccount //Fill the To field
	getDOMElement("input", "name", "ip", 1).value = shared.ip //Fill the Bank IP field
	getDOMElement("button", "class", "btn btn-success", 0).click() //Click on the Transfer Money button
})

camping.procedure("checkProgressBar", function(shared, funcs){
	var loop = setInterval(function(){
		var progressBar = getDOMElement("div", "role", "progressbar", 0)
		if(!progressBar){
			clearInterval(loop)
			funcs.sendSignal("Mishchap, go ahead. It'll never crash anymore ;)")
		}
	}, 50)
})

camping.procedure("goToLoginPage", function(){
	if (location.href.indexOf("/internet?action=login") == -1)
	goToPage("/internet?action=login")
})

camping.procedure("checkFunds", function(shared){
	var fundsContainer = getDOMElement("ul", "class", "finance-box", 0)
	var funds = fundsContainer.innerHTML.match(/\$[0-9,]+/)[0].replace(/[\$,]/gm, '')
	shared.funds = Number(funds)
	if (shared.funds > 0){
		return true
	} else {
		return false
	}
})

camping.procedure("sendMoneyToBTCWallet", function(shared){
	if(shared.isBTCLogged){
		var accountBalance = getBankAccountsBalance()[shared.myAccount]
		var bitcoinsToBuy = roundNumber(accountBalance / getBTCExchangeRate())
		if (bitcoinsToBuy >= 1){
			sendMoneyToBTCWallet(shared.myAccount, bitcoinsToBuy)
			console.log("Account " + shared.myAccount + ": $" + accountBalance + " - " + bitcoinsToBuy + " BTC bought")
		} else {
			console.log("Money is not enough to buy a bitcoin")
		}
	} else {
		console.log("BTC wallet unavailable")
	}
})

camping.procedure("cancelLogProcesses", function(){
	var processesPage = sendXMLHttpRequest("/processes", "GET", "", false)
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
		sendXMLHttpRequest("/processes", "GET", "pid=" + processesId[i] + "&del=1", false)
		console.log("HExBot webcrawler: Process " + processesId[i] + " is terminated")
	}
})


