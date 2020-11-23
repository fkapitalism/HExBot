/*
 * Sandbox
 * Author: fkapitalism
 * This class implements a wrapped environment for custom Webcrawler scripts execution.
 */

 function Sandbox(){
 	var uploads = []
 	var seconds_max = 0
 	var warnings = []
 	var clean_just_after_upload = false
 	var clean_disabled = false
 	var must_leave_signature = controllers.bot.controlPanel.checkBoxes[SET_SIGNATURE]
 	var target = {
 		internet: null,
 		freehd: null,
 		label: controllers.bot.webcrawler.current_target_label,
 		softwares: function(name = "*", only_installed = false){
 			var softwares = getSoftwaresByPattern(name.replace('*', ''), '/internet', 'view=software')
	 		var list = []
	 		for (var i = 0; i < softwares.length; i++) {
	 			var software = new Software(softwares[i].id, softwares[i].name, softwares[i].version, softwares[i].size, softwares[i].installed)
	 			if(only_installed){
	 				if(software.installed)
	 					list.push(software)
	 			} else {
	 				list.push(software)
	 			}
	 			
	 		}
	 		return {
	 			list: list,
	 			has: function(name, must_be_installed = false){
	 				var does_has = false
	 				for (var i = 0; i < this.list.length; i++) {
	 					if(this.list[i].name.indexOf(name.replace('*', '')) >= 0){
	 						if(must_be_installed){
	 							if(this.list[i].installed)
	 								does_has = true
	 							else
	 								does_has = false
	 						} else {
	 							does_has = true
	 						}
	 						break
	 					}
	 				}
	 				return does_has
	 			},
	 			has_installed: function(name){
	 				return this.has(name, true)
	 			}
	 		}
 		}
 	}

 	function upload(name, actions, version = '*'){
		var software = getSoftwareInfo(name.replace('*', ''), version.replace('*', ''), '/software', '')
 		if(software){
 			software.actions = actions
 			uploads.push(software)
 		} else {
 			warnings.push(name + " version " + version + " NOT FOUND")
 		}
 	}

 	function seconds_limit(seconds){
 		seconds_max = seconds
 	}

 	function MB(input){
 		return normalizeDigitalInfoUnit(String(input)+' MB')
 	}

 	function GB(input){
 		return normalizeDigitalInfoUnit(String(input)+' GB')
 	}

 	function Mbits(input){
 		return input
 	}

 	function clean_logs_just_after_installing(){
 		clean_just_after_upload = true
 	}

 	function clean_logs_disabled(){
 		clean_disabled = true
 	}

 	function leave_signature(input){
 		if(input){
 			controllers.bot.controlPanel.fieldsContent[FIELD_SIGNATURE] = input
 			controllers.storage.set(controllers.bot)
 		}
 		must_leave_signature = true
 	}

 	function stop(){
 		$jSpaghetti.module("webcrawler").sequence("browseWeb").reset()
 	}

 	function print(message){
 		controllers.bot.webcrawler.debugLines.push({content: message, ip: ""})
 		controllers.storage.set(controllers.bot)
 	}

 	function softwares(name = "*", only_installed = false){
		var softwares = getSoftwaresByPattern(name.replace('*', ''), '/software', '')
 		var list = []
 		for (var i = 0; i < softwares.length; i++) {
 			var software = new Software(softwares[i].id, softwares[i].name, softwares[i].version, softwares[i].size, softwares[i].installed)
 			if(only_installed){
 				if(software.installed)
 					list.push(software)
 			} else {
 				list.push(software)
 			}
 			
 		}
 		return {
 			list: list,
 			has: function(name, must_be_installed = false){
 				var does_has = false
 				for (var i = 0; i < this.list.length; i++) {
 					if(this.list[i].name.indexOf(name.replace('*', '')) >= 0){
 						if(must_be_installed){
 							if(this.list[i].installed)
 								does_has = true
 							else
 								does_has = false
 						} else {
 							does_has = true
 						}
 						break
 					}
 				}
 				return does_has
 			},
 			has_installed: function(name){
 				return this.has(name, true)
 			}
 		}
	}

 	this.run = function(code, check_requirements = false){
 		var target_info = getTargetInfo()
 		target.internet = target_info.internetMbit;
 		target.freehd = target_info.freehd;

 		var evaloutput = null
 		try{
 			eval(code)
 		}catch(err){
 			evaloutput = err.message
 		}

 		return {
 			uploads: uploads,
 			errors: evaloutput,
 			warnings: warnings,
 			target: target,
 			seconds_limit: seconds_max,
 			clean_just_after_upload: clean_just_after_upload,
 			clean_disabled: clean_disabled,
 			must_leave_signature: must_leave_signature
 		}
 	}
 }