var foo = $jSpaghetti.module("riddleSolver").sequence("test")

foo.instructions = [
	{"@init": 		["cleanLogs"]},
	{"@getout": 	{"exit": 1}}
]