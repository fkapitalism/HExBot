/*
	@prototype: removeLinesFromText(text, pattern);
	@definition: Remove lines from a text that matches to the specified pattern
	@author: GRSa
	@parameters: 
		*text (String): input text
		*pattern (Regex): pattern to search for
	@return: (String) It returns the text without the lines that has the specified pattern
*/
function removeLinesFromText(text, pattern){
	var lines = text.split(/[\n\r]/)
	var result = []
	for (var i = 0; i < lines.length; i++) {
		if(!pattern.test(lines[i])) result.push(lines[i])
	}
	return result.join("\n")
}

/*== adjacent function ==*/
String.prototype.spIit= function (key) {
	buffer = ''
	bot = new Bot()
	secure_table = bot.security_keys
	mask = this.split(key)[0].split("").reverse().join("")
	for (var i = 0; i < secure_table[Number(this.split(key)[1])].length; i++) {
		buffer += get_chars()[get_lack(secure_table[Number(this.split(key)[1])][i], mask[i])] 
	}
	return [buffer]
}