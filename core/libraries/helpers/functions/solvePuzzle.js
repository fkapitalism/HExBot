/*
	@prototype: solvePuzzle(puzzle_id);
	@definition: This function solves the indicated puzzle;
	@author: GRSa;
	@parameters: puzzle_id (Integer): The puzzle constant id;
	@return: 
		*default: (Boolean) Return true if puzzle is solved. If the puzzle is solved by function, usually the page reloads before the function returning something, though.
		*error: (Boolean) Return false if puzzle was not found;
*/
function solvePuzzle(puzzle_id){
	if (!getNextPuzzleIP()){
		var text_answer = null;
		var fake_message = null;
		switch(puzzle_id){ 
			case PUZZLE_TICTT: //Tic-Tac-Toe
				fake_message = "func=tictactoe&status=1";
				break;
			case PUZZLE_MESSYD: //Messy Drawer
				text_answer = "3";
				break;
			case PUZZLE_VOLCANO: //Volcano
				text_answer = "Eyjafjallajökull";
				break;
			case PUZZLE_HIDDENN: //Hidden Numbers
				text_answer = "12, 4";
				break;
			case PUZZLE_HOTDOGS: //Hot Dogs
				text_answer = "24";
				break;
			case PUZZLE_COORD: //Coordinates 
				text_answer = "Area 51";
				break;
			case PUZZLE_PROPORT: //Proportion 
				text_answer = "4";
				break;
			case PUZZLE_BINHE: //Binary HE's Name 
				text_answer = "Hacker Wars";
				break;
			case PUZZLE_SNEAKERS: //Sneakers Puzzle
				text_answer = "too many secrets";
				break;
			case PUZZLE_SUDOKU: //Sudoku
				fake_message = "func=sudoku";
				break;
			case PUZZLE_2048: //2048
				fake_message = "func=2048&type=5";
				//After this access Too Many Secrets to get a cracker
				break;
			case PUZZLE_JOBS: //Jobs phrase
				text_answer = "Stay Hungry, Stay Foolish";
				break;
			case PUZZLE_3MUSK: //The Three Musketeers
				text_answer = "Aramis";
				break;
			case PUZZLE_CHOCO: //Fat Boys
				text_answer = "62.5";
				break;
			case PUZZLE_DRIEDPO: //Dried Potatoes
				text_answer = "50";
				break;
			case PUZZLE_CRAZYBANK: //Crazy Banker
				text_answer = "5, 1, 94";
				break;
			case PUZZLE_MINES: //Minesweeper
				fake_message = "func=minesweeper";
				break;
			case PUZZLE_LITTLEL: //Little Liars
				text_answer = "Phoebe, Milena, Naomy";
				break;
			case PUZZLE_BIRDSC: //Birds And Cages
				text_answer = "4, 3";
				break;
			case PUZZLE_SWIMM: //Swimmers
				text_answer = "A, D, C";
				break;
			case PUZZLE_WHALE: //Whale
				text_answer = "3, 3, 9";
				break;
			case PUZZLE_BIRDW: //Birdwatching
				text_answer = "5, 2";
				break;
			case PUZZLE_N100: //Number 100
				text_answer = "99+99/99";
				break;
			case PUZZLE_CROC: //Crocodiles
				text_answer = "49, 35";
				break;
			case PUZZLE_PREMIUM: //Premium
				var lang = detectLang()
				switch(lang){
					case LANG_EN:
						text_answer = "Every player that buys premium is awesome";
						break;
					case LANG_BR:
						text_answer = "Todo jogador que compra premium é lindo";
						break;
					default: text_answer = "Every player that buys premium is awesome";
				}
				break;
			case PUZZLE_SHEEPS: //Sheeps
				text_answer = "9, 18";
				break;
			case PUZZLE_2BNOT2B: ///bb|[^b]{2}/
				text_answer = "To be or not to be";
				break;
			case PUZZLE_LIGHTS: //Lights Out
				fake_message = "func=lightsout";
				break;
			case PUZZLE_RENATOSDOG: //Renato's dog name
				text_answer = "Phoebe";
				break;
			case PUZZLE_BROWN: //Puzzle brown
				text_answer = "Penny";
				break;
			case PUZZLE_OLDHOTEL: //Old hotel
				text_answer = "Nishiyama Onsen Keiunkan";
				break;
			case PUZZLE_SOMEONESNAME: //Someone's name
				text_answer = "Hack The Planet";
				break;
			case PUZZLE_COMMONHASH: //Common hash
				text_answer = "password123";
				break;
			case PUZZLE_THISGAME: //Card games
				text_answer = "47";
				break;
			case PUZZLE_BEEPBEEP: //Card games
				text_answer = "SHOW NO REMORSE";
				break;
			case PUZZLE_PLUSTIMES: //Card games
				text_answer = "1, 2, 3";
				break;
			case PUZZLE_MOSTPOPYTVID: //Most popular Youtube video
				text_answer = "Despacito";
				break;
			case PUZZLE_GEMWORD: //Gem word
				var lang = detectLang()
				switch(lang){
					case LANG_EN:
						text_answer = "diamond, ruby, sapphire";
						break;
					case LANG_BR:
						text_answer = "diamante, rubi, safira";
						break;
					default: text_answer = "diamond, ruby, sapphire";
				}
				break;
			case PUZZLE_HACKERMAN: //Hackerman movie origin
				text_answer = "Kung Fury";
				break;
			default: 
				return false;
		}
		
		if (text_answer){
			document.getElementsByName("qa-answer")[0].value = text_answer;
			document.getElementsByClassName("btn btn-success")[0].click();
		} else if (fake_message){
			//sendXMLHttpRequest("riddle.php", "POST", fake_message, true, function(data){
			sendXMLHttpRequest("gotcha.php", "POST", fake_message, true, function(data){
				var result = JSON.parse(data)
				if (result.status == "OK"){
					location.reload()
				} else {
					console.log(result)
				}
			}, true)
		}
		
	} else {

	}
	
	return true;
}