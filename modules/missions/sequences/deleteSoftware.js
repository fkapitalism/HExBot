var foo = $jSpaghetti.module("missions").sequence("deleteSoftware")

foo.instructions = [
	{"@askForPermission": 			["askPermissionToAbort", "init"]},
	{"@init": 						["checkBTCWallet", {"jumpif":["!*.$", "@exit"]}, "startDeleteSoftware", {"jumpif":["!*.$", "@exit"]}]},
	{"@tryToGetMission": 			["goToMissionsTab", "checkSameTypeAcceptedMission", {"jumpif":["*.$", "@startMissionExecution"]}, "isAvailableMissionsPage", {"jumpif":["!*.$", "@alertUnknownMissionKind"]}, "getURLMission", {"jumpif":["*.urlMission == null", "@init"]}]},
	{"@tryToAcceptMission": 		["goToAcceptMissionPage", "isThereMessageError", {"jumpif": ["*.$", "@init"]}, "clickOnAcceptMissionButton", "waitForSubmitButton", "clickOnConfirmAcceptMissionButton", "isThereMessageError", {"jumpif":["*.$", "@init"]}]},
	{"@startMissionExecution": 		["getDeleteSoftwareMissionInfo", "logout", "goToNextIp"]},
	{"@tryHostConnection": 			["forceToAccessTarget", "isThereMessageError", {"jumpif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isCrackerStrongEnough", {"jumpif":["!*.$", "@abortProcess"]}, "isThereMessageError", {"jumpif":["*.$", "@cleanOwnLogs"]}, "waitProgressBar"]},
	{"@accessTarget": 				["goToLoginPage", "cancelLogProcesses", "signInKnownTarget", "isCrackerStrongEnough", {"jumpif":["!*.$", "@abortProcess"]}]},
	{"@cleanTargetLogs": 			["goToTargetLogs", "cleanMyIpClues", {"jumpif": ["*.isEmpty == true", "@cleanOwnLogs"]}, "waitProgressBar"]},
	{"@tryToDeleteSoftware": 		["getSoftwareId", {"jumpif": ["!*.$", "@abortProcess"]}, "deleteSoftware", "isThereMessageError", {"jumpif":["*.$", "@abortProcess"]}, "waitProgressBar"]},
	{"@cleanDeletingLogs": 			["goToTargetLogs", "cleanMyIpClues", {"jumpif": ["*.isEmpty == true", "@cleanOwnLogs"]}, "waitProgressBar"]},
	{"@cleanOwnLogs": 				["logout", "goToOwnLogTab", "cancelLogProcesses", "cleanTextAreaContent", {"jumpif": ["*.isEmpty == true", "@finishMission"]}, "waitProgressBar"]},
	{"@finishMission": 				["goToMissionsTab", "clickOnFinishButton", "waitForSubmitButton", "confirmMissionCompleteButton", "sendMoneyToBTCWallet", {"jumpif": ["true", "@init"]}]},
	{"@abortProcess": 				[{"jumpif":["*.abortMissionAllowed", "@abortMission"]}, "showMessage", {"exit": 1}]},
	{"@abortMission": 				["goToMissionsTab", "clickOnAbortMissionButton", "waitForSubmitButton", "clickOnConfirmAbortMissionButton", {"jumpif": ["true", "@init"]}]},
	{"@alertUnknownMissionKind": 	["alertAnotherMissionKindAlreadyAccepted", {"exit": 1}]},
	{"@exit": 						[{"exit": 1}]}
]

