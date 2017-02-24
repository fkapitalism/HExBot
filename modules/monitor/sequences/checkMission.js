var foo = $jSpaghetti.module("monitor").sequence("checkMission")

foo.instructions = [
	{"@waitForNewMissions": ["checkTime", {"wait": "_forTheSignal"}]},
	{"@getSecondsLeft": 	["queryMissionPage", {"gotoif": [1, "@waitForNewMissions"]}]}
]