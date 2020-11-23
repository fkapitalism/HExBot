function sendMoneyToBTCWallet(account, amount){
	//console.log("func=btcBuy&amount=" + amount + "&acc=" + account)
	sendXMLHttpRequest("bitcoin.php", "POST", "func=btcBuy&amount=" + amount + "&acc=" + account, false, null, true)
}