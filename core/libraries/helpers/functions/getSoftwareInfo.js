function getSoftwareInfo(name, version, page, parameters, callback){
	/*var softwares = */

	getSoftwaresByPattern(name, page, parameters, true, (softwares) => {
		var software = null
		for (var i = 0; i < softwares.length; i++) {
			if ((softwares[i].version == version) || (version.length == 0)){
				software = new Software(softwares[i].id, softwares[i].name, softwares[i].version, softwares[i].size, softwares[i].installed)
				break;
			}
		}
		//return software
		callback(software)
	})	
}