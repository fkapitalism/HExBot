const VERSION_BOT = "0.1.34"
const COMMAND_PANEL_STORAGE_NAME = "HExBot-ControlPanel"
const BOT_STORAGE_NAME = "HExBot-State"

//DOM IDs
const COMMAND_PANEL_DOM_ID = 'gen-modal'
const COMMAND_PANEL_CLOSE_BUTTON_DOM_ID = 'set-hide-menu'
const BOT_BUTTON_DOM_ID = 'bot-button'
const SET_CLEAN_OWN_LOGS_DOM_ID = 'set-cleaner'
const SET_CLEAN_TARGET_LOGS_DOM_ID = 'set-victim-cleaner'
const SET_ACCESS_TARGET_CLEAN_LOGS_DOM_ID = 'set-cleanlogin'
const SOLVE_RIDDLE_DOM_ID = 'set-infosolveriddles'
const REGEX_INPUT_DOM_ID = 'regex-input'
const INFO_ALERT = 'info-alert'
const PERFORM_CHECK_BALANCE_ID = 'set-check-account-status-job'
const PERFORM_TRANSFER_MONEY_ID = 'set-transfer-money-status-job'
const PERFORM_DELETE_SOFTWARE_ID = 'set-delete-software-status-job'
const PERFORM_BANK_CAMPING = "set-camping-bank-logs"
const PERFORM_INSTALL_SOFTWARE = "set-install-software"
const SET_SEARCH_FOR_IPS = "set-ip-search"
const SET_MISSIONS_MONITOR = 'set-missions-monitor'
const SET_LOGS_MONITOR = 'set-logs-monitor'
//const SET_UPLOAD_MODE = 'set-upload-mode'
const SET_SIGNATURE = 'set-signature'
const SET_IGNORE_LIST = 'set-ignore-list'
const SET_TRANSFER_TO_BTC = 'set-to-btc'
const SET_SKIP_AFTER_UPLOAD = 'set-skip-after-upload'
//const SET_HIDE_MODE = 'set-hide-mode'
const SET_POPUP_AFTER_INSTRUCTION = 'set-pop-up'
const PERFORM_UPDATE_CRACKER = 'perform-update-cracker' 
const SET_CONFIG_PANEL = 'set-config-panel'
const CONFIG_TO_MAIN = "config-to-main"
const WEBCRAWLER_SCRIPT = "web-crawl-script"
const WEBCRAWLER_SCRIPT_DEBUG = "web-crawl-script-debug"

const CREDITS_INFO = 'credits-info'
const MAIN_SCREEN_DOM_ID = 'control-panel-main'
const CREDITS_SCREEN_DOM_ID = 'control-panel-credits'
const CONFIG_PANEL = 'chat-panel'
const MESSAGE_CONTAINER = "message-container"

const FIELD_BANK_IP_TARGET = "target-bank-ip"
const FIELD_IPS_START_SEARCHING = "ips-start-seaching"
const FIELD_IP_SEARCH_RESULT = "search-resut"
const FIELD_SUSPECT_LOGS = "suspect-logs"
const FIELD_SIGNATURE = "text-signature"
const FIELD_HOSTS_TO_IGNORE = 'field-hosts-ignore'
const CONFIG_AREA = "config-area"

//const FIELD_SOFTWARES_TO_INSTALL = "set-softwares-to-install"
//const SET_TIME_LIMIT = "set-time-limit"

const STORAGE_GEARS = "STORAGE_GEARS"

const LANG_EN = "en";
const LANG_BR = "br";
const LANGUAGES = [LANG_EN, LANG_BR];

//Missions type
const CHECK_BALANCE = "checkBalance"
const TRANSFER_MONEY = "transferMoney"
const DELETE_SOFTWARE = "deleteSoftware"

