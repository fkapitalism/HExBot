/*This function gets the accounts list vinculated to their respective ip*/
function getBankAccountAddr(callback){
	/*var financesPage = */
	sendXMLHttpRequest("/finances", "GET", "", false, (financesPage) => {
		var parser = new DOMParser()
		var requestContentDOM = parser.parseFromString(financesPage, "text/html")
		var accountWidgets = requestContentDOM.getElementsByClassName("widget-box collapsible")
		var infoList = {}
		if ((accountWidgets) && (accountWidgets.length > 0)){
			for (var i = 0; i < accountWidgets.length; i++) {
				var bankip = accountWidgets[i].innerHTML.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/m)
				if(bankip){
					var account = accountWidgets[i].innerHTML.match(/#[0-9]{5,}/m)
					if(account){
						account = account[0].replace("#", "")
						infoList[bankip[0]] = account
					}				
				}
				
			}
		}
		//return infoList
		callback(infoList)
	})
	
}
	