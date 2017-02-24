function roundNumber(number){
	if(number){
		number = String(number)
		var num = number.match(/^[0-9]+/gm)
		var decimal = number.match(/\.[0-9]/gm)
		if(num !== null){
			if(decimal !== null){
				return num[0] + decimal[0]
			} else {
				return num[0]
			}
		} else {
			return false
		}
	} else {
		return false
	}
}