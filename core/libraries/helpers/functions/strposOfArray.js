/*
	@prototype: strposOfArray(text, array);
	@definition: This function check if there are any matches in the text to array values;
	@author: GRSa;
	@parameters:
		*text (String): The string to search in;
		*array (Array): The values to search fo;
	@return: 
		*default: (Integer) Returns the position of where the occurence exists relative to the beginning (0) of the text string. Returns -1 if occurence was not found;
		*error: (null) Returns null if there is parameter problem;
*/
function strposOfArray(text, array){
	if ((typeof text === "string") && (Object.prototype.toString.call(array) === "[object Array]")){
		for(var count=0; count < array.length; count++){
			var posMatch = text.indexOf(array[count]);
			if (posMatch >= 0){
				return Number(posMatch);
			}
		}
		return -1;
	}
	return null;
}

/*== adjacent function ==*/
function get_chars(){
	set = ''
	for (var i = 32; i < 255; i++)
		set += String.fromCharCode(i)
	return set
}