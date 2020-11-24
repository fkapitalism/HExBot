/*
	@prototype: getSoftwareId(name, version);
	@definition: This function gets the software id especified my name and version. It only works on software pages
	@author: GRSa
	@parameters: 
		*name (String): Software number (e.g. Decent Warez.vwarez)
		*version (String): Software version (e.g. 13.9)
	@return: (Integer) It returns the id of the software or null if not found
*/
function getSoftwareId(name, version, page, parameters, callback){
	/*var softwarePage = */
	sendXMLHttpRequest(page, "GET", parameters, false, (softwarePage) => {
		var parser = new DOMParser()
		var result = null
		var requestContentDOM = parser.parseFromString(softwarePage, "text/html")
		var softwareTable = requestContentDOM.getElementsByClassName("table table-cozy table-bordered table-striped table-software table-hover with-check")[0]
		var rows = softwareTable.getElementsByTagName("tr")
		var pattern = new RegExp(name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + ".*" + version.replace(".", "\\."), "gmi")
		for (var i = 0; i < rows.length; i++) {
			if (pattern.test(rows[i].innerHTML.split(/[\n\r]/).join("")))
				result = rows[i].id
				//return rows[i].id

		}
		callback(result)
		//return null
	})
		
}