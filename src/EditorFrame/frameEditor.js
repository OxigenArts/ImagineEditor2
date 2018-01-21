//Import del EditorBridge
import EditorBridge from '../EditorBridge/editorBridge';


/**
 * Clase FrameEditor
 * Descripcion: Esta clase sirve especialmente para el iframe del editor.
 * Aquí van las funciones que se encargan de acceder a los elementos del iframe, modificarlos
 * y agregar codigo HTML desde el editor.
 * 
 * Para conectar el iframe con la funcionalidad del editor en si mismo, se utiliza la clase EditorBridge
 * (EditorBride significa Puente del editor, ya que sirve como puente entre el iframe y el editor)
 * 
 * En el constructor, se crea una instancia del EditorBridge pasando como parametro en el constructor una
 * referencia del FrameEditor inicializado (Es decir, la misma instancia)
 */
class FrameEditor {
    
    
    //Constructor del frame del editor
    //Al preparar, inicializa el frame y lo adapta al objeto.
    constructor(id) {

        //Variable MarkElements: Funciona para activar o desactivar el Element Highlight
        //Element Highlight: Recuadro azul que se coloca sobre cada elemento.
        this.markElements = true;

        //FrameEditor.$iframe simboliza la conexion con el iframe desde jQuery.
        //Esta propiedad se utiliza para acceder al iframe y a sus elementos, así como tambien
        //Modificarlos a voluntad.
        this.$iframe = $(id);

        /*Aquí se crea la instancia de EditorBride, de forma que desde la misma clase
        se pueda acceder a los elementos del editor.

        La propiedad que almacena la instancia de EditorBridge es FrameEditor.bridge, como puede observarse
        aquí abajo.
        */
        this.bridge = new EditorBridge(this);

        /*
        La funcion prepareDOM agrupa las funciones:
            prepareBody(); -> Preprocesa el body para que se pueda interactuar en él.
            prepareHead(); -> Preprocesa el head y se le agregan cosas como scripts solo del editor, etc.
        */
        this.prepareDOM();
    }

    //Método para obtener el body del frame.
    //Este método se utilizará en todo el proyecto, ya que es una forma directa y abierta para
    //acceder al DOM (Objeto de modelo del documento) mediante jQuery, pudiendo así modificar sus elementos
    //desde el mismo.
    /*
        Ejemplo: 
            Desde la misma clase: 
                let body = await this.getBody();
                body.append('Hola mundo');
                //Esto hará que en el iframe se muestre 'Hola mundo'
            
            Desde otra clase o desde el mismo codigo:
                let body = instanciaDelFrameEditor.getBody();
                body.append('Hola mundo');
                //Al igual que el ejemplo anterior, se muestra 'Hola mundo' en el iframe.
    */
    getBody() {
        //Devuelve una promise, por lo tanto cuando se quiera usar en funciones desde una funcion asíncrona.
        /*
            Ejemplo:
                //Funcion normal
                async function miFuncion() {
                    let body = await editorFrame.getBody();
                    body.append('<b> Mi funcion ha sido ejecutada :) ');
                }

                //Metodo en un objeto
                async miMetodo() {
                    let body = await editorFrame.getBody(); //o this.editorFrame.getBody() dependiendo de si se está en la misma clase o en otra distinta.
                    body.append('<b> Mi metodo ha sido ejecutado :) ');
                }
        */
        return new Promise(resolve => {
            this.$iframe.ready(() => {
                resolve(this.$iframe.contents().find('body'));
            })
        })
    }


    //Metodo para obtener el head del frame
    //Este metodo funciona igual que el getBody() solo que este obtiene el head, de forma que se pueden
    //agregar o quitar elementos de ahí, así como tambien modificar sus propiedades.
    /*
        Ejemplo:
            let head = await this.getHead();
            head.append('<script>alert('Hola');</script>');
    */
    getHead() {
        return new Promise(resolve => {
            this.$iframe.ready(() => {
                resolve(this.$iframe.contents().find('head'));
            })
        })
    }


    //Preparacion del DOM (Ejecuta los metodos de preparacion del body y el head)
    //Como se puede observar, este metodo simplemente ejecuta el prepareBody y el prepareHead.
    //Fue creado solo para abreviar.
    prepareDOM() {
        this.prepareBody();
        this.prepareHead();
    }


    //Añadir eventos de hightlight de cada elemento (Recuadro azul que aparece cuando haces hover a un elemento)
    attachHighlightEvent() {
        if (this.markElements) {
            let self = this.$iframe;
            this.$iframe.contents().find('body *').mouseenter(function(e){
                var etop = $(e.target).offset().top - self.contents().scrollTop()+ self.offset().top;
                var eleft = $(e.target).offset().left -  self.contents().scrollLeft()+ self.offset().left;
                var ewidth = $(e.target).outerWidth();
                var eheight = $(e.target).outerHeight();
                let box = $('<div style="top:'+etop+'px;left:'+eleft+'px;width:'+ewidth+'px;height:'+eheight+'px;" class="selector"></div>');
                $("body").append(box);
                box.hide().fadeIn(100);
                e.stopPropagation();
            }).mouseleave(function(){
                $('.selector').fadeOut(100).remove();
            });


            
        }
    }


    //Preparacion del body
    //En este metodo se prepara el body y configura los eventos mediante el EditorBridge.
    //Dichos eventos sincronizan cada uno de los elementos del body con eventos en el editor,
    //de forma que el editor tenga acceso siempre a los datos mas recientes del body.
    async prepareBody() {
        //Se obtiene una instancia del body.
        let body = await this.getBody();

        //Aquí se hace que los elementos dentro del body sean intercambiables (Movibles entre los elementos)
        //mediante la libreria Sortable.min.js ubicada en la carpeta script.
        //Se le coloca como parametro group: elements porque todos los elementos del mismo grupo se pueden intercambiar.
        let sortable = Sortable.create(body[0], {
            group: 'elements'
        });
        
        //Se inicializan los eventos del EditorBridge
        this.bridge.attachEvents();

        //Se inicializan los eventos del Element Highlight
        this.attachHighlightEvent();
    }

    //Preparacion del Head
    async prepareHead() {
        let head = await this.getHead();
        let self = this;
        
    }


    //Metodo para agregar HTML al frame.
    //Nota: Nótese que se utilizan el keyword 'ASYNC' para decir que el método es ASÍNCRONO. 
    //Es asíncrono porque se utiliza 'AWAIT', es decir que el método no se ejecutará por completo hasta
    //que la variable body complete su ciclo de ejecucion.
    async appendHtml(html) {
        //Se obtiene una instancia del body de forma asíncrona. 
        let body = await this.getBody();

        //Se obtiene una instancia jQuery del elemento que se quiere agregar.
        let el = $(html);

        //Se le añade la clase 'el' al elemento. Dicha clase sirve para ubicar quienes son elementos modificables y quienes no.
        el.addClass('el');

        //Se hace el elemento a introducir un elemento Sortable, es decir, que puede ser intercambiado entre los
        //otros elementos dentro del body.
        //Nota: Nótese que también se le agrega el parámetro group:elements.
        Sortable.create(el[0], {
            group:'elements'
        });

        //Se agrega el elemento creado en la línea 177 al body.
        body.append(el);

        //Luego se ejecuta el ciclo de preparacion del body, en donde se configuran los eventos del mismo
        //y se ejecutan los eventos del EditorBridge.
        this.prepareBody();
    }


}

//Se exporta la clase como por defecto.
export { FrameEditor as default };