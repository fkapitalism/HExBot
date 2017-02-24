/*This function gets the accounts list vinculated to their respective ip*/
function getBankAccountAddr(){
	var financesPage = sendXMLHttpRequest("/finances", "GET", "", false)
	var parser = new DOMParser()
	var requestContentDOM = parser.parseFromString(financesPage, "text/html")
	var accountWidgets = requestContentDOM.getElementsByClassName("widget-box collapsible")
	var infoList = {}
	if ((accountWidgets) && (accountWidgets.length > 1)){
		for (var i = 0; i < accountWidgets.length; i++) {
			var bankip = accountWidgets[i].innerHTML.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/m)[0]
			if(bankip){
				var account = accountWidgets[i].innerHTML.match(/#[0-9]{5,}/m)
				if(account){
					account = account[0].replace("#", "")
					infoList[bankip] = account
				}				
			}
			
		}
	}
	return infoList
}
	