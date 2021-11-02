var foo = $jSpaghetti.module("missions").sequence("transferMoney")

foo.instructions = [
	{"@askForPermission": 			["askPermissionToAbort", "init"]},
	{"@init": 						["checkBTCWallet", {"jumpif":["!*.$", "@exit"]}, "startTransferMoney", {"jumpif":["!*.$", "@exit"]}]},
	{"@tryToGetMission": 			["goToMissionsTab", "checkSameTypeAcceptedMission", {"jumpif":["*.$", "@startMissionExecution"]}, "isAvailableMissionsPage", {"jumpif":["!*.$", "@alertUnknownMissionKind"]}, "getURLMission","boo", {"jumpif":["*.urlMission == null", "@init"]}]},
	{"@tryToAcceptMission": 		["goToAcceptMissionPage", "isThereMessageError", {"jumpif": ["*.$", "@init"]}, "clickOnAcceptMissionButton", "waitForSubmitButton", "clickOnConfirmAcceptMissionButton", "isThereMessageError", {"jumpif":["*.$", "@init"]}]},
	{"@startMissionExecution": 		["getMissionInfo", "logout", "goToNextIp"]},
	{"@hackAccountProcess": 		["hackAccount", "isCrackerStrongEnough", {"jumpif":["!*.$", "@abortProcess"]}, "isThereMessageError", {"jumpif":["*.$", "@signInAccountAndTransfer"]}, "waitProgressBar"]},
	{"@signInAccountAndTransfer": 	["goToPageAccountLoginPage", "signInAccount", "checkFunds", {"jumpif":["!*.$", "@logoutAccount"]}, {"wait": 1000}, "transferRandomValueToTarget", {"jumpif":["*.rest <= 0", "@logoutAccount"]}, {"wait":1000}, "transferTheRestToMe", "sendMoneyToBTCWallet"]},
	{"@logoutAccount": 				["getOutFromAccount", "logout"]},
	{"@tryHostConnection": 			["forceToAccessTarget", "isThereMessageError", {"jumpif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"jumpif":["*.$", "@cleanOwnLogs"]}, "waitProgressBar"]},
	{"@accessTarget": 				["goToLoginPage", "cancelLogProcesses", "signInKnownTarget"]},
	{"@cleanTargetLogs": 			["goToTargetLogs", "cleanMyIpClues", {"jumpif": ["*.isEmpty == true", "@cleanOwnLogs"]}, "waitProgressBar"]},
	{"@cleanOtherTargetLogs": 		[{"jumpif": ["((*.cleanerCount == 2) || (*.ips[0] == *.ips[1]))", "@cleanOwnLogs"]}, "logout", "goToNextIp", {"jumpif": ["true", "@tryHostConnection"]}]},
	{"@cleanOwnLogs": 				["logout", "goToOwnLogTab", "cancelLogProcesses", "cleanTextAreaContent", {"jumpif": ["*.isEmpty == true", "@finishMission"]}, "waitProgressBar"]},
	{"@finishMission": 				[{"jumpif":["*.funds == 0", "@abortProcess"]}, "goToMissionsTab", "clickOnFinishButton", "waitForSubmitButton", "confirmMissionCompleteButton", "sendMoneyToBTCWallet", {"jumpif": ["true", "@init"]}]},
	{"@abortProcess": 				[{"jumpif":["*.abortMissionAllowed", "@abortMission"]}, "informBadCracker", {"exit": 1}]},
	{"@abortMission": 				["goToMissionsTab", "clickOnAbortMissionButton", "waitForSubmitButton", "clickOnConfirmAbortMissionButton", {"jumpif": ["true", "@init"]}]},
	{"@alertUnknownMissionKind": 	["alertAnotherMissionKindAlreadyAccepted", {"exit": 1}]},
	{"@exit": 						[{"exit": 1}]}
]