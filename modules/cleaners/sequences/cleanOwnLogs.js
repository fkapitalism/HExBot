var cleanOwnLogs = $jSpaghetti.module("cleaners").sequence("cleanOwnLogs")

cleanOwnLogs.instructions = [
	{"@init": 	["goToOwnLogTab", "cleanTextAreaContent", {"jumpif": ["*.isEmpty == true", "@finish"]}, "waitProgressBar"]},
	{"@finish": {"exit": 1}}
]