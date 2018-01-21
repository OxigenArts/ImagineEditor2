/*
    Clase Utils
    Descripcion: Contiene métodos que facilitan la utilizacion de todo el sistema. 
    Creado especialmente para no tener que repetir codigo en ciertas ocasiones.
    Esquema DRY.
*/

class Utils {
    constructor() {

    }

    //Metodo que funciona para obtener los atributos de un elemento jQuery.
    getAttributes(el) {
        return new Promise(resolve => {
            let attributes = [];
            $(el).each(function() {
                $.each(this.attributes, function() {
                  // this.attributes is not a plain object, but an array
                  // of attribute nodes, which contain both the name and value
                  if(this.specified) {
                    //console.log(this.name, this.value);
                    attributes.push({name: this.name, value: this.value});
                  }
                });
              });
              resolve(attributes);
        })
        
    }

    //Metodo para obtener un elemento de un array de objetos teniendo el nombre de un parametro.
    getElementInObjectArray(key, search, arr) {
        return arr.filter(obj => obj[key] == search)[0];
    }

}

export {Utils as default}