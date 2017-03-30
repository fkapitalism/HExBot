var foo = $jSpaghetti.module("botkit")
foo.config.debugMode = true

foo.procedure("there_is_captcha", function(){
	var frames = document.getElementsByTagName("iframe")
	for (var i = 0; i < frames.length; i++) {
		if (frames[i].title == "recaptcha widget")
			return true
	}
	return false
})

foo.procedure("handle_cf_page", function(){
	if(document.getElementById("cf-error-details")){
		setTimeout(function() {
			location.reload();
		}, 3000);
	}
})  
