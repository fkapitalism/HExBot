var foo = $jSpaghetti.module("botkit").sequence("run")

foo.instructions = [
	{"@init": ["handle_cf_page","handle_5xx_page"]},
	{"@finish": [{"exit": 1}]}
]
   