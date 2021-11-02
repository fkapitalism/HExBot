var foo = $jSpaghetti.module("monitor").sequence("checkMission")

foo.instructions = [
	{"@waitForNewMissions": ["checkTime"]},
	{"@getSecondsLeft": 	["queryMissionPage", {"jumpif": [1, "@waitForNewMissions"]}]}
]