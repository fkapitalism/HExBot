var foo = $jSpaghetti.module("botkit").sequence("run")

foo.instructions = [
	{"@init": ["there_is_captcha", {"gotoif":["*.$", "@finish"]}, "handle_cf_page"]},
	{"@finish": ["_exit"]}
]
   