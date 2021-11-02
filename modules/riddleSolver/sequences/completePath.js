var foo = $jSpaghetti.module("riddleSolver").sequence("completePath")

foo.instructions = [
	{"@basicCheck": 			["isThereRiddle", {"jumpif": ["*.$", "@start", "@getout"]}]},
	{"@start": 					["init"]},
	{"@checkLocalCracker": 		["isThereLocalCracker", {"jumpif": ["!*.$", "@getout"]}, {"jumpif":["!*.crackerToInstall", "@analyseSoftwares"]}, "installLocalCracker"]},
	{"@analyseSoftwares": 		["isThereTargetCracker", {"jumpif": ["!*.$", "@decideInstalling"]}, {"jumpif": ["*.isCrackerOutdated", "@upgrade", "@decideInstalling"]}]},
	{"@upgrade": 				["downloadCracker", "isThereMessageError", {"jumpif":["*.$", "@getout"]}, "waitProgressBar", "cancelLogProcesses", "goToTargetLogs", "cleanMyIpClues", "isThereMessageError", {"jumpif":["*.$", "@suitup"]}, "waitProgressBar", {"jumpif": [1, "@suitup"]}]},
	{"@decideInstalling": 		[{"jumpif": ["*.crackerToInstall", "@suitup", "@solvePuzzle"]}]},
	{"@suitup" :   				["getNewCrackerId", {"jumpif": ["!*.$", "@getout"]}, "installLocalCracker", "isThereMessageError", {"jumpif":["*.$", "@solvePuzzle"]}, "waitProgressBar", {"jumpif": ["!*.isCrackerOutdated", "@solvePuzzle"]}, "removeOutdatedCracker", "isThereMessageError", {"jumpif":["*.$", "@solvePuzzle"]}, "waitProgressBar"]},
	{"@solvePuzzle": 			["goToPageRiddle", "isRiddleSolved", {"jumpif": ["*.$", "@goToNextPuzzle"]}, "solvePuzzleAuto", {"jumpif":["!*.$", "@getout"]}, "reload"]},
	{"@goToNextPuzzle": 		["getNextIP", "logout", "goToNextPuzzle", "isTooManySecretsNow", {"jumpif": ["!*.$","@tryHostConnection"]}, "goToNextPuzzle"]},
	{"@tryHostConnection": 		["forceToAccessTarget", "isThereMessageError", {"jumpif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"jumpif":["*.$", "@getout"]}, "waitProgressBar"]},
	{"@accessTarget": 			["goToLoginPage", "cancelLogProcesses", "signInKnownTarget", "isCrackerStrongEnough", {"jumpif":["!*.$", "@getout"]}]},
	{"@cleanTargetLogs": 		["goToTargetLogs", "cleanMyIpClues", {"jumpif": ["*.isEmpty", "@repeat"]}, "waitProgressBar"]},
	{"@repeat": 				[{"jumpif": [1, "@start"]}]},
	{"@getout": 				[{"exit": 1}]}
]

