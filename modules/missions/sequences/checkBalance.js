var foo = $jSpaghetti.module("missions").sequence("checkBalance")

foo.instructions = [
	{"@askForPermission": 			"askPermissionToAbort"},
	{"@init": 						["checkBTCWallet", {"jumpif":["!*.$", "@exit"]}, "startCheckBalance", {"jumpif":["!*.$", "@exit"]}]},
	{"@tryToGetMission": 			["goToMissionsTab", "checkSameTypeAcceptedMission", {"jumpif":["*.$", "@startMissionExecution"]}, "isAvailableMissionsPage", {"jumpif":["!*.$", "@alertUnknownMissionKind"]}, "getURLMission", {"jumpif":["*.urlMission == null", "@init"]}]},
	{"@tryToAcceptMission": 		["goToAcceptMissionPage", "isThereMessageError", {"jumpif": ["*.$", "@init"]}, "clickOnAcceptMissionButton", "waitForSubmitButton", "clickOnConfirmAcceptMissionButton", "isThereMessageError", {"jumpif":["*.$", "@init"]}]},
	{"@startMissionExecution": 		["getMissionInfo", "logout", "goToNextIp"]},
	{"@hackAccountProcess": 		["hackAccount", "isCrackerStrongEnough", {"jumpif":["!*.$", "@abortProcess"]}, "isThereMessageError", {"jumpif":["*.$", "@signInAccountAndGetBalance"]}, "waitProgressBar"]},
	{"@signInAccountAndGetBalance": ["goToPageAccountLoginPage", "signInAccount", "checkFunds", {"jumpif":["!*.$", "@logoutAccount"]}, "getAccountBalance", {"wait": 1000}, "transferToMe", "sendMoneyToBTCWallet"]},
	{"@logoutAccount": 				["getOutFromAccount", "logout"]},
	{"@tryHostConnection": 			["forceToAccessTarget", "isThereMessageError", {"jumpif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"jumpif":["*.$", "@cleanOwnLogs"]}, "waitProgressBar"]},
	{"@accessTarget": 				["goToLoginPage", "cancelLogProcesses", "signInKnownTarget", "isCrackerStrongEnough", {"jumpif":["!*.$", "@abortProcess"]}]},
	{"@cleanTargetLogs": 			["goToTargetLogs", "cleanMyIpClues", {"jumpif": ["*.isEmpty == true", "@cleanOwnLogs"]}, "waitProgressBar"]},
	{"@cleanOwnLogs": 				["logout", "goToOwnLogTab", "cancelLogProcesses", "cleanTextAreaContent", {"jumpif": ["*.isEmpty == true", "@finishMission"]}, "waitProgressBar"]},
	{"@finishMission": 				[{"jumpif":["*.funds == 0", "@abortProcess"]}, "goToMissionsTab", "informBalance", "waitForSubmitButton", "confirmMissionCompleteButton", "sendMoneyToBTCWallet", {"jumpif": ["true", "@init"]}]},
	{"@abortProcess": 				[{"jumpif":["*.abortMissionAllowed", "@abortMission"]}, "informBadCracker", {"exit": 1}]},
	{"@abortMission": 				["goToMissionsTab", "clickOnAbortMissionButton", "waitForSubmitButton", "clickOnConfirmAbortMissionButton", {"jumpif": ["true", "@init"]}]},
	{"@alertUnknownMissionKind": 	["alertAnotherMissionKindAlreadyAccepted", {"exit": 1}]},
	{"@exit": 						[{"exit": 1}]}
]

