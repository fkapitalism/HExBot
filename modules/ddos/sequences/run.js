var foo = $jSpaghetti.module("ddos").sequence("run")

foo.instructions = [
    {"@init":       "getInfos"},
    
    {"@startChain": ["checkTimes", {"gotoif":["!*.$", "@finish"]}]},
    {"@sendDdos":   ["goToIp", "isThereMessageError", {"gotoif": ["*.$", "@finish"]}, "goToDDoSPage", "launchDDoS", "isThereMessageError", {"gotoif": ["*.$", "@finish"]}]},
    {"@waitDdos":   ["goToDDoSPage", "isThereMessageError", {"gotoif":["!*.$", "@finish"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
    {"@cleanLogs":  ["goToOwnLogTab", "cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@finish"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
    {"@finishDdos": ["goToSoftwarePage", "deleteRelatory", "decreaseTimes", "checkTimes", {"gotoif": ["*.$", "@startChain"]}]},
    
    {"@finish":     "_exit"}
]
