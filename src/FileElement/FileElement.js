class File {
    constructor(name) {
        this.name = name;
        this.content = ""
    }
     
    
    setContent(content) {
        this.content = content;
    }

    
}

class Folder {
    constructor(name) {
        this.name = name;
        this.files = []
        this.folders = []
    }
    
    addFile(file) {
        this.files.push(file);
    }
    
    addFolder(name) {
        this.folders.push(new Folder(name))
    }
    
    folderExists(folder) {
        for(let a = 0; a <= this.folders.length; a++) {
            let folder = this.folders[a];
            if (folder.name == folder) return true;
        }
        
        return false;
    }
    
    getFolder(folder) {
        for(let a = 0; a <= this.folders.length; a++) {
            let folder = this.folders[a];
            if (folder.name == folder) return folder;
        }
        
    }
}

class FileSystem {
    constructor() {
        this.files = []
        this.folders = []
        

    }
    
    addFolder(name) {
        this.folders.push(new Folder(name));
    }
    
    folderExists(folder) {
        for(let a = 0; a <= this.folders.length; a++) {
            let folder = this.folders[a];
            if (folder.name == folder) return true;
        }
        
        return false;
    }
    
    getFolder(folder) {
        for(let a = 0; a <= this.folders.length; a++) {
            let folder = this.folders[a];
            if (folder.name == folder) return folder;
        }
        
    }
    
    addFile(name, content, folder) {
        let newFile = new File(name);
        newFile.setContent(content);
        
        if (folder && this.folderExists(folder) {
            let folderObj = this.getFolder(folder);
            folderObj.addFile(newFile);
        }
    }

    addInSubfolder(folders, name, content) {
        let ref;
        for(let a = 0; a <= folders.length; a++) {
            let folderName = folders[a];
            if (ref) {
                let ref = ref.getFolder(folderName);
            } else {
                let ref = this.getFolder(folderName);
            }
        }
        
        let newFile = new File(name);
        newFile.setContent(content);
        
        ref.addFile(newFile);
    }

    //addInSubfolder(['css', ['boostrap']], file);
}









function zip(){
    
    
        var zip = new JSZip();
        if(carpeta.length>0){
            for(var car of carpeta){
            var img = zip.folder(car,"");
        }
        if(archivo.length>0){
            for(var ar of archivo){
            var img = zip.file(ar,"");
        }
   }
       if(carpeta.length>1 || archivo.length>1){
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
        });
          carpeta = {};
           archivo = {};
          }
         
}
    }