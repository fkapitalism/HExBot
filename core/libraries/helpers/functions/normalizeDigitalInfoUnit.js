function normalizeDigitalInfoUnit(info){
	var input = /[0-9]+,?[0-9]* ([Gg]|[Mm])[Bb]/.exec(info)
	if (input){
		var value = input[0].split(' ')
		if(value[1].toUpperCase() == "GB")
			return Number(value[0].replace(',', '.')) * 1000
		else
			return Number(value[0].replace(',', '.'))
	} else {
		return null
	}
}