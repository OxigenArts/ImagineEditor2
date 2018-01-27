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
        
        
        //Variable editorID: Aquí se guarda el ID del elemento que contiene al editor
        this.editorID = "#editor";
        
        //Variable elementEditorID: Aquí se guarda el ID del editor de elementos.
        this.elementEditorID = "#elementEditor";
        
        
        //Variable editorPanelIDSelector: Aquí se guarda el ID del panel del editor.
        this.editorPanelSelector = ".editorPanel";
        
        
        //Variable editorPanelMenuSelector: Aquí se guarda el ID del menu del panel del editor.
        this.editorPanelMenuSelector = ".editorPanelMenu";
        
        
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
        this.initEditorPanelUI();
    }
    
    //Inicia el panel del editor
    initEditorPanelUI() {
        let editorPanelMenu = $(this.editorPanelMenuSelector);
        let editorPanel = $(this.editorPanelSelector);
        let editor = $(this.editorID);
        
        editorPanelMenu.each(function() {
            Sortable.create(this, {
                group: 'editor'
            })
        })
        
        
        
    }

    //Inicializa el editor de elementos.
    initElementEditorUI() {
        
        $(this.elementEditorID).resizable({
            handles: 's'
        })
        
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
    
    //Obtiene los campos generales del elemento seleccionado
    async getFieldsElementEditor(el) {
        let attrs = await this.utils.getAttributes(el);
        let newFields = [];
        for(let a = 0; a <= this.elementEditorFields.length; a++) {
            let field = this.elementEditorFields[a];
            if (!field) continue;
            let template = await this.templateManager.getUIElement(field.template);
            let instance = $(template);
            
            instance.find("label").html(field.title);
            
            instance.find(".control").attr('id', field.id);

            let attr = this.utils.getElementInObjectArray('name', field.id, attrs);

            if (attr && field.template == "taggedinput") instance.find(".control").val(attr.value.split(" ").join(","));

            this.templateManager.applyPlugins(instance.find(".control"), field.template);

            

            
            newFields.push(instance);
        }
        
        return newFields;
    }
    
    //Obtiene los campos de configuracion del elemento seleccionado
    async getFieldsConfigElementEditor(config, el) {
        let newFields = []
        if (config) {
            for (let property of config.properties) {
                if (!property) continue;
                let template = await this.templateManager.getUIElement(property.template);
                let instance = $(template);

                instance.find("label").html(property.title);

                instance.find(".control").attr('id', property.name);
                
                let selectorElementAttr = await this.utils.getAttributes(el.find(property.selector));
                let attr = this.utils.getElementInObjectArray('name', property.name, selectorElementAttr);
                
                
                if (attr) instance.find(".control").val(attr.value);
                
                if (attr && property.template == "taggedinput") instance.find(".control").val(attr.value.split(" ").join(","));

                this.templateManager.applyPlugins(instance.find(".control"), property.template);
                
                newFields.push(instance);
            }
            
            if (config.styles) {
                //console.log(config.styles);
                for (let style of config.styles) {
                    if (!style) continue;

                    for(let rule of style.rules) {
                        let template = await this.templateManager.getUIElement(rule.template);
                        let instance = $(template);
                        let ruleValue = el.find(style.selector).css(rule.name);
                        instance.find("label").html(rule.title);
                        instance.find(".control").attr('id', 'style');
                        instance.find(".control").attr('modifies', rule.name);
                        instance.find(".control").attr('selector', style.selector);
                        instance.find(".control").val(ruleValue);
                        
                        if (ruleValue && rule.template == "taggedinput") instance.find(".control").val(ruleValue.split(" ").join(","));
                        
                        this.templateManager.applyPlugins(instance.find(".control"), rule.template);
                        
                        newFields.push(instance);
                    }
                    
                    
                
                
                }
            }
            
        }
        
        return newFields;
    }
    
    //Metodo encargado de sincronizar un elemento con el editor de elementos.
    //Pide como parametro la instancia del elemento.
    async syncWithElementEditor(el) {
        
        //Obtenemos los atributos del elemento pasado como parametro.
        let attrs = await this.utils.getAttributes(el);
        
        //Variable donde se guardarán los nuevos fields
        var newFields = [];
        
        let config = $(el).attr('custom-data');
        
        if (config) config = JSON.parse(config);
        
        //Agregamos los campos al editor de elementos
        let fieldsElementEditor = await this.getFieldsElementEditor(el);
        let fieldsConfigElementEditor = await this.getFieldsConfigElementEditor(config, el);
        
        newFields = newFields.concat(fieldsElementEditor);
        newFields = newFields.concat(fieldsConfigElementEditor);
        
        $(this.elementEditorID).find('.form').html('');
        $(this.elementEditorID).find('.form').append(newFields);

        this.core.controls.fetchSelectionEvents();
        this.initUI();
        //$(this.elementEditorID).html(elHtml);
    }
}

export {EditorUI as default}