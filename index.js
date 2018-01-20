import EditorCore from './src/EditorCore';


let editor = new EditorCore("#editorFrame");

editor.setPreloadMethod(function() {
    console.log("Initializing editor..");
});

editor.init();




