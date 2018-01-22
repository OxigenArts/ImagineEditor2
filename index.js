//Import del Core del editor
import EditorCore from './src/EditorCore';
import FileSystem from './src/FileSystem/FileSystem';

//El editor del core inicializa todos los componentes del editor

//Creando instancia del Editor (Como parametro se le pasa el ID del iframe que contiene el codigo resultante)
let editor = new EditorCore("#editorFrame");

//A la instancia del editor se le puede poner un callback de inicializacion (Es decir, una funcion que se ejecuta antes de que el editor inicie)
editor.setPreloadMethod(function() {
    console.log("Initializing editor..");
});

//La el metodo init() funciona para iniciar el editor y activar sus componentes.
editor.init();

window.fileSystem = new FileSystem();