import EditorUI from '../EditorUI/editorUI';

/*
    Clase EditorBridge
    Descricion: Esta clase sirve como puente entre el iframe del editor y los controles, así como también
    el user interface.
*/
class EditorBridge {

    //El constructor pide una referencia al EditorFrame para posterior utilizacion.
    constructor(frame, core) {

        this.core = core;

        //Guardamos una referencia del EditorFrame.
        this.editorFrame = frame;

        //Variable selectedElement: Contiene una referencia al elemento seleccionado.
        //Establecemos como indefinida la propiedad selectedElement, ya que al principio no hay ningun
        //elemento seleccionado.
        this.selectedElement = undefined;
        
        
        //Variable selectedElementConfig: Contiene la configuracion del elemento seleccionado.
        //Aquí se especifican cuales son las propiedades especificas del elemento y que aparecerán en el editor.
        this.selectedElementConfig = undefined;
        
        //Instancia de la clase EditorUI para modificar la UI mediante el puente (EditorBridge o this).
        this.editorUI = new EditorUI(this.editorFrame, this.core);

        //Elementos del menu de contexto (Menu que se abre cuando le damos click derecho)
        this.contextElements = [
            {
                title: 'Eliminar',
                callback: function(e) {
                    $(e).remove();
                }
            }
        ]

        //Inicializamos los eventos del puente.
        this.attachEvents();
    }

    //Funcion para establecer un elemento como seleccionado.
    selectElement(el) {
        this.selectedElement = el;
        this.editorUI.syncWithElementEditor(this.selectedElement, this.selectedElementConfig);
    }

    //Funcion para inicializar los eventos del puente.
    attachEvents() {
        //Inicia los eventos de seleccion.
        this.attachSelectionEvent();

        //Inicia los eventos del menu de contextos.
        this.attachContextEvents();
    }

    //Funcion para obtener una referencia jQuery al iframe registrado en el EditorFrame.
    getFrame() {
        return this.editorFrame.$iframe;
    }

    //Funcion para obtener una referencia unica a todos los elementos del body.
    getBodyElements() {
        return this.getFrame().contents().find("body *");
    }



    //Inicia los elementos de seleccion.
    attachSelectionEvent() {

        //Obtenemos todos los elementos del body.
        let bodyElements = this.getBodyElements();

        //Obtenemos una referencia a la misma clase.
        let self = this;

        //Evento: Cuando se le hace click a cualquier elemento del body
        bodyElements.click(function(e) {
            //Evitamos que al elemento al que se le dió click se le propague al padre su mismo evento.
            //Es decir, que si le damos a un P que está dentro de un DIV, no se seleccione el DIV por contenerlo.
            e.stopPropagation();

            //Ejecutamos el metodo editorBridge.selectElement pasando la referencia del elemento que se seleccionó.
            self.selectElement($(this));

            //Debug
            console.log(self.selectedElement);
        });

        //Evento: Cuando se le hace doble click a cualquier elemento del body
        bodyElements.dblclick(function(e) {
            //Evitamos la propagacion 
            e.stopPropagation();

            //Seleccionamos al padre del elemento.
            self.selectElement($(this).parent());
            console.log(self.selectedElement);
        })
    }

    
    //Iniciamos los eventos del menu de contextos.
    async attachContextEvents() {

        //Obtenemos una referencia al frame
        let self = this.editorFrame.$iframe;

        //Y tambien una referencia a la misma clase
        let t = this;

        //Obtenemos todos los elementos del body
            self.contents().find('body *').contextmenu(function(e){

                //Evitamos que se abra el menu de contexto por defecto.
                e.preventDefault();

                //Obtenemos los datos de la posicion del mouse y el ancho y alto del elemento
                var etop = e.pageY;
                var eleft = e.pageX;
                var ewidth = 200;
                var eheight = 200;

                //Los metemos en un objeto
                let contextStyle = {
                    top: etop,
                    left: eleft,
                    width: ewidth,
                    height: eheight
                }


                //Creamos el objeto
                let box = $('<div class="contextMenu"></div>');

                //Metemos los items en el menu de contextos
                for(var i = 0; i <= t.contextElements.length; i++) {
                    let el = t.contextElements[i];
                    let cEl = $('<div class="contextMenuItem"></div>');
                    if (el) {
                        let event = e;
                        console.log(el.title);
                        cEl.append(el.title);
                        cEl.click(function(ev) {
                            el.callback(event.target);
                            box.fadeOut(100).end().remove();
                        })
                    }
                    
                    //Los colocamos en el contenedor
                    box.append(cEl);
                }

                //Establecemos el estilo del menu de contextos
                box.css(contextStyle);
                
                //Cuando salimos del menu con el mouse, este se cierra.
                box.mouseout(function() {
                    $(this).remove();
                })

                //Metemos el menu en el body
                $("body").append(box);

                //Animacion
                box.hide().fadeIn(100);
                e.stopPropagation();
            })
    }


}

export {EditorBridge as default}