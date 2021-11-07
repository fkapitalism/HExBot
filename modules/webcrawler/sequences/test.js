var foo = $jSpaghetti.module("webcrawler").sequence("test")

foo.instructions = [
	{"@init":["getUserCommandsResult","createFiles"]}
]