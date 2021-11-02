var foo = $jSpaghetti.module("camping").sequence("bankCamping")

foo.instructions = [
	{"@init": 						["startBankCamping", {"jumpif":["!*.$", "@finishProcess"]}, "logout"]},
	{"@goToAccountHackIfAvaiable": 	{"jumpif": ["*.accounts.length > 0", "@startAccountAtack"]}},
	{"@checkIpTarget": 				["goToIp", "isThereMessageError", {"jumpif":["*.$", "@finishProcess"]}]},
	{"@tryToInvadeTarget": 			[{"jumpif": ["*.isLogged", "@checkForCaughtAccounts"]}, "forceToAccessTarget", "isThereMessageError", {"jumpif":["*.$", "@accessKnownTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"jumpif":["*.$", "@finishProcess"]}, "waitProgressBar"]},
	{"@accessKnownTarget": 			["goToLoginPage", "cancelLogProcesses", "signInTarget", "isThereMessageError", {"jumpif":["*.$", "@finishProcess"]}]},
	{"@cleanMyCluesAndAnalizeLogs": ["goToTargetLogs", "cleanMyIpClues", "extractDataFromLog", "submitLogs", "isThereMessageError", {"jumpif":["*.$", "@checkForCaughtAccounts"]}, "waitProgressBar"]},
	{"@checkForCaughtAccounts": 	{"jumpif": ["*.accounts.length > 0", "@startAccountAtack"]}},
	{"@listen": 					["goToTargetLogs", "cleanMyIpClues", "extractDataFromLog", {"jumpif":["((*.accounts.length > 0) || (*.myCluesFound))", "@submitLogChanges"]}, {"wait":3000}, {"jumpif":["true", "@listen"]}]},
	{"@submitLogChanges": 			["submitLogs", "isThereMessageError", {"jumpif":["*.$", "@checkForCaughtAccounts"]}, "waitProgressBar"]},
	{"@startAccountAtack": 			[{"jumpif": ["*.accounts.length == 0", "@cleanMyOwnLogs"]}, "logout", "goToIp", "hackAccount", "isThereMessageError", {"jumpif":["*.$", "@accessKnownAccount"]}, "waitProgressBar", "accessUnknownAccount", {"jumpif": ["true", "@transferMoney"]}]},
	{"@accessKnownAccount": 		"accessKnownAccount"},
	{"@transferMoney": 				["isThereMessageError", {"jumpif":["*.$", "@startAccountAtack"]}, "checkFunds", {"jumpif": ["!*.$", "@cleanTransferLogs"]}, {"wait": 2000}, "transferMoneyToTarget", "sendMoneyToBTCWallet"]},
	{"@cleanTransferLogs": 			["logoutAccount", "goToIp", "isThereMessageError", {"jumpif":["*.$", "@cleanMyOwnLogs"]}, "forceToAccessTarget", "cancelLogProcesses", "signInTarget", "cleanMyIpClues", "extractDataFromLog", "submitLogs", "isThereMessageError", {"jumpif":["*.$", "@cleanMyOwnLogs"]}, "waitProgressBar"]},
	{"@cleanMyOwnLogs": 			[{"jumpif": ["*.accounts.length > 0", "@startAccountAtack"]}, "goToOwnLogTab", "cancelLogProcesses", "cleanTextAreaContent", "isThereMessageError", {"jumpif":["*.$", "@tryToInvadeTarget"]}, "waitProgressBar", {"jumpif": ["true", "@tryToInvadeTarget"]}]},
	{"@finishProcess": 				"_exit"}
]