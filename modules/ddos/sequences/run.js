var foo = $jSpaghetti.module("ddos").sequence("run")

foo.instructions = [
    {"@init":       "getInfos"},
    
    {"@startChain": ["checkTimes", {"jumpif":["!*.$", "@finish"]}]},
    {"@sendDdos":   ["goToIp", "isThereMessageError", {"jumpif": ["*.$", "@finish"]}, "goToDDoSPage", "launchDDoS", "isThereMessageError", {"jumpif": ["*.$", "@finish"]}]},
    {"@waitDdos":   ["goToDDoSPage", "isThereMessageError", {"jumpif":["!*.$", "@finish"]}, "waitProgressBar"]},
    {"@cleanLogs":  ["goToOwnLogTab", "cleanTextAreaContent", {"jumpif": ["*.isEmpty == true", "@finish"]}, "waitProgressBar"]},
    {"@finishDdos": ["goToSoftwarePage", "deleteRelatory", "decreaseTimes", "checkTimes", {"jumpif": ["*.$", "@startChain"]}]},
    
    {"@finish":     {"exit": 1}}
]
