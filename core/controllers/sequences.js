function sequences(){
	$jSpaghetti.Storage = Storage
	if(controllers.bot.currentSequence != null){ //Executes the current sequence
		var moduleName = controllers.bot.currentSequence.moduleName
		var sequenceName = controllers.bot.currentSequence.sequenceName
		var currentSequence = $jSpaghetti.module(moduleName).sequence(sequenceName)
		currentSequence.run()		
		currentSequence.events.addEventListener("terminated", function(){
			if (controllers.bot.controlPanel.checkBoxes[SET_POPUP_AFTER_INSTRUCTION])
				controllers.functions.resetBotAndShowPanel()
			else
				controllers.bot.controlPanel.isHidden = true

			//-----------------------------------------------------------------------------------------------//
			//----Put here the sequences that must be started right after the current sequence is terminated-//
			//-----------------------------------------------------------------------------------------------//
			var delegateJobs = $jSpaghetti.module("monitor").sequence("delegateJobs")
			delegateJobs.reset(function(sequence){
				sequence.run()
			})
		})
	} else {
		//------------------------------------------------------------------------------------------//
		//----Put here the sequences that must be running while defined sequence is not running-----//
		//------------------------------------------------------------------------------------------//
		var puzzleSolver = $jSpaghetti.module("riddleSolver").sequence("solvePuzzle")
		puzzleSolver.reset(function(sequence){
			sequence.run()
		})

		var delegateJobs = $jSpaghetti.module("monitor").sequence("delegateJobs")
		delegateJobs.reset(function(sequence){
			sequence.run()
		})
	}
	//------------------------------------------------------------------------------------------//
	//----Put here the sequences that must be running every time-------------------------- -----//
	//------------------------------------------------------------------------------------------//

	/*var botkit = $jSpaghetti.module("botkit").sequence("run")
	botkit.reset(function(sequence){
		botkit.run()
	})

	var adRemover = $jSpaghetti.module("adRemover").sequence("removeAds")
	adRemover.reset(function(sequence){
		sequence.run()
	})*/
	
	let easyAccesses = $jSpaghetti.module("cleaners").sequence("createEasyAccesses")
	easyAccesses.reset(function(sequence){
		sequence.run()
	})

	if(controllers.bot.controlPanel.checkBoxes[SET_MISSIONS_MONITOR]){
		var missionMonitor = $jSpaghetti.module("monitor").sequence("checkMission")
		missionMonitor.reset(function(sequence){
			sequence.run()
		})
	}

	if(controllers.bot.controlPanel.checkBoxes[SET_MONITOR_EMAIL]){
		var emailMonitor = $jSpaghetti.module("monitor").sequence("checkEmail")
		emailMonitor.reset(function(sequence){
			sequence.run()
		})
	}

	if(controllers.bot.controlPanel.checkBoxes[SET_LOGS_MONITOR]){
		var logsMonitor = $jSpaghetti.module("monitor").sequence("checkMyOwnLogs")
		logsMonitor.reset(function(sequence){
			sequence.run()
		})
	}
	
	/*if(window.location.pathname.match(/\/list/)){
		var ipFilter = $jSpaghetti.module("IPDBFilter").sequence("filterIP")
		ipFilter.reset(function(sequence){
			sequence.run()
		})
	}*/
}
	

