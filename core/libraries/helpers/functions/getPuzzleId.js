	/*
		@prototype: getPuzzleId();
		@definition: This function checks if the current page is a puzzle page and returns the puzzle constant id;
		@author: GRSa;
		@parameters: none;
		@return: 
			*default: (Integer) Returns a puzzle constant id;
			*error: (null) Returns null if puzzle was not found;
	*/
	function getPuzzleId(){
		var content = null;
		var credits_widget_content = document.getElementsByClassName("widget-content padding center")[4];
		var credits_icon = document.getElementsByClassName("he16-puzzle_credits")[0];
		if ((credits_widget_content) && (credits_icon)){
			content = credits_widget_content.textContent; //Gets the content from credits widget
		} else {
			var puzzle_main_content = document.getElementsByClassName("widget-content padding center")[0];
			var puzzle_main_content_icon = document.getElementsByClassName("he16-puzzle")[0];
			if ((puzzle_main_content) && (puzzle_main_content_icon)){
				content = puzzle_main_content.childNodes[7].textContent; //Gets the content from puzzle question      
			} else {
				//Do nothing and keep content variable with null
			}
		}
		if (content){
			for (puzzle_pos in PUZZLE_DESCRIPTOR){
				if (strposOfArray(content, PUZZLE_DESCRIPTOR[puzzle_pos].names) >= 0){
					return PUZZLE_DESCRIPTOR[puzzle_pos].id;
				}
			}
			return null;
		} else {
			return null;    
		}
	}