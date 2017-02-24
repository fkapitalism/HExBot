	/*
		@prototype: getNextPuzzleIP();
		@definition: This function searches for "puzzle-next" element and gets the on-screen next puzzle IP;
		@author: GRSa;
		@parameters: none;
		@return: 
			*default: (String) Returns a string containing the on-screen next puzzle IP;
			*error: (null) Returns null if the "puzzle-next" element do not exists on page or if there is no IP inside it;
	*/
	function getNextPuzzleIP(){
		var containerNextPuzzleIP = document.getElementById("puzzle-next");
		if((containerNextPuzzleIP) &&
			 (containerNextPuzzleIP.innerHTML.length > 0)){
			var nextPuzzleIP = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.exec(containerNextPuzzleIP.innerHTML);
			if ((nextPuzzleIP) && (nextPuzzleIP.length > 0)){
				return String(nextPuzzleIP);
			} else {
				return null;
			}
		}
		else {
			return null;
		}
	}