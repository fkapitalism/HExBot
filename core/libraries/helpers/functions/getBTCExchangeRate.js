function getBTCExchangeRate(callback){
	/*var requestResult = */
	sendXMLHttpRequest("bitcoin.php", "POST", "func=btcBuy", false, (requestResult) => {
		var value = null
		try{
			value = JSON.parse(JSON.parse(requestResult).msg)[0].value
		}catch(error){
			console.log(error.message)
		}
		//return value
		callback(value)
	}, true)
}