import Utils from '../Utils/Utils';

/*
    Clase EditorControls
    Descripcion: Encargada de crear y configurar los controles del editor.
*/
class EditorControls {

    //Pide como parametro una instancia del EditorFrame para posterior utilizacion.
    constructor(editorFrame) {

       //Guardamos la instancia
       this.editorFrame = editorFrame;
       this.utils = new Utils();
       this.attachEvents();
    }


    //Configuramos los eventos de cada uno de los controles del editor
    attachEvents() {
        //Eventos relacionados con los elementos
        this.fetchElementsEvents();

        //Eventos relacionados con la seleccion de elementos.
        this.fetchSelectionEvents();
    }

    //Eventos relacionados con los elementos.
    fetchElementsEvents() {

        //Guardamos una referencia del objeto
        let self = this;

        //Evento: Cada vez que se le hace click a un elemento que contenga una propiedad llamada data-control-add-element.
        $('[data-control-add-element]').click(function( event )  {

            //Obtenemos lo que contiene control-add-element (data-control-add-element="elemento") -> element = "elemento"
            let element = $(this).data('control-add-element');

            //Obtenemos el template del elemento seleccionado en la carpeta templates/elements/...
            $.get({
                url: `templates/elements/${element}.html`,
                dataType: "html",
                success: (res) => {
                    console.log(res);
                    console.log(self);
                    //Agregamos al iframe del editor el template que obtuvimos.
                    self.editorFrame.appendHtml(res);
                }
            })
        })
    }

    //Eventos relacionados con la seleccion.
    fetchSelectionEvents() {

        //Obtenemos referencia del objeto
        let self = this;

        //Evento: Cada vez que cambia un elemento que contenga una propiedad llamada data-control-selected-element.
        $('[data-control-selected-element]').change(function( event ) {
            
            //Obtenemos el elemento seleccionado actual.
            let selectedElement = $(self.editorFrame.bridge.selectedElement);

            //Obtenemos la propiedad que se desea cambiar (especificada en el parametro data-control-selected-element)
            /*
                Ejemplo:
                    <input data-control-selected-element="class">
                    //Esto cambiará la propiedad class, y se guardará en la variable PropName.
            */
            let propName = $(this).data('control-selected-element');

            //Se modifica la propiedad mediante jQuery, obteniendo el nuevo valor.
            selectedElement.attr(propName, $(this).val());

            //Debug
            console.log(selectedElement, propName, $(this).val());
            console.log("Changed");
        })
    }
}

//Export como default de EditoControls.
export {EditorControls as default}