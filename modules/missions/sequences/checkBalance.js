var foo = $jSpaghetti.module("missions").sequence("checkBalance")

foo.instructions = [
	{"@askForPermission": 			"askPermissionToAbort"},
	{"@init": 						["checkBTCWallet", {"gotoif":["!*.$", "_exit"]}, "startCheckBalance", {"gotoif":["!*.$", "_exit"]}]},
	{"@tryToGetMission": 			["goToMissionsTab", "checkSameTypeAcceptedMission", {"gotoif":["*.$", "@startMissionExecution"]}, "isAvailableMissionsPage", {"gotoif":["!*.$", "@alertUnknownMissionKind"]}, "getURLMission", {"gotoif":["*.urlMission == null", "@init"]}]},
	{"@tryToAcceptMission": 		["goToAcceptMissionPage", "isThereMessageError", {"gotoif": ["*.$", "@init"]}, "clickOnAcceptMissionButton", "waitForSubmitButton", "clickOnConfirmAcceptMissionButton", "isThereMessageError", {"gotoif":["*.$", "@init"]}]},
	{"@startMissionExecution": 		["getMissionInfo", "logout", "goToNextIp"]},
	{"@hackAccountProcess": 		["hackAccount", "isCrackerStrongEnough", {"gotoif":["!*.$", "@abortProcess"]}, "isThereMessageError", {"gotoif":["*.$", "@signInAccountAndGetBalance"]}, "waitProgressBar"]},
	{"@signInAccountAndGetBalance": ["goToPageAccountLoginPage", "signInAccount", "checkFunds", {"gotoif":["!*.$", "@logoutAccount"]}, "getAccountBalance", {"wait": 1000}, "transferToMe", "sendMoneyToBTCWallet"]},
	{"@logoutAccount": 				["getOutFromAccount", "logout"]},
	{"@tryHostConnection": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@cleanOwnLogs"]}, "waitProgressBar"]},
	{"@accessTarget": 				["goToLoginPage", "cancelLogProcesses", "signInKnownTarget", "isCrackerStrongEnough", {"gotoif":["!*.$", "@abortProcess"]}]},
	{"@cleanTargetLogs": 			["goToTargetLogs", "cleanMyIpClues", {"gotoif": ["*.isEmpty == true", "@cleanOwnLogs"]}, "waitProgressBar"]},
	{"@cleanOwnLogs": 				["logout", "goToOwnLogTab", "cancelLogProcesses", "cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@finishMission"]}, "waitProgressBar"]},
	{"@finishMission": 				[{"gotoif":["*.funds == 0", "@abortProcess"]}, "goToMissionsTab", "informBalance", "waitForSubmitButton", "confirmMissionCompleteButton", "sendMoneyToBTCWallet", {"gotoif": ["true", "@init"]}]},
	{"@abortProcess": 				[{"gotoif":["*.abortMissionAllowed", "@abortMission"]}, "informBadCracker", "_exit"]},
	{"@abortMission": 				["goToMissionsTab", "clickOnAbortMissionButton", "waitForSubmitButton", "clickOnConfirmAbortMissionButton", {"gotoif": ["true", "@init"]}]},
	{"@alertUnknownMissionKind": 	["alertAnotherMissionKindAlreadyAccepted", "_exit"]}
]

