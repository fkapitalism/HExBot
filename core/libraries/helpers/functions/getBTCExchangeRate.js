function getBTCExchangeRate(){
	var requestResult = sendXMLHttpRequest("bitcoin.php", "POST", "func=btcBuy", false, null, true)
	var value = null
	try{
		value = JSON.parse(JSON.parse(requestResult).msg)[0].value
	}catch(error){
		console.log(error.message)
	}
	return value
}