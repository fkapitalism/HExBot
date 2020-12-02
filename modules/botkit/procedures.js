const botkit = $jSpaghetti.module("botkit")
botkit.config.debugMode = true

botkit.procedure("handle_cf_page", function(){
	if (!(document.getElementById("recaptcha_widget")) && (document.getElementById("cf-error-details"))){
		setTimeout(function() {
			location.reload();
		}, 3000);
	}
	return null
})  
