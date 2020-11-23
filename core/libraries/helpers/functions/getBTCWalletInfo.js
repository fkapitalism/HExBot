/*This function gets the accounts list vinculated to their respective ip*/
function getBTCWalletInfo(){
	var financesPage = sendXMLHttpRequest("/finances", "GET", "", false)
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
						var financesPage = sendXMLHttpRequest("/internet", "GET", "ip=" + bitcoinMarketIp, false)
						//console.log(bitcoinMarketIp, financesPage)
						var logOutButton = financesPage.match(/btc\-logout/)
						if (logOutButton){
							btcInfo.isLogged = true
						} else {
							btcInfo.isLogged = false
						}
						btcInfo.publicKey = publicKey[0]
						btcInfo.ip = bitcoinMarketIp
					}
				}				
			}
			
		}
	}
	return btcInfo
}
	