import Utils from '../Utils/Utils';
import TemplateManager from '../TemplateManager/templateManager';
/*
    Clase EditorUI
    Descripcion: Clase encargada de dar funcionalidad y aplicar eventos a la interfaz de usuario del editor.
    Esta clase fue creada para tener una clase específica que se encargue de manejar la funcionalidad de
    la interfaz.
*/
class EditorUI {


    //El constructor pide como parametro el frame del editor.
    constructor(frame, core) {


        this.core = core;

        //Se guarda una referencia al iframe del editor para poder editarla cuando una propiedad o elemento
        //sea cambiado/a.
        this.frame = frame;

        //Variable elementEditorID: Aquí se guarda el ID del editor de elementos.
        this.elementEditorID = "#elementEditor";

        //Se guarda una instancia de la clase Utils para posterior utilizacion.
        this.utils = new Utils();

        //Se guarda una instancia del manager de templates
        this.templateManager = new TemplateManager();

        //Al construirse la instancia, se inicializan los eventos de la interfaz de usuario (UI)
        this.initUI();

       
    }

    //Metodo encargado de inicializar la interfaz de usuario, ejecuta los metodos que inicializan cada uno
    //de los componentes de la interfaz.
    initUI() {
        this.initElementEditorUI();
    }

    //Inicializa el editor de elementos.
    initElementEditorUI() {
        //Hace el editor de elementos movible por la pantalla y con la posibilidad de cambiar su tamaño.
        $(this.elementEditorID).draggable();
        $(this.elementEditorID).resizable();

         //Campos del editor de elementos
         this.elementEditorFields = [
            {
                title: 'Clase',
                template: 'taggedinput',
                id: 'class',
                modifies: 'class'
            },
            {
                title: 'Id',
                template: 'input',
                id: 'id',
                modifies: 'id'
            }
        ]

    }

    //Metodo encargado de sincronizar un elemento con el editor de elementos.
    //Pide como parametro la instancia del elemento.
    async syncWithElementEditor(el) {
        
        //Obtenemos los atributos del elemento pasado como parametro.
        let attrs = await this.utils.getAttributes(el);

        //Variable donde se guardarán los nuevos fields
        let newFields = [];
        

        //Agregamos los campos al editor de elementos
        for(let a = 0; a <= this.elementEditorFields.length; a++) {
            let field = this.elementEditorFields[a];
            if (!field) continue;
            let template = await this.templateManager.getUIElement(field.template);
            let instance = $(template);
            
            instance.find("label").html(field.title);
            
            instance.find(".control").attr('id', field.id);

            let attr = this.utils.getElementInObjectArray('name', field.id, attrs);

            if (attr) instance.find(".control").val(attr.value.split(" ").join(","));

            this.templateManager.applyPlugins(instance.find(".control"), field.template);

            

            
            newFields.push(instance);
        }
        
        $(this.elementEditorID).find('.form').html('');
        $(this.elementEditorID).find('.form').append(newFields);

        this.core.controls.fetchSelectionEvents();
        //$(this.elementEditorID).html(elHtml);
    }
}

export {EditorUI as default}