/*This function gets the accounts list vinculated to their respective ip*/
function getBTCWalletInfo(callback){
	
	/*
	//var financesPage =
	sendXMLHttpRequest("/finances", "GET", "", false, (financesPage) => {

		var parser = new DOMParser()
		var requestContentDOM = parser.parseFromString(financesPage, "text/html")
		var accountWidgets = requestContentDOM.getElementsByClassName("widget-box collapsible")
		var btcInfo = {}
		if ((accountWidgets) && (accountWidgets.length > 1)){
			for (var i = 0; i < accountWidgets.length; i++) {
				var bitcoinMarketIp = accountWidgets[i].innerHTML.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/m)[0]
				if(bitcoinMarketIp){
					if(accountWidgets[i].innerHTML.match(/(BTC Wallet|Carteira Bitcoin)/m)){
						publicKey = accountWidgets[i].innerHTML.match(/[13][a-zA-Z0-9]{26,}/m)
						if(publicKey){
							//var financesPage = 
							sendXMLHttpRequest("/internet", "GET", "redirect=btc", false, (bitCoinPage) => {
								//console.log(bitcoinMarketIp, financesPage)
								var logOutButton = bitCoinPage.match(/btc\-logout/)
								if (logOutButton){
									btcInfo.isLogged = true
								} else {
									btcInfo.isLogged = false
								}
								btcInfo.publicKey = publicKey[0]
								btcInfo.ip = bitcoinMarketIp
								callback(btcInfo)
							})

							break
								
						} else {
							callback(btcInfo)
							break
						}
					}				
				}
				
			}
		}
		//return btcInfo

	})	*/

	sendXMLHttpRequest("/internet", "GET", "redirect=btc", false, (bitCoinPage) => {


		var parser = new DOMParser()
		var requestContentDOM = parser.parseFromString(bitCoinPage, "text/html")		
		const bitcoinBadge = requestContentDOM.querySelector("span.label.label-inverse.pull-right");
		const widgets = requestContentDOM.getElementsByClassName("widget-content padding center");
		var btcInfo = {}
		if(bitcoinBadge && widgets.length == 2){
			const wallet = widgets.item(1);
			btcInfo.ip = requestContentDOM.getElementsByName("ip").item(0).defaultValue
			btcInfo.isLogged = Boolean(wallet.innerHTML.match(/btc\-logout/))
			btcInfo.publicKey = wallet.innerHTML.match(/\b([0-9A-Za-z]{30,})\b/)[0]
		}

		callback(btcInfo)
	})

}
	