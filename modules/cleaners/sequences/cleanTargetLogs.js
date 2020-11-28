var cleanTargetLogs = $jSpaghetti.module("cleaners").sequence("cleanTargetLogs")

cleanTargetLogs.instructions = [
	{"@init": 	["goToTargetLogs", "cleanMyIpClues", {"gotoif": ["(*.isEmpty) || (!*.$)", "@finish"]}, {"gotoif": ["!*.myCluesFound", "@finish"]}, "submitLogs", "waitProgressBar"]},
	{"@finish": "_exit"}
]