class File {
    constructor(name) {
        this.name = name;
        this.content = ""
    }
     
    
    setContent(content) {
        this.content = content;
    }

    
}


export {File as default}