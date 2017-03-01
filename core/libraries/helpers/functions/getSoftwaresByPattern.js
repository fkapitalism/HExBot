function getSoftwaresByPattern(pattern, page, parameters, avoid_installed_viruses = false){
	var softwarePage = sendXMLHttpRequest(page, "GET", parameters, false)
	var softwareList = []
	var parser = new DOMParser()
	var requestContentDOM = parser.parseFromString(softwarePage, "text/html")
	var softwareTable = requestContentDOM.getElementsByClassName("table table-cozy table-bordered table-striped table-software table-hover with-check")[0]
	if(softwareTable){
		var rows = softwareTable.getElementsByTagName("tr")
		var pattern = new RegExp(pattern)
		for (var i = 0; i < rows.length; i++) {
			var softwareName = rows[i].cells[1].innerText.replace(/[\n\r]/gmi, "")
			if(pattern.test(softwareName)){
				if(rows[i].className == "installed"){
					var installed = true
				} else {
					var installed = false
				}
				var id = rows[i].id
				var name = softwareName
				var version = rows[i].cells[2].innerText.replace(/[\n\r]/gmi, "")
				var size = rows[i].cells[3].innerText.replace(/[\n\r]/gmi, "")
				if(!(avoid_installed_viruses && name.match(/(\.vspam|\.vwarez|\.vminer|\.vddos)/gmi) && installed))
					softwareList.push({id: id, name: name, version: version, installed: installed, size: size})
			} else {
				//console.log(softwareName)
			}
		}
		return softwareList.sort(function(a, b) {
		    return parseFloat(a.version) - parseFloat(b.version);
		}).reverse()
	} else {
		return null;
	}
		
}
