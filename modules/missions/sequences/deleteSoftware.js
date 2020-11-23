var foo = $jSpaghetti.module("missions").sequence("deleteSoftware")

foo.instructions = [
	{"@askForPermission": 			"askPermissionToAbort"},
	{"@init": 						["checkBTCWallet", {"gotoif":["!*.$", "_exit"]}, "startDeleteSoftware", {"gotoif":["!*.$", "_exit"]}]},
	{"@tryToGetMission": 			["goToMissionsTab", "checkSameTypeAcceptedMission", {"gotoif":["*.$", "@startMissionExecution"]}, "isAvailableMissionsPage", {"gotoif":["!*.$", "@alertUnknownMissionKind"]}, "getURLMission", {"wait": "_forTheSignal"}, {"gotoif":["*.urlMission == null", "@init"]}]},
	{"@tryToAcceptMission": 		["goToAcceptMissionPage", "isThereMessageError", {"gotoif": ["*.$", "@init"]}, "clickOnAcceptMissionButton", {"wait": {"_forTheSignal": "waitForSubmitButton"}}, "clickOnConfirmAcceptMissionButton", "isThereMessageError", {"gotoif":["*.$", "@init"]}]},
	{"@startMissionExecution": 		["getDeleteSoftwareMissionInfo", "logout", "goToNextIp"]},
	{"@tryHostConnection": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isCrackerStrongEnough", {"gotoif":["!*.$", "@abortProcess"]}, "isThereMessageError", {"gotoif":["*.$", "@cleanOwnLogs"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@accessTarget": 				["goToLoginPage", "cancelLogProcesses", "signInKnownTarget", "isCrackerStrongEnough", {"gotoif":["!*.$", "@abortProcess"]}]},
	{"@cleanTargetLogs": 			["goToTargetLogs", "cleanMyIpClues", {"gotoif": ["*.isEmpty == true", "@cleanOwnLogs"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@tryToDeleteSoftware": 		["getSoftwareId", {"gotoif": ["!*.$", "@abortProcess"]}, "deleteSoftware", "isThereMessageError", {"gotoif":["*.$", "@abortProcess"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@cleanDeletingLogs": 			["goToTargetLogs", "cleanMyIpClues", {"gotoif": ["*.isEmpty == true", "@cleanOwnLogs"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@cleanOwnLogs": 				["logout", "goToOwnLogTab", "cancelLogProcesses", "cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@finishMission"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@finishMission": 				["goToMissionsTab", "clickOnFinishButton", {"wait": {"_forTheSignal": "waitForSubmitButton"}}, "confirmMissionCompleteButton", "sendMoneyToBTCWallet", {"gotoif": ["true", "@init"]}]},
	{"@abortProcess": 				[{"gotoif":["*.abortMissionAllowed", "@abortMission"]}, "showMessage", "_exit"]},
	{"@abortMission": 				["goToMissionsTab", "clickOnAbortMissionButton", {"wait": {"_forTheSignal": "waitForSubmitButton"}}, "clickOnConfirmAbortMissionButton", {"gotoif": ["true", "@init"]}]},
	{"@alertUnknownMissionKind": 	["alertAnotherMissionKindAlreadyAccepted", "_exit"]}
]

