var email = $jSpaghetti.module("monitor").sequence("checkEmail")

email.instructions = [
	{"@startMonitor": ["readEmail"]}
]