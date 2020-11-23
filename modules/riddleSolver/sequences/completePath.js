var foo = $jSpaghetti.module("riddleSolver").sequence("completePath")

foo.instructions = [
	{"@basicCheck": 			["isThereRiddle", {"gotoif": ["*.$", "@start", "_exit"]}]},
	{"@start": 					["init"]},
	{"@checkLocalCracker": 		["isThereLocalCracker", {"gotoif": ["!*.$", "@getout"]}, {"gotoif":["!*.crackerToInstall", "@analyseSoftwares"]}, "installLocalCracker"]},
	{"@analyseSoftwares": 		["isThereTargetCracker", {"gotoif": ["!*.$", "@decideInstalling"]}, {"gotoif": ["*.isCrackerOutdated", "@upgrade", "@decideInstalling"]}]},
	{"@upgrade": 				["downloadCracker", "isThereMessageError", {"gotoif":["*.$", "@getout"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}, "cancelLogProcesses", "goToTargetLogs", "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@suitup"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}, {"gotoif": [1, "@suitup"]}]},
	{"@decideInstalling": 		[{"gotoif": ["*.crackerToInstall", "@suitup", "@solvePuzzle"]}]},
	{"@suitup" :   				["getNewCrackerId", {"gotoif": ["!*.$", "@getout"]}, "installLocalCracker", "isThereMessageError", {"gotoif":["*.$", "@solvePuzzle"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}, {"gotoif": ["!*.isCrackerOutdated", "@solvePuzzle"]}, "removeOutdatedCracker", "isThereMessageError", {"gotoif":["*.$", "@solvePuzzle"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@solvePuzzle": 			["goToPageRiddle", "isRiddleSolved", {"gotoif": ["*.$", "@goToNextPuzzle"]}, "solvePuzzleAuto", {"gotoif":["!*.$", "@getout"]}, "reload"]},
	{"@goToNextPuzzle": 		["getNextIP", "logout", "goToNextPuzzle"]},
	{"@tryHostConnection": 		["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@getout"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@accessTarget": 			["goToLoginPage", "cancelLogProcesses", "signInKnownTarget", "isCrackerStrongEnough", {"gotoif":["!*.$", "@getout"]}]},
	{"@cleanTargetLogs": 		["goToTargetLogs", "cleanMyIpClues", {"gotoif": ["*.isEmpty", "@repeat"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@repeat": 				[{"gotoif": [1, "@start"]}]},
	{"@getout": 				["_exit"]}
]

