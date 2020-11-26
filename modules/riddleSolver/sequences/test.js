var foo = $jSpaghetti.module("riddleSolver").sequence("test")

foo.instructions = [
	{"@goToNextPuzzle": 		["getNextIPFake", "goToNextPuzzle", "isTooManySecretsNow", {"gotoif": ["!*.$","@tryHostConnection"]}, "goToNextPuzzle"]},
	{"@tryHostConnection": 		["forceToAccessTarget"]},
	{"@getout": 				"_exit"}
]