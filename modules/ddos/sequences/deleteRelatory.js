var foo = $jSpaghetti.module("ddos").sequence("deleteRelatory")

foo.instructions = [
    {"@init": ["goToSoftwarePage", "deleteRelatory"]},
    {"@finish": "_exit"}
]