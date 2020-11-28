var accessTarget = $jSpaghetti.module("cleaners").sequence("accessTargetAndCleanLogs")

accessTarget.instructions = [
	{"@tryToInvadeTarget": 	["hackTargetBruteForce", "isThereMessageError", {"gotoif": ["*.$", "@checkMessage"]}, "isThereProgressBar", {"gotoif": ["!*.$", "@accessTargetLogs"]}, "waitProgressBar", {"gotoif": [1, "@accessTarget"]}]},
	{"@checkMessage": 		["isAccessForbidden", {"gotoif": ["*.$", "@finish"]}]},
	{"@accessTarget": 		["goToLoginPage", "signInTarget", {"gotoif": [1, "@cleanLogs"]}]},
	{"@accessTargetLogs": 	"goToTargetLogs"},
	{"@cleanLogs": 			["cleanMyIpClues", {"gotoif": ["(*.isEmpty) || (!*.$)", "@finish"]}, {"gotoif": ["!*.myCluesFound", "@finish"]}, "submitLogs", "waitProgressBar"]},
	{"@finish": 			"_exit"}
]

