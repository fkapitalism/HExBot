var foo = $jSpaghetti.module("riddleSolver").sequence("completePath")

foo.instructions = [
	{"@basicCheck": 			["isThereRiddle", {"gotoif": ["*.$", "@start", "_exit"]}]},
	{"@start": 					["init"]},
	{"@checkLocalCracker": 		["isThereLocalCracker", {"gotoif": ["!*.$", "@getout"]}, {"gotoif":["!*.crackerToInstall", "@analyseSoftwares"]}, "installLocalCracker"]},
	{"@analyseSoftwares": 		["isThereTargetCracker", {"gotoif": ["!*.$", "@decideInstalling"]}, {"gotoif": ["*.isCrackerOutdated", "@upgrade", "@decideInstalling"]}]},
	{"@upgrade": 				["downloadCracker", "isThereMessageError", {"gotoif":["*.$", "@getout"]}, "checkProgressBar", "cancelLogProcesses", "goToTargetLogs", "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@suitup"]}, "checkProgressBar", {"gotoif": [1, "@suitup"]}]},
	{"@decideInstalling": 		[{"gotoif": ["*.crackerToInstall", "@suitup", "@solvePuzzle"]}]},
	{"@suitup" :   				["getNewCrackerId", {"gotoif": ["!*.$", "@getout"]}, "installLocalCracker", "isThereMessageError", {"gotoif":["*.$", "@solvePuzzle"]}, "checkProgressBar", {"gotoif": ["!*.isCrackerOutdated", "@solvePuzzle"]}, "removeOutdatedCracker", "isThereMessageError", {"gotoif":["*.$", "@solvePuzzle"]}, "checkProgressBar"]},
	{"@solvePuzzle": 			["goToPageRiddle", "isRiddleSolved", {"gotoif": ["*.$", "@goToNextPuzzle"]}, "solvePuzzleAuto", {"gotoif":["!*.$", "@getout"]}, "reload"]},
	{"@goToNextPuzzle": 		["getNextIP", "logout", "goToNextPuzzle", "isTooManySecretsNow", {"gotoif": ["!*.$","@tryHostConnection"]}, "goToNextPuzzle"]},
	{"@tryHostConnection": 		["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@getout"]}, "checkProgressBar"]},
	{"@accessTarget": 			["goToLoginPage", "cancelLogProcesses", "signInKnownTarget", "isCrackerStrongEnough", {"gotoif":["!*.$", "@getout"]}]},
	{"@cleanTargetLogs": 		["goToTargetLogs", "cleanMyIpClues", {"gotoif": ["*.isEmpty", "@repeat"]}, "checkProgressBar"]},
	{"@repeat": 				[{"gotoif": [1, "@start"]}]},
	{"@getout": 				["_exit"]}
]

