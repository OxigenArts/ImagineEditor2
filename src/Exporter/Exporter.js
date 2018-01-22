class Exporter {
    constructor(fs) {
        this.fileSystem = fs;
        this.zip = new JSZip();
        this.transform();
    }
    
    
    transform() {
        for (let file of this.fileSystem.files) {
            this.zip.file(file.name, file.content);
            console.log(file.name);
        }
        
        for (let folder of this.fileSystem.folders) {
            let f = this.zip.folder(folder.name);
            this.transformFolder(f, folder);   
        }
    }
    
    transformFolder(folderZip, folder) {
        for (let file of folder.files) {
            folderZip.file(file.name, file.content);
        }
        
        for (let folder of folder.folders) {
            let f = folderZip.folder(folder.name);
            this.transformFolder(f, folder);       
        }
    }
    
    getZip() {
        return this.zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "export.zip");
        });
    }
    
    
    
    
}

export {Exporter as default}