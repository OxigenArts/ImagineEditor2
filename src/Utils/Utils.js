class Utils {
    constructor() {

    }

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

    getElementInObjectArray(key, search, arr) {
        console.log(arr);
        return arr.filter(obj => obj[key] == search)[0];
    }
}

export {Utils as default}