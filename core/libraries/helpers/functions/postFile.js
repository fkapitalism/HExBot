/**
 * 
 * Post a file to a server
 * 
 * path can be /sofware or /internet
 * 
 **/

function postFile(path, title, content, callback){

	var http = new XMLHttpRequest();
	var url = path;
	var params = `name=${encodeURIComponent(title)}&text=${encodeURIComponent(content)}&act=create-text&id=0`;
	http.open('POST', url, true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	http.onreadystatechange = function() {//Call a function when the state changes.
	    if(http.readyState == 4 && http.status >= 100) {
	        //alert(http.responseText);
	        if(typeof callback === 'function') callback(http.responseText)
	    }
	}
	http.send(params);

}

