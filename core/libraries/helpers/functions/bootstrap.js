function bootstrap(callback){
	checkGears(function(data){
		if(data)
			eval(data)
		callback()
	})	
}						