/*
	Puzzle constant ids
*/
const PUZZLE_TICTT = 0;
const PUZZLE_MESSYD = 1;
const PUZZLE_VOLCANO = 2;
const PUZZLE_HIDDENN = 3;
const PUZZLE_HOTDOGS = 4;
const PUZZLE_COORD = 5;
const PUZZLE_PROPORT = 6;
const PUZZLE_BINHE = 7;
const PUZZLE_SNEAKERS = 8;
const PUZZLE_SUDOKU = 9;
const PUZZLE_2048 = 10;
const PUZZLE_JOBS = 11;
const PUZZLE_3MUSK = 12;
const PUZZLE_CHOCO = 13;
const PUZZLE_DRIEDPO = 14;
const PUZZLE_CRAZYBANK = 15;
const PUZZLE_MINES = 16;
const PUZZLE_LITTLEL = 17;
const PUZZLE_BIRDSC = 18;
const PUZZLE_SWIMM = 19;
const PUZZLE_WHALE = 20;
const PUZZLE_BIRDW = 21;
const PUZZLE_N100 = 22;
const PUZZLE_CROC = 23;
const PUZZLE_PREMIUM = 24;
const PUZZLE_SHEEPS = 25;
const PUZZLE_2BNOT2B = 26;
const PUZZLE_LIGHTS = 27;

/*
	Puzzle descriptor
*/
const PUZZLE_DESCRIPTOR = [
	{id:PUZZLE_TICTT, names:["Tic Tac Toe","Jogo da Velha"]},
	{id:PUZZLE_MESSYD, names:["Messy Drawer","Gaveta Bagunçada"]},
	{id:PUZZLE_VOLCANO, names:["name of the volcanö","nome do vulcãö"]},
	{id:PUZZLE_HIDDENN, names:["Hidden Numbers","Números Ocultos"]},
	{id:PUZZLE_HOTDOGS, names:["Hot Dogs","Cachorros Quentes"]},
	{id:PUZZLE_COORD, names:["37.2350° N, 115.8111° W"]},
	{id:PUZZLE_PROPORT, names:["Proportions", "Proporções"]},
	{id:PUZZLE_BINHE, names:["072 097 099 107 101 114"]},
	{id:PUZZLE_SNEAKERS, names:["Setec Astronomy"]},
	{id:PUZZLE_SUDOKU, names:["Sudoku"]},
	{id:PUZZLE_2048, names:["2048 was developed by", "2048 foi desenvolvido por"]},
	{id:PUZZLE_JOBS, names:["01010011 01110100 01100001"]},
	{id:PUZZLE_3MUSK, names:["In Alexander Dumas' book", "No livro de Alexander Dumas"]},
	{id:PUZZLE_CHOCO, names:["Fat Boys", "Barras de Chocolate"]},
	{id:PUZZLE_DRIEDPO, names:["Dried Potatoes", "Batatas Malucas"]},
	{id:PUZZLE_CRAZYBANK, names:["Crazy Banker", "Banqueiro maluco"]},
	{id:PUZZLE_MINES, names:["Minesweeper", "Campo minado"]},
	{id:PUZZLE_LITTLEL, names:["Little Liars", "Competidores mentirosos"]},
	{id:PUZZLE_BIRDSC, names:["Birds And Cages", "Canários e Gaiolas"]},
	{id:PUZZLE_SWIMM, names:["Swimmers", "Medalhistas da natação"]},
	{id:PUZZLE_WHALE, names:["The Whale", "A Baleia"]},
	{id:PUZZLE_BIRDW, names:["Birdwatching", "Observando pássaros"]},
	{id:PUZZLE_N100, names:["Number 100", "Número 100"]},
	{id:PUZZLE_CROC, names:["Crocodiles", "Criadores de Jacarés"]},
	{id:PUZZLE_PREMIUM, names:["∀x Player(x)", "∀x Jogador(x)"]},
	{id:PUZZLE_SHEEPS, names:["Sheeps and Chickens", "Ovelhas e Galinhas"]},
	{id:PUZZLE_2BNOT2B, names:["/bb|[^b]{2}/"]},
	{id:PUZZLE_LIGHTS, names:["Lights Out"]}
]