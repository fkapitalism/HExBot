var foo = $jSpaghetti.module("webcrawler").sequence("browseWeb")

foo.instructions = [
	{"@init": 						["startSearching", {"jumpif":["!*.$", "@finishProcess"]}]},
	{"@goToNextTarget": 			["createNewHost","logout", {"jumpif": ["*.openList.length == 0", "@finishProcess"]}, "goToNextIp", "isIpInvalid", {"jumpif": ["*.$", "@ignoreIp"]}, "ipDoesNotExist", {"jumpif": ["*.$", "@ignoreIp"]}, "getHostLabel", "registerNPCNamesList", "isThereMessageError", {"jumpif": ["*.$", "@accountInaccessibleHost"]}]},
	{"@tryToInvadeTarget": 			["forceToAccessTarget", "isThereMessageError", {"jumpif":["*.$", "@accessKnownTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"jumpif":["*.$", "@accountInaccessibleHost"]}, "waitProgressBar"]},
	{"@accessKnownTarget": 			["goToLoginPage", "signInTarget", "isThereMessageError", {"jumpif":["*.$", "@accountInaccessibleHost"]}, "registerAccessible"]},
	{"@analyseTargetIps": 			["getUserCommandsResult", {"jumpif": ["*.cleaningLogsDisabled", "@getSoftwares"]}, "cancelLogProcesses", "goToTargetLogs", "isThereLogs", {"jumpif": ["!*.$","@getSoftwares"]}, "cleanMyIpClues", "getIpsFromLogs", "getBTCAccounts", "getShoppingLogs", "leaveSignature", "updateCrawlerLogs", "submitLogs", "isThereMessageError", {"jumpif":["*.$", "@getSoftwares"]}, "waitProgressBar"]},
	{"@getSoftwares": 				[{"jumpif":["!*.getSoftwareMode", "@cleanMyOwnLogs"]}, "goToTargetSoftwares", "getSoftwares", "updateCrawlerLogs"]},
	
	{"@fileCreating": 				["createFiles",{"jumpif": ["!*.$", "@uploadSoftware"]}]},
	{"@cleanMyUploadClues": 		[{"jumpif": ["*.cleaningLogsDisabled", "@uploadSoftware"]}, "goToTargetLogs", "isThereLogs", {"jumpif": ["!*.$", "@uploadSoftware"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"jumpif":["*.$", "@uploadSoftware"]}, "waitProgressBar"]},

	{"@uploadSoftware": 			[{"jumpif": ["!*.uploadMode", "@cleanMyOwnLogs"]}, "cancelLogProcesses", "runUploadSoftware", "isSoftwareAlreadyThere", {"jumpif":["*.$", "@installSoftware"]}, "isThereMessageError", {"jumpif":["*.$", "@manageCounter"]}, "isThereMessageSuccess", {"jumpif": ["*.$", "@cleanMyUploadClues"]}, "isWithinTimeLimit", {"jumpif": ["!*.$", "@abortUpload"]}, "waitProgressBar"]},
	{"@cleanMyUploadClues": 		["registerUploaded", {"jumpif": ["*.cleaningLogsDisabled", "@installSoftware"]}, "isSkipHideAfterUploadEnabled", {"jumpif":["*.$", "@installSoftware"]}, "goToTargetLogs", "isThereLogs", {"jumpif": ["!*.$", "@installSoftware"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"jumpif":["*.$", "@installSoftware"]}, "waitProgressBar"]},
	{"@installSoftware": 			["isInstallRequired", {"jumpif":["!*.$", "@manageCounter"]}, "cancelLogProcesses", "installSoftware", "isThereMessageError", {"jumpif":["((*.$) && (*.skipHideLogs))", "@cleanMyUploadCluesSkipped"]}, {"jumpif":["*.isThereMError", "@manageCounter"]}, "waitProgressBar", {"jumpif":[1, "@cleanMyInstallingClues"]}]},
	{"@cleanMyUploadCluesSkipped": 	[{"jumpif": ["*.cleaningLogsDisabled", "@hideSoftware"]}, "goToTargetLogs", "isThereLogs", {"jumpif": ["!*.$", "@manageCounter"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"jumpif":["*.$", "@manageCounter"]}, "waitProgressBar", {"jumpif":[1, "@manageCounter"]}]},
	{"@cleanMyInstallingClues": 	[{"jumpif": ["*.cleaningLogsDisabled", "@hideSoftware"]}, "goToTargetLogs", "registerInstalled", "isThereLogs", {"jumpif": ["!*.$", "@hideSoftware"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"jumpif":["*.$", "@hideSoftware"]}, "waitProgressBar"]},
	{"@hideSoftware": 				["isHiddingRequired", {"jumpif":["!*.$", "@manageCounter"]}, "cancelLogProcesses", "hideSoftware", "isThereMessageError", {"jumpif":["*.$", "@manageCounter"]}, "waitProgressBar"]},
	{"@cleanMyHiddingClues":  		[{"jumpif": ["*.cleaningLogsDisabled", "@manageCounter"]}, "goToTargetLogs", "registerHidden", "isThereLogs", {"jumpif": ["!*.$", "@manageCounter"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"jumpif":["*.$", "@manageCounter"]}, "waitProgressBar"]},
	{"@manageCounter": 				["updateCrawlerLogs", "manageUploadCounter", {"jumpif": ["*.currentSoftware > 0", "@uploadSoftware"]}]},

	{"@cleanMyOwnLogs": 			["shareHost",{"jumpif": ["((*.accessCounter < 3) && (*.openList.length > 0))", "@goToNextTarget"]}, "resetAccessCounter", "goToOwnLogTab", "cancelLogProcesses", "cleanTextAreaContent", "isThereMessageError", {"jumpif":["*.$", "@goToNextTarget"]}, "waitProgressBar", {"jumpif": ["true", "@goToNextTarget"]}]},
	{"@accountInaccessibleHost": 	["registerInaccessible", "updateCrawlerLogs", {"jumpif": ["true", "@goToNextTarget"]}]},
	{"@ignoreIp": 					["shareHost",{"jumpif": ["true", "@goToNextTarget"]}]},
	{"@abortUpload": 				["abortUpload",{"jumpif": ["true", "@manageCounter"]}]},
	{"@finishProcess": 				{"exit": 1}}
]
