function botButton(){
	views.showBotButton()

	//Show command panel
	document.getElementById(BOT_BUTTON_DOM_ID).addEventListener("click", function(){
		controllers.functions.resetBotAndShowPanel()
	})
}