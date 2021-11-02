var accessTarget = $jSpaghetti.module("cleaners").sequence("accessTargetAndCleanLogs")

accessTarget.instructions = [
	//{"@tryToInvadeTarget": 	["hackTargetBruteForce", "isThereMessageError", {"jumpif": ["*.$", "@checkMessage"]}, "isThereProgressBar", {"jumpif": ["!*.$", "@accessTargetLogs"]}, "waitProgressBar", {"jumpif": [1, "@accessTarget"]}]},
	{"@tryToInvadeTarget": 	["hackTargetBruteForce", "waitProgressBar", {"jumpif": ["*.isThereMessageError","@checkMessage"]}, {"jumpif": [1, "@accessTarget"]}]},
	{"@checkMessage": 		["isAccessForbidden", {"jumpif": ["*.$", "@finish"]}]},
	{"@accessTarget": 		["goToLoginPage", "signInTarget", {"jumpif": [1, "@cleanLogs"]}]},
	{"@accessTargetLogs": 	"goToTargetLogs"},
	{"@cleanLogs": 			["cleanMyIpClues", {"jumpif": ["(*.isEmpty) || (!*.$)", "@finish"]}, {"jumpif": ["!*.myCluesFound", "@finish"]}, "submitLogs", "waitProgressBar"]},
	{"@finish": 			[{"exit": 1}]}
]

