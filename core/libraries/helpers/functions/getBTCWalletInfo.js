/*This function gets the accounts list vinculated to their respective ip*/
function getBTCWalletInfo(callback){
	
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
	