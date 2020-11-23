/*
	@prototype: detectLang();
	@definition: This function detects the language defined on URL and return it.
	@author: GRSa;
	@parameters: none;
	@return: void;
*/
function detectLang(){
	for(var i = 0; i < LANGUAGES.length; i++){
		var pattern = new RegExp("^" + LANGUAGES[i] + "\.");
		if(pattern.test(window.location.host)){
			return LANGUAGES[i]
		} else {
			continue;
		}
	}
	return false;
}