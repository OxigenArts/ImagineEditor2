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

export {Folder as default}