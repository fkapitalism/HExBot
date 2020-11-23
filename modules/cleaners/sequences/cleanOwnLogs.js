var cleanOwnLogs = $jSpaghetti.module("cleaners").sequence("cleanOwnLogs")

cleanOwnLogs.instructions = [
	{"@init": 	["goToOwnLogTab", "cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@finish"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@finish": "_exit"}
]