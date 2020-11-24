function sendMoneyToBTCWallet(account, amount, callback){
	//console.log("func=btcBuy&amount=" + amount + "&acc=" + account)
	sendXMLHttpRequest("bitcoin.php", "POST", "func=btcBuy&amount=" + amount + "&acc=" + account, false, () => {
		callback()
	}, true)
}