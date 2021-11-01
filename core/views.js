var views = {
	appendControlPanel: function(controller){		
		var divMain = document.createElement("div")
		divMain.id = COMMAND_PANEL_DOM_ID
		divMain.className = "modal hide in"
		divMain.tabindex = 7
		divMain['aria-hidden'] = false
		divMain.style.display = "none"
		//divMain.style.fontSize = "70%"

		var bankInfo = []
		//var bankInfo = getBankAccountAddr()

		getBankAccountAddr((info) => {
			var options = ""
			for(ip in info){
				options += '<option value="' + ip + '">' + ip + '</option>'
			}

			const select = document.getElementById(FIELD_BANK_IP_TARGET)

			select.addEventListener("change", (e) => {
				controller.bot.controlPanel.fieldsContent[FIELD_BANK_IP_TARGET] = e.target.value
				controller.storage.set(controller.bot)
			})

			select.innerHTML = options

			const option_tags = select.getElementsByTagName("option")
			if(option_tags.length > 0){
				controller.bot.controlPanel.fieldsContent[FIELD_BANK_IP_TARGET] = option_tags[0].value
				controller.storage.set(controller.bot)
			}
		})

		var selectIpList =  `
			<select id="${FIELD_BANK_IP_TARGET}" style="margin:0;">
			</select>
		`;
		divMain.innerHTML =
			'<div class="widget-title">' +
				'<h5>' + LANG.CONTROL_PANEL_TITLE + '</h5>' +
				'<span id="' + COMMAND_PANEL_CLOSE_BUTTON_DOM_ID + '" class="btn btn-danger" style="float: right"><i class="fa fa-times-circle" aria-hidden="true"></i></span>' +
				'<span id="' + INFO_ALERT + '" class="btn btn-warning" style="float: right"><i class="fa fa-exclamation-circle" aria-hidden="true"></i></span>' +
				'<span id="' + CREDITS_INFO + '" class="btn btn-info" style="float: right"><i class="fa fa-users" aria-hidden="true"></i></span>' +
				'<span id="' + SET_CONFIG_PANEL + '" class="btn btn-secondary" style="float: right"><i class="fa fa-cog" aria-hidden="true"></i></span>' +
			'</div>' +
			'<div id="' + MAIN_SCREEN_DOM_ID + '" class="modal-body" style="max-height:405px">' +
				'<div id="' + MESSAGE_CONTAINER + '"></div>' +
				'<table class="table">' +
				'<tbody>' +
				'<tr class="info"><td>' + 
				'<button id="' + PERFORM_DELETE_SOFTWARE_ID + '" class="btn-xs btn-success">' + LANG.PERFORM_DELETE_SOFTWARE + '</button> '+
				'<button id="' + PERFORM_CHECK_BALANCE_ID + '" class="btn-xs btn-warning">' + LANG.PERFORM_MEDIUM_MISSIONS + '</button> ' +
				'<button id="' + PERFORM_TRANSFER_MONEY_ID + '" class="btn-xs btn-danger">' + LANG.PERFORM_HARD_MISSIONS + '</button>'+
				'<br /><br />' +
				'<button id="' + PERFORM_BANK_CAMPING + '" class="btn-xs btn-info">' + LANG.INTERCEPT_TRANSACTIONS + '</button>' +
				selectIpList +

				'<label style="margin:0; margin-top: 10px;"><input class="checkBoxes" id="' + SET_TRANSFER_TO_BTC + '"type="checkbox" style="margin:0;"><span style="margin-left:4px;">' + LANG.TRANSFER_TO_BTC + '</span></label>' +
				'</td></tr>' +

				'<tr class="warning"><td style="padding-bottom:0;">' + 
				'<button id="' + SET_CLEAN_OWN_LOGS_DOM_ID + '" class="btn-xs btn-secondary" style="margin-bottom:10px;"">' + LANG.CLEAN_OWN_LOGS + '</button> ' +
				'<button id="' + SET_CLEAN_TARGET_LOGS_DOM_ID + '" class="btn-xs btn-secondary" style="margin-bottom:10px;"">' + LANG.CLEAN_VICTIM_LOGS + '</button> ' +
				'<button id="' + SET_ACCESS_TARGET_CLEAN_LOGS_DOM_ID + '" class="btn-xs btn-secondary" style="margin-bottom:10px;"">' + LANG.ACCESS_CLEAR + '</button> ' +
				'</td></tr>' +
				
				'<tr class="info"><td>' + 
				'<button id="' + PERFORM_UPDATE_CRACKER + '" class="btn-xs btn-info">' + LANG.UPDATE_CRACKER + '</button> ' +
				'</td></tr>' +


				'<tr class="warning"><td>' +
					'<button id="' + SET_START_DDOSES + '" class="btn-xs btn-info">' + LANG.RUN_DDOSER + '</button> ' + '<input id="' + FIELD_DDOS_IP + '" class="controls fieldsContent" placeholder="' + LANG.DDOS_IP  + '" type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px; width: 25%">' + LANG.DDOS_TIMES + '<input class="controls fieldsContent" type="number" min="0" max="50" step="1" value="0" size="6" id="' + FIELD_DDOS_TIMES+ '" style="vertical-align: initial; margin-left: 10px; margin-right: 10px; width: 7%">' +
	            '</td></tr>' +


	            '<tr class="info"><td>' + 
				'<button id="' + SET_SEARCH_FOR_IPS + '" class="btn-xs btn-info">' + LANG.RUN_WEBCRAWLER + '</button> ' + LANG.WEBCRAWLER_INITIAL_HOSTS + '<input id="' + FIELD_IPS_START_SEARCHING + '" class="controls fieldsContent" placeholder="' + LANG.PASTE_IPS + '" type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px; width: 25%">' + 
				'<label style="margin:0;"><input type="checkbox" class="checkBoxes" id="' + SET_IGNORE_LIST + '" style="margin:0;"><span style="margin-left:4px;">' + LANG.WEBCRAWLER_IGNORE_HOSTS + '</span><input id="' + FIELD_HOSTS_TO_IGNORE + '" class="controls fieldsContent" placeholder="' + LANG.PASTE_IPS + '" type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px; width:25%"></label>' +
				//'<label><input class="checkBoxes" type="checkbox" id=' + SET_UPLOAD_MODE + '><span>' + LANG.WEBCRAWLER_UPLOAD_SOFTWARES + '</span><input id="' + FIELD_SOFTWARES_TO_INSTALL + '" class="controls fieldsContent" placeholder="' + LANG.WEBCRAWLER_UPLOAD_SOFTWARE_MODEL + '" type="text" style="vertical-align: top; margin-left: 10px; margin-right: 10px; width:25%"">' + LANG.WEBCRAWLER_UPLOAD_WAIT + '<input id="' + SET_TIME_LIMIT + '" class="controls fieldsContent" placeholder="' + LANG.SECONDS + '" type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px; width:12%"></label>' +
				
				'<i>' + LANG.WEBCRAWLER_SCRIPT_TITLE + '</i> <a href="https://github.com/HEScriptsPack/BetterHExBot/wiki" target="_blank"><i class="fa fa-question-circle" aria-hidden="true"></i></a>&nbsp;&nbsp;<a href="#" id="' + PERFORM_RESET_WEBCRAWLER + '"><i class="fa fa-eraser" aria-hidden="true"></i></a>&nbsp;&nbsp;<a href="#" id="' + PERFORM_WEBCRAWLER_SCRIPT_RUNNING + '"><i class="fa fa-play-circle" aria-hidden="true"></i></a>&nbsp;<small style="visibility: hidden; color:green;" id="' + AREA_WARN_WEBCRAWLER + '">' + LANG.WARN_WEBCRAWLER_RESULT + '</small>' +
				//'<center><textarea id="' + WEBCRAWLER_SCRIPT + '" class="controls fieldsContent" style="width: 95%; resize: vertical; color:#80f980; background-color:black; font-family:monospace"></textarea>' + 
				'<center><div id="' + WEBCRAWLER_SCRIPT + '" style=" width: 510px;"> </div>' + 


				'<center><textarea id="' + WEBCRAWLER_SCRIPT_DEBUG + '" class="controls fieldsContent" style="width: 95%; resize: vertical; color:white; background-color:red; font-family:monospace"></textarea>' +

				'<center><textarea id="' + FIELD_IP_SEARCH_RESULT + '" class="controls fieldsContent" style="width: 95%; resize: vertical; font-family:monospace"></textarea>' + 
				'<input id="' + REGEX_INPUT_DOM_ID + '" class="controls fieldsContent" type="search" style="width: 95%;" placeholder="' + LANG.WEBCRAWLER_FILTER_WITH + '"></center>' +
				'</td></tr>' +

				'</tbody>' +
				'</table>' + 
			'</div>' + 
			'<div id="' + CREDITS_SCREEN_DOM_ID + '" class="modal-body">' +
				'<h1>' + LANG.CREDITS_TITLE + '</h1>' +
				'<div style="font-size: 15px;">' +
				'<a href="https://github.com/cmathiswausau">cmathiswausau</a> - ' + LANG.CREDITS_cmathiswausau + '<br />' +
				'<a href="https://github.com/dominicusdev">dominicusdev</a> - ' + LANG.CREDITS_dominicusdev + '<br />' +
				'<a href="https://github.com/gresendesa">gresendesa</a> - ' + LANG.CREDITS_gresendesa + '<br />' +
				'<a href="https://github.com/Klorker">Klorker</a> - ' + LANG.CREDITS_Klorker + '<br />' +
				'<a href="https://github.com/Logfro">Logfro</a> - ' + LANG.CREDITS_Logfro + '<br />' +
				'<a href="https://github.com/perfilrobo">perfilrobo</a> - ' + LANG.CREDITS_perfilrobo + '<br />' +
				'<a href="https://github.com/Quartz101">Quartz101</a> - ' + LANG.CREDITS_Quartz101 + '<br />' +
				'<a href="https://github.com/sjs1985">sjs1985</a> - ' + LANG.CREDITS_sjs1985 + '<br />' +
				'<a href="https://github.com/fkapitalism">fkapitalism</a> - ' + LANG.CREDITS_fkapitalism + '<br />' +
				'<a href="https://github.com/AssHole12">AssHole12</a> - ' + LANG.CREDITS_AssHole12 + '<br /><br />' +
				LANG.CREDITS_OTHERS +
				'</div><br />' +
				'<button id="back-to-main" class="btn-xs btn-success">' + LANG.CREDITS_BACK_BUTTON + '</button>'+
			'</div>' + 
			'<div id="' + CONFIG_PANEL + '" class="modal-body" style="max-height:405px">' +
				'<div style="font-size: 15px;" id="' + CONFIG_AREA + '">' +
				'<h2>' + LANG.CONFIG_AREA_TITLE + '</h2>'+
				'<div class="section-title">'+
					'<h4>' + LANG.CONFIG_GENERAL_TITLE + '</h4>'+
					'<div class="divider">'+
						'<label><input class="checkBoxes" style="margin:0;" id="' + SET_POPUP_AFTER_INSTRUCTION + '"type="checkbox"><span style="margin-left:4px;">' + LANG.CONFIG_POPUP_BOT + '</span></label>' +
					'</div>'+
					//'<hr />' +
					'<h4>' + LANG.CONFIG_NOTIFIERS_TITLE + '</h4>'+
					'<div class="divider">'+
						'<label><input class="checkBoxes" type="checkbox" style="margin:0;" id=' + SET_MISSIONS_MONITOR + '><span style="margin-left:4px;">' + LANG.NOTIFY_MISSIONS + '</span></label>' +
						'<label><input class="checkBoxes" type="checkbox" style="margin:0;" id=' + SET_LOGS_MONITOR + '><span style="margin-left:4px;">' + LANG.NOTIFY_LOGS + '</span></label>' +
					'</div>'+
					//'<hr />' +
					'<h4>' + LANG.CONFIG_WEBCRAWL_TITLE + '</h4>'+
					'<div class="divider">'+
						'<label><input class="checkBoxes" style="margin:0;" id="' + SET_SKIP_AFTER_UPLOAD + '" type="checkbox"><span style="margin-left:4px;">' + LANG.WEBCRAWLER_SKIP_AFTER_UPLOAD + '</span></label>' +
						//'<label><input class="checkBoxes" id="' + SET_HIDE_MODE + '"type="checkbox"><span>' + LANG.WEBCRAWLER_HIDE_UPLOAD + '</span></label>' +
						'<label><input class="checkBoxes" style="margin:0;" type="checkbox" id=' + SET_SIGNATURE + '><span style="margin-left:4px;">' + LANG.WEBCRAWLER_LEAVE_SIGNATURE + '</span><a href="http://www.symbols-n-emoticons.com/p/facebook-text-art-ascii.html" target="_blank"> ' + LANG.WEBCRAWLER_FIND_SIGNATURE + '</a><textarea id="' + FIELD_SIGNATURE + '" class="controls fieldsContent" style="width: 95%; resize: vertical;"></textarea></label>' +
						'<label><input class="checkBoxes" style="margin:0;" id="' + SET_SHARE_WEBCRAWLER + '" type="checkbox"><span style="margin-left:4px;">' + LANG.WEBCRAWLER_SHARE_HOSTS + '</span>&nbsp;<span style="color: red">💖</span></label>' +
					'</div>'+

					'<h4>' + LANG.CONFIG_LANG_NAME + '</h4>'+
					'<div class="divider">'+
						'<label><input class="fieldsContent" style="margin:0;" id="' + LANGUAGE_FIELD + '" type="text"><span style="margin-left:4px;"> <b>br</b>, <b>de</b>, <b>el</b>, <b>en</b></span></label>' +
					'</div>'+
					'<button id="' + CONFIG_TO_MAIN + '" class="btn-xs btn-success">' + LANG.CREDITS_BACK_BUTTON + '</button>'+
				'</div>'+

				'</div><br />' +
			
			'</div>' +
			'<div class="modal-footer">' +
				LANG.REPOSITORY_LINK +
			'</div>';
		document.getElementsByTagName("BODY")[0].appendChild(divMain);
	},

	showControlPanel: function(){
		var element = document.getElementById(COMMAND_PANEL_DOM_ID)
		if(element){
			element.style.display = "block"
		}
	},

	hideControlPanel: function(){
		var element = document.getElementById(COMMAND_PANEL_DOM_ID)
		if(element){
			element.style.display = "none"
		}
	},

	showBotButton: function(){
		aux = document.createElement("li"); //Create a STOP BOT button
		aux.id = BOT_BUTTON_DOM_ID
		aux.className = "btn btn-danger mission-abort";
		aux.innerHTML = '<a><span id="botButtonContent" class="text" style="color: white;">BOT</span></a>';
		var containerElement = document.getElementsByClassName("nav btn-group")[0]
		containerElement.insertBefore(aux, containerElement.firstChild)
		containerElement.insertBefore(document.createElement("li"), containerElement.firstChild) //Just bypassing a bug
	},

	colorSideBarMenu: function(menu){
		getDOMElement("a", "href", menu, 0, true).style.backgroundColor = "rgb(125, 52, 52)"
	},

	discolorSideBarMenu: function(menu){
		getDOMElement("a", "href", menu, 0, false).style.backgroundColor = null
		getDOMElement("a", "href", menu, 0, true).style.color = "#aaa"
	},

	appendAndShowSuspectAccesses: function(logs){
		var newTextArea = document.createElement("textarea")
		newTextArea.disabled = true
		newTextArea.value = logs
		var container = getDOMElement("form", "action", "logEdit", 0, false)
		container.appendChild(document.createElement("BR"))
		container.appendChild(document.createElement("BR"))
		container.appendChild(newTextArea)
	},

	drawChat: function(data){
		data.reverse()
		var content =  
		'<div class="modal-body" style="max-height:150px" id="chat-div">' +
		  '<table style="border: none;border-spacing: 0;border-collapse: collapse; width:100%;">' +
			'<thead>';
		if((data.length>=50) && (data.isThereError)){
			content = content +
			'<tr>' +
				'<td style="color:yellow; background-color:black">' + LANG.QUANT_MESSAGES_SHOWING + '</td>'
			'</tr>';
		}
		for (var i = 0; i < data.length; i++) {
			var record = data[i].data
			content = content + 
			'<tr>' +
				'<td style="color:#80f980; background-color:black" title="Sent by someone\'s PID ' + record.pid + ' at ' + data[i].date + '">' + "<b>@" + record.scosd + "</b>: "  + record.afn +  '</td>'
			'</tr>';
		};

		content = content + 	  
			'</tbody>' +
		  '</table>' +
		'</div>';

		document.getElementById(CHAT_SEND_BUTTON).disabled = false

		document.getElementById(CHAT_AREA).innerHTML = content;
		var chatdiv = document.getElementById("chat-div")
		chatdiv.scrollTop = chatdiv.scrollHeight
		document.getElementById(CHAT_MESSAGE).value = ""
	},

	switchToMainScreen: function(){
		document.getElementById(CREDITS_SCREEN_DOM_ID).style.display = "none"
		document.getElementById(MAIN_SCREEN_DOM_ID).style.display = "block"
		document.getElementById(CONFIG_PANEL).style.display = "none"
	},

	switchToChatPanel: function(){
		document.getElementById(CREDITS_SCREEN_DOM_ID).style.display = "none"
		document.getElementById(MAIN_SCREEN_DOM_ID).style.display = "none"
		document.getElementById(CONFIG_PANEL).style.display = "block"
		document.getElementById(CONFIG_TO_MAIN).addEventListener("click", views.switchToMainScreen)
	},

	switchToMainScreenToCreditsScreen: function(){
		document.getElementById(CREDITS_SCREEN_DOM_ID).style.display = "block"
		document.getElementById(MAIN_SCREEN_DOM_ID).style.display = "none"
		document.getElementById(CONFIG_PANEL).style.display = "none"
		document.getElementById("back-to-main").addEventListener("click", views.switchToMainScreen)
	}
}