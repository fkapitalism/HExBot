var foo = $jSpaghetti.module("botkit")
foo.config.debugMode = true

foo.procedure("handle_cf_page", function(){
	if(document.getElementById("cf-error-details")){
		setTimeout(function() {
			location.reload();
		}, 3000);
	}
})
