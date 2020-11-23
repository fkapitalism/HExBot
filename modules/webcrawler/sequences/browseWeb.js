var foo = $jSpaghetti.module("webcrawler").sequence("browseWeb")

foo.instructions = [
	{"@init": 						["startSearching", {"gotoif":["!*.$", "@finishProcess"]}]},
	{"@goToNextTarget": 			["logout", {"gotoif": ["*.openList.length == 0", "@finishProcess"]}, "goToNextIp", "isIpInvalid", {"gotoif": ["*.$", "@ignoreIp"]}, "ipDoesNotExist", {"gotoif": ["*.$", "@ignoreIp"]}, "getHostLabel", "registerNPCNamesList", "isThereMessageError", {"gotoif": ["*.$", "@accountInaccessibleHost"]}]},
	{"@tryToInvadeTarget": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessKnownTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@accountInaccessibleHost"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@accessKnownTarget": 			["goToLoginPage", "signInTarget", "isThereMessageError", {"gotoif":["*.$", "@accountInaccessibleHost"]}, "registerAccessible"]},
	{"@analyseTargetIps": 			["getUserCommandsResult", {"gotoif": ["*.cleaningLogsDisabled", "@getSoftwares"]}, "cancelLogProcesses", "goToTargetLogs", "isThereLogs", {"gotoif": ["!*.$","@getSoftwares"]}, "cleanMyIpClues", "getIpsFromLogs", "getBTCAccounts", "getShoppingLogs", "leaveSignature", "updateCrawlerLogs", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@getSoftwares"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@getSoftwares": 				[{"gotoif":["!*.getSoftwareMode", "@cleanMyOwnLogs"]}, "goToTargetSoftwares", "getSoftwares", "updateCrawlerLogs"]},
	
	{"@uploadSoftware": 			[{"gotoif": ["!*.uploadMode", "@cleanMyOwnLogs"]}, "cancelLogProcesses", "runUploadSoftware", "isSoftwareAlreadyThere", {"gotoif":["*.$", "@installSoftware"]}, "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "isThereMessageSuccess", {"gotoif": ["*.$", "@cleanMyUploadClues"]}, "isWithinTimeLimit", {"gotoif": ["!*.$", "@abortUpload"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@cleanMyUploadClues": 		["registerUploaded", {"gotoif": ["*.cleaningLogsDisabled", "@installSoftware"]}, "isSkipHideAfterUploadEnabled", {"gotoif":["*.$", "@installSoftware"]}, "goToTargetLogs", "isThereLogs", {"gotoif": ["!*.$", "@installSoftware"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@installSoftware"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@installSoftware": 			["isInstallRequired", {"gotoif":["!*.$", "@manageCounter"]}, "cancelLogProcesses", "installSoftware", "isThereMessageError", {"gotoif":["((*.$) && (*.skipHideLogs))", "@cleanMyUploadCluesSkipped"]}, {"gotoif":["*.isThereMError", "@manageCounter"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}, {"gotoif":[1, "@cleanMyInstallingClues"]}]},
	{"@cleanMyUploadCluesSkipped": 	[{"gotoif": ["*.cleaningLogsDisabled", "@hideSoftware"]}, "goToTargetLogs", "isThereLogs", {"gotoif": ["!*.$", "@manageCounter"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}, {"gotoif":[1, "@manageCounter"]}]},
	{"@cleanMyInstallingClues": 	[{"gotoif": ["*.cleaningLogsDisabled", "@hideSoftware"]}, "goToTargetLogs", "registerInstalled", "isThereLogs", {"gotoif": ["!*.$", "@hideSoftware"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@hideSoftware"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@hideSoftware": 				["isHiddingRequired", {"gotoif":["!*.$", "@manageCounter"]}, "cancelLogProcesses", "hideSoftware", "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@cleanMyHiddingClues":  		[{"gotoif": ["*.cleaningLogsDisabled", "@manageCounter"]}, "goToTargetLogs", "registerHidden", "isThereLogs", {"gotoif": ["!*.$", "@manageCounter"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@manageCounter": 				["updateCrawlerLogs", "manageUploadCounter", {"gotoif": ["*.currentSoftware > 0", "@uploadSoftware"]}]},

	{"@cleanMyOwnLogs": 			[{"gotoif": ["((*.accessCounter < 3) && (*.openList.length > 0))", "@goToNextTarget"]}, "resetAccessCounter", "goToOwnLogTab", "cancelLogProcesses", "cleanTextAreaContent", "isThereMessageError", {"gotoif":["*.$", "@goToNextTarget"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}, {"gotoif": ["true", "@goToNextTarget"]}]},
	{"@accountInaccessibleHost": 	["registerInaccessible", "updateCrawlerLogs", {"gotoif": ["true", "@goToNextTarget"]}]},
	{"@ignoreIp": 					{"gotoif": ["true", "@goToNextTarget"]}},
	{"@abortUpload": 				["abortUpload", {"gotoif": ["true", "@manageCounter"]}]},
	{"@finishProcess": 				"_exit"}
]
