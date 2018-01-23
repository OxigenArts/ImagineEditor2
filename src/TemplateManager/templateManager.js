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
                $(el).tagsinput({
                    tagClass: "btn btn-primary"
                });
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
                    let element = $(res).find("#elementHtml").html();
                    let configElement = $(res).find("#elementConfig").html();
                    let config = {none: true};
                    try {
                        if (configElement) config = JSON.parse(configElement);
                    } catch(e) {
                        console.log("Error: ", e);
                        return;
                    }
                    
                    resolve({el: element, config: config})
                    
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
    
    processElement(el, config) {
        if (config.none) return el;
        
        let element = $(el);
        
        //console.log("templateManager processElement config", config);
        
        if (config.properties) {
            for(let property of config.properties) {
            
                element.find(property.selector).attr(property.name, property.default);
            
            }
        }
        
        if (config.styles) {
            for (let style of config.styles) {
                let styled = element.find(style.selector);

                style.rules.map((rule) => {
                    //console.log(rule);
                    styled.css(rule.name, rule.default);
                })
            }
        }
        
        
        element.attr("custom-data", JSON.stringify(config));
        return element;
    }
            



    
}

export {TemplateManager as default}