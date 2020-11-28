var foo = $jSpaghetti.module("monitor").sequence("checkMission")

foo.instructions = [
	{"@waitForNewMissions": ["checkTime"]},
	{"@getSecondsLeft": 	["queryMissionPage", {"gotoif": [1, "@waitForNewMissions"]}]}
]