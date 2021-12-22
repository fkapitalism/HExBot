const botkit = $jSpaghetti.module("botkit")
botkit.config.debugMode = true

botkit.procedure("handle_cf_page", function(){
	if (!(document.getElementById("recaptcha_widget")) && (document.getElementById("cf-error-details"))){
		playSound('bad_page_reloaded.mp3')
		setTimeout(function() {
			location.reload();
		}, 3000);
	}
	return null
})  

botkit.procedure("handle_5xx_page", function() {
	const h1s = document.getElementsByTagName('h1')
	if(h1s.length == 0) return null
	const firstH1 = h1s[0]
	if (firstH1.innerHTML.includes('503 Service Temporarily Unavailable')){
		playSound('bad_page_reloaded.mp3')
		setTimeout(function() {
			location.reload();
		}, 3000);
	}
	return null
})