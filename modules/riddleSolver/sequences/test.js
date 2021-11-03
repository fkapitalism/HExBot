var foo = $jSpaghetti.module("riddleSolver").sequence("test")

foo.instructions = [
	{"@init": 		["checkPuzzle"]},
	{"@getout": 	{"exit": 1}}
]