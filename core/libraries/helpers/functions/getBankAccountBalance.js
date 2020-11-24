/*This function gets the accounts list vinculated to their respective ip*/
function getBankAccountsBalance(callback){
	/*var requestResult = */
	sendXMLHttpRequest("ajax.php", "POST", "func=getBankAccs", false, (requestResult) => {

		var response = null
		var fragments = []
		var bankAccountBalanceList = []
		try{
			response = JSON.parse(requestResult).msg
			fragments = response.match(/#[0-9]+ \(\$[0-9,]+\)/gm)
			if(fragments){
				for (var i = 0; i < fragments.length; i++) {
					var account = fragments[i].match(/#[0-9]+/gm)[0].replace("#", "")
					var value = fragments[i].match(/\(\$[0-9,]+\)/)[0].replace(/[\(\)\$,]/gm, "")
					bankAccountBalanceList[account] = value
				}
			}
		}catch(error){
			console.log(error.message)
		}
		//return bankAccountBalanceList
		callback(bankAccountBalanceList)

	}, true)	
}
	