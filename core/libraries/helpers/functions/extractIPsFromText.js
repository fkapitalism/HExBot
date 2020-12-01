/*This function will return an array of ips found and ignore those ips in ignore array */
function extractIPsFromText(text, ignore = []){
	
	const ipsFound = text.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/gm)
	if(ipsFound){
		return [...new Set(
			ipsFound.filter((ip) => {
				return !ignore.includes(ip);
			})
		)]
	} else {
		return []
	}
	
}
	