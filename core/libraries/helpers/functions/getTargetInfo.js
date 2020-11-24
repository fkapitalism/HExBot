function getTargetInfo(callback){
	/*var softwarePage = */
	sendXMLHttpRequest("/internet", "GET", "view=software", false, (softwarePage) => {
		var parser = new DOMParser()
		var requestContentDOM = parser.parseFromString(softwarePage, "text/html")
		var softwarebar = requestContentDOM.getElementById("softwarebar")
		obj = {internetMbit: null, freehd: null, ok: false}
		if(softwarebar){
			obj.internetMbit = /[0-9]+ Mbit/.exec(softwarebar.innerHTML)[0]
			if (obj.internetMbit) obj.internetMbit = Number(obj.internetMbit.split(' ')[0])
			if ((softwarebar.getElementsByClassName("hd-usage")) && 
				(softwarebar.getElementsByClassName("hd-usage")[0].getElementsByClassName("small"))){
				var hddetails = softwarebar.getElementsByClassName("hd-usage")[0].getElementsByClassName("small")[0]
				//var regex = /[0-9]+,?[0-9]* (GB|MB)/g
				var regex = /[+-]?\d+([\.,]\d+)? (GB|MB)/g
				var match = regex.exec(hddetails.innerHTML)
				var matches = []
				while(match != null){
					matches.push(match[0])
					match = regex.exec(hddetails.innerHTML)
				}
				obj.freehd = normalizeDigitalInfoUnit(matches[1]) - normalizeDigitalInfoUnit(matches[0])
				//obj.match0 = matches[0]
				//obj.match1 = matches[1]
				obj.ok = true
			}
		}
		//return obj
		callback(obj)
	})
}
