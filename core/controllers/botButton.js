function botButton(){
	views.showBotButton()

	//Show command panel
	document.getElementById(BOT_BUTTON_DOM_ID).addEventListener("click", function(){
		if(controllers.bot.controlPanel.isHidden)
			controllers.functions.resetBotAndShowPanel()
		else {
			controllers.bot.controlPanel.isHidden = true
			controllers.functions.hidePanel()
		}
	})
}