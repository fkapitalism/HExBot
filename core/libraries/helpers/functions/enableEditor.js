/*
 * Code from https://jsfiddle.net/tovic/2wAzx/
 */

function enableEditor(editor, controllers) {
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setUseWorker(false);
    editor.resize()
    editor.setOptions({
        fontSize: "10pt",
        maxLines: 1000,
        autoScrollEditorIntoView: true, 
        showPrintMargin: false,
    });
    editor.setValue(controllers.bot.controlPanel.fieldsContent['web-crawl-script']);
    editor.getSession().selection.moveCursorFileStart();

    editor.getSession().on('change', () => {
        controllers.bot.controlPanel.fieldsContent['web-crawl-script'] = editor.getSession().getValue();
        controllers.storage.set(controllers.bot)
    });
    /*el.onkeydown = function(e) {
        if (e.keyCode === 9) { // tab was pressed

            // get caret position/selection
            var val = this.value,
                start = this.selectionStart,
                end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            this.value = val.substring(0, start) + '\t' + val.substring(end);

            // put caret at right position again
            this.selectionStart = this.selectionEnd = start + 1;

            // prevent the focus lose
            return false;

        }
    };*/
}