var foo = $jSpaghetti.module("missions").sequence("deleteSoftware")

foo.instructions = [
	{"@askForPermission": 			["askPermissionToAbort", "init"]},
	{"@init": 						["checkBTCWallet", {"gotoif":["!*.$", "_exit"]}, "startDeleteSoftware", {"gotoif":["!*.$", "_exit"]}]},
	{"@tryToGetMission": 			["goToMissionsTab", "checkSameTypeAcceptedMission", {"gotoif":["*.$", "@startMissionExecution"]}, "isAvailableMissionsPage", {"gotoif":["!*.$", "@alertUnknownMissionKind"]}, "getURLMission", {"gotoif":["*.urlMission == null", "@init"]}]},
	{"@tryToAcceptMission": 		["goToAcceptMissionPage", "isThereMessageError", {"gotoif": ["*.$", "@init"]}, "clickOnAcceptMissionButton", "waitForSubmitButton", "clickOnConfirmAcceptMissionButton", "isThereMessageError", {"gotoif":["*.$", "@init"]}]},
	{"@startMissionExecution": 		["getDeleteSoftwareMissionInfo", "logout", "goToNextIp"]},
	{"@tryHostConnection": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isCrackerStrongEnough", {"gotoif":["!*.$", "@abortProcess"]}, "isThereMessageError", {"gotoif":["*.$", "@cleanOwnLogs"]}, "waitProgressBar"]},
	{"@accessTarget": 				["goToLoginPage", "cancelLogProcesses", "signInKnownTarget", "isCrackerStrongEnough", {"gotoif":["!*.$", "@abortProcess"]}]},
	{"@cleanTargetLogs": 			["goToTargetLogs", "cleanMyIpClues", {"gotoif": ["*.isEmpty == true", "@cleanOwnLogs"]}, "waitProgressBar"]},
	{"@tryToDeleteSoftware": 		["getSoftwareId", {"gotoif": ["!*.$", "@abortProcess"]}, "deleteSoftware", "isThereMessageError", {"gotoif":["*.$", "@abortProcess"]}, "waitProgressBar"]},
	{"@cleanDeletingLogs": 			["goToTargetLogs", "cleanMyIpClues", {"gotoif": ["*.isEmpty == true", "@cleanOwnLogs"]}, "waitProgressBar"]},
	{"@cleanOwnLogs": 				["logout", "goToOwnLogTab", "cancelLogProcesses", "cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@finishMission"]}, "waitProgressBar"]},
	{"@finishMission": 				["goToMissionsTab", "clickOnFinishButton", "waitForSubmitButton", "confirmMissionCompleteButton", "sendMoneyToBTCWallet", {"gotoif": ["true", "@init"]}]},
	{"@abortProcess": 				[{"gotoif":["*.abortMissionAllowed", "@abortMission"]}, "showMessage", "_exit"]},
	{"@abortMission": 				["goToMissionsTab", "clickOnAbortMissionButton", "waitForSubmitButton", "clickOnConfirmAbortMissionButton", {"gotoif": ["true", "@init"]}]},
	{"@alertUnknownMissionKind": 	["alertAnotherMissionKindAlreadyAccepted", "_exit"]}
]

