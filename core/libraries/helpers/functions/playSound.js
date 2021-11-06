/**
 * 
 * It runs a sound
 * 
 **/
function playSound(fileAudioName){
	let fileAudioURL = chrome.runtime.getURL(`sounds/${fileAudioName}`)
	//console.log('sound', fileAudioURL)
	let audio = new Audio(fileAudioURL)
	audio.play()
}