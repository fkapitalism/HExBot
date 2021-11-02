var foo = $jSpaghetti.module("botkit").sequence("run")

foo.instructions = [
	{"@init": ["handle_cf_page"]},
	{"@finish": [{"exit": 1}]}
]
   