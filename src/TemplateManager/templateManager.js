/*
    Clase TemplateManager
    Descripcion: Encargada de cargar y devolver los templates de los elementos de la interfaz de usuario
    y de elementos dentro del iframe
*/

class TemplateManager {
    constructor() {
        this.templatesFolder = "templates";
        this.elementsFolder = this.templatesFolder + "/elements";
        this.UIElementsFolder = this.templatesFolder + "/UI";


        this.pluginCallbacks = {
            'taggedinput': function(el) {
                $(el).tagsinput();
            }
        }

        this.pluginFilters = {
            'tagsinput': function(string) {
                return string.split(",").join(" ");
            }
        }
    }

    getElement(name) {
        return new Promise(resolve => {
            $.get({
                url: `${this.elementsFolder}/${name}.html`,
                dataType: "html",
                success: (res) => {
                    resolve(res);
                    
                }
            })
        })
        
    }

    getUIElement(name) {
        return new Promise(resolve => {
            $.get({
                url: `${this.UIElementsFolder}/${name}.html`,
                dataType: "html",
                success: (res) => {
                    resolve(res);
                }
            })
        })
    }

    applyPlugins(el, template) {
        if (this.pluginCallbacks[template]) this.pluginCallbacks[template](el);
        
    }



    
}

export {TemplateManager as default}