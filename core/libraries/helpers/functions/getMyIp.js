/*
	@prototype: getMyIp(escaped);
	@definition: This function gets syncronously the player ip 
	@author: GRSa
	@parameters: 
		*escaped (boolean): If true the function returns the ip with dots escaped like 10\.10\.10\.10
	@return: (String) It returns the player ip
*/
function getMyIp(escaped){
	var serverResponse = sendXMLHttpRequest("ajax.php", "POST", "func=getStatic", false, null, true)
	var myIp = JSON.parse(JSON.parse(serverResponse).msg)[0].ip
	if(!escaped){
		return myIp 
	} else {
		return myIp.replace(/\./g, "\\.")
	}
}


