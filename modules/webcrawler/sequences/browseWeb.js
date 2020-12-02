var foo = $jSpaghetti.module("webcrawler").sequence("browseWeb")

foo.instructions = [
	{"@init": 						["startSearching", {"gotoif":["!*.$", "@finishProcess"]}]},
	{"@goToNextTarget": 			["createNewHost","logout", {"gotoif": ["*.openList.length == 0", "@finishProcess"]}, "goToNextIp", "isIpInvalid", {"gotoif": ["*.$", "@ignoreIp"]}, "ipDoesNotExist", {"gotoif": ["*.$", "@ignoreIp"]}, "getHostLabel", "registerNPCNamesList", "isThereMessageError", {"gotoif": ["*.$", "@accountInaccessibleHost"]}]},
	{"@tryToInvadeTarget": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessKnownTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@accountInaccessibleHost"]}, "waitProgressBar"]},
	{"@accessKnownTarget": 			["goToLoginPage", "signInTarget", "isThereMessageError", {"gotoif":["*.$", "@accountInaccessibleHost"]}, "registerAccessible"]},
	{"@analyseTargetIps": 			["getUserCommandsResult", {"gotoif": ["*.cleaningLogsDisabled", "@getSoftwares"]}, "cancelLogProcesses", "goToTargetLogs", "isThereLogs", {"gotoif": ["!*.$","@getSoftwares"]}, "cleanMyIpClues", "getIpsFromLogs", "getBTCAccounts", "getShoppingLogs", "leaveSignature", "updateCrawlerLogs", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@getSoftwares"]}, "waitProgressBar"]},
	{"@getSoftwares": 				[{"gotoif":["!*.getSoftwareMode", "@cleanMyOwnLogs"]}, "goToTargetSoftwares", "getSoftwares", "updateCrawlerLogs"]},
	
	{"@uploadSoftware": 			[{"gotoif": ["!*.uploadMode", "@cleanMyOwnLogs"]}, "cancelLogProcesses", "runUploadSoftware", "isSoftwareAlreadyThere", {"gotoif":["*.$", "@installSoftware"]}, "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "isThereMessageSuccess", {"gotoif": ["*.$", "@cleanMyUploadClues"]}, "isWithinTimeLimit", {"gotoif": ["!*.$", "@abortUpload"]}, "waitProgressBar"]},
	{"@cleanMyUploadClues": 		["registerUploaded", {"gotoif": ["*.cleaningLogsDisabled", "@installSoftware"]}, "isSkipHideAfterUploadEnabled", {"gotoif":["*.$", "@installSoftware"]}, "goToTargetLogs", "isThereLogs", {"gotoif": ["!*.$", "@installSoftware"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@installSoftware"]}, "waitProgressBar"]},
	{"@installSoftware": 			["isInstallRequired", {"gotoif":["!*.$", "@manageCounter"]}, "cancelLogProcesses", "installSoftware", "isThereMessageError", {"gotoif":["((*.$) && (*.skipHideLogs))", "@cleanMyUploadCluesSkipped"]}, {"gotoif":["*.isThereMError", "@manageCounter"]}, "waitProgressBar", {"gotoif":[1, "@cleanMyInstallingClues"]}]},
	{"@cleanMyUploadCluesSkipped": 	[{"gotoif": ["*.cleaningLogsDisabled", "@hideSoftware"]}, "goToTargetLogs", "isThereLogs", {"gotoif": ["!*.$", "@manageCounter"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "waitProgressBar", {"gotoif":[1, "@manageCounter"]}]},
	{"@cleanMyInstallingClues": 	[{"gotoif": ["*.cleaningLogsDisabled", "@hideSoftware"]}, "goToTargetLogs", "registerInstalled", "isThereLogs", {"gotoif": ["!*.$", "@hideSoftware"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@hideSoftware"]}, "waitProgressBar"]},
	{"@hideSoftware": 				["isHiddingRequired", {"gotoif":["!*.$", "@manageCounter"]}, "cancelLogProcesses", "hideSoftware", "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "waitProgressBar"]},
	{"@cleanMyHiddingClues":  		[{"gotoif": ["*.cleaningLogsDisabled", "@manageCounter"]}, "goToTargetLogs", "registerHidden", "isThereLogs", {"gotoif": ["!*.$", "@manageCounter"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "waitProgressBar"]},
	{"@manageCounter": 				["updateCrawlerLogs", "manageUploadCounter", {"gotoif": ["*.currentSoftware > 0", "@uploadSoftware"]}]},

	{"@cleanMyOwnLogs": 			["shareHost",{"gotoif": ["((*.accessCounter < 3) && (*.openList.length > 0))", "@goToNextTarget"]}, "resetAccessCounter", "goToOwnLogTab", "cancelLogProcesses", "cleanTextAreaContent", "isThereMessageError", {"gotoif":["*.$", "@goToNextTarget"]}, "waitProgressBar", {"gotoif": ["true", "@goToNextTarget"]}]},
	{"@accountInaccessibleHost": 	["registerInaccessible", "updateCrawlerLogs", {"gotoif": ["true", "@goToNextTarget"]}]},
	{"@ignoreIp": 					["shareHost",{"gotoif": ["true", "@goToNextTarget"]}]},
	{"@abortUpload": 				["abortUpload",{"gotoif": ["true", "@manageCounter"]}]},
	{"@finishProcess": 				"_exit"}
]
