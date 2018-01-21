
//Import de componentes del editor
import EditorControls from './EditorControls/editorControls';
import EditorFrame from './EditorFrame/frameEditor';


/*
    Clase EditorCore
    Descripcion: Esta clase conecta todas las clases que funcionan como componentes.
    Esta clase fue creada con el proposito de agrupar todos los componentes y dependencias
    de cada uno de forma que el editor se pueda inicializar en cualquier contexto y con cualquier tema,
    aumentando la portabilidad.
*/
class EditorCore {

    //El constructor solo pide el parametro del ID del iframe en el cual se va a ejecutar el editor.
    constructor(id) {
        this.id = id;
    }


    //El metodo setPreloadMethod permite introducir un metodo de preload (Metodo de preinicializacion)
    //Todo metodo que se introduzca mediante esta vía, se ejecutara antes de iniciar el editor.
    setPreloadMethod(preloadMethod) {
        this.preload = preloadMethod;
    }

    //El metodo init() es el encargado de crear las intancias de los modulos del editor y a la vez de conectarlos entre sí.
    init() {

        //Condicion: Si hay un método de preload se ejecuta.
        if (this.preload) this.preload();

        //EditorCore.frame -> Frame del editor (Ver EditorFrame/editorFrame.js para mas informacion)
        this.frame = new EditorFrame(this.id);

        //EditorCore.controls -> Controles del editor (Ver EditorControls/editorControls.js para mas informacion)
        this.controls = new EditorControls(this.frame);
    }


}

//Exportacion del EditorCore por defecto.
export {EditorCore as default}