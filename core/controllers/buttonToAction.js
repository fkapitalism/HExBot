function buttonToAction(){

	document.getElementById(SET_CLEAN_OWN_LOGS_DOM_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("cleaners", "cleanOwnLogs")
	})
	document.getElementById(SET_CLEAN_OWN_LOGS_DOM_ID).addEventListener("contextmenu", function(e){
		e.preventDefault()
		controllers.functions.executeSequence("cleaners", "test")
	})


	document.getElementById(SET_CLEAN_TARGET_LOGS_DOM_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("cleaners", "cleanTargetLogs")
	})
	document.getElementById(SET_CLEAN_TARGET_LOGS_DOM_ID).addEventListener("contextmenu", function(e){
		e.preventDefault()
		controllers.functions.executeSequence("cleaners", "test")
	})


	document.getElementById(SET_ACCESS_TARGET_CLEAN_LOGS_DOM_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("cleaners", "accessTargetAndCleanLogs")
	})
	document.getElementById(SET_ACCESS_TARGET_CLEAN_LOGS_DOM_ID).addEventListener("contextmenu", function(e){
		e.preventDefault()
		controllers.functions.executeSequence("cleaners", "test")
	})


	document.getElementById(PERFORM_CHECK_BALANCE_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("missions", "checkBalance")
	})
	document.getElementById(PERFORM_CHECK_BALANCE_ID).addEventListener("contextmenu", function(e){
		e.preventDefault()
		controllers.functions.executeSequence("missions", "test")
	})


	document.getElementById(PERFORM_TRANSFER_MONEY_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("missions", "transferMoney")
	})
	document.getElementById(PERFORM_TRANSFER_MONEY_ID).addEventListener("contextmenu", function(e){
		e.preventDefault() 
		controllers.functions.executeSequence("missions", "test")
	})


	document.getElementById(PERFORM_DELETE_SOFTWARE_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("missions", "deleteSoftware")
	})
	document.getElementById(PERFORM_DELETE_SOFTWARE_ID).addEventListener("contextmenu", function(e){
		e.preventDefault() 
		controllers.functions.executeSequence("missions", "test")
	})


	document.getElementById(PERFORM_BANK_CAMPING).addEventListener("click", function(){
		controllers.functions.executeSequence("camping", "bankCamping")
	})
	document.getElementById(PERFORM_BANK_CAMPING).addEventListener("contextmenu", function(e){
		e.preventDefault() 
		controllers.functions.executeSequence("camping", "test")
	})


	document.getElementById(SET_SEARCH_FOR_IPS).addEventListener("click", function(){
		controllers.functions.executeSequence("webcrawler", "browseWeb")
	})
	document.getElementById(SET_SEARCH_FOR_IPS).addEventListener("contextmenu", function(e){
		e.preventDefault() 
		controllers.functions.executeSequence("webcrawler", "test")
	})


	document.getElementById(PERFORM_UPDATE_CRACKER).addEventListener("click", function(){
		controllers.functions.executeSequence("riddleSolver", "completePath")
	})
	document.getElementById(PERFORM_UPDATE_CRACKER).addEventListener("contextmenu", function(e){
		e.preventDefault() 
		controllers.functions.executeSequence("riddleSolver", "test")
	})


	document.getElementById(INFO_ALERT).addEventListener("click", function(){
		window.alert(LANG.WARNING_BUTTON)
	})
	document.getElementById(CREDITS_INFO).addEventListener("click", function(){
		views.switchToMainScreenToCreditsScreen()
	})
	document.getElementById(SET_CONFIG_PANEL).addEventListener("click", function(){
		views.switchToChatPanel()
	})

}

	



