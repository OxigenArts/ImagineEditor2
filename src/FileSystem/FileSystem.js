import Folder from './Folder';
import File from './File';
import Exporter from '../Exporter/Exporter';

class FileSystem {
    constructor() {
        this.files = []
        this.folders = []
        

    }
    
    addFolder(name) {
        this.folders.push(new Folder(name));
    }
    
    folderExists(folder) {
        for(let a of this.folders) {
            let folder = a
            if (folder.name == folder) return true;
        }
        
        return false;
    }
    
    getFolder(folder) {
        return this.folders.filter(el => {
            return el.name == folder;
        })[0];
        
    }
    
    addFile(name, content, folder) {
        let newFile = new File(name);
        newFile.setContent(content);
        
        if (folder && this.folderExists(folder)) {
            let folderObj = this.getFolder(folder);
            folderObj.addFile(newFile);
        } else {
            this.files.push(newFile);
        }
    }

    addInSubfolder(folders, name, content) {
        var ref = this;
        for(var b of folders) {
            ref = ref.getFolder(b);
        }
        
        
        var newFile = new File(name);
        newFile.setContent(content);
        
        ref.addFile(newFile);
        
    }
    
    getJSON() {
        return JSON.stringify({
            files: this.files, 
            folders: this.folders
        });
    }
    
    getZip() {
        return new Exporter(this).getZip();
        
    }

    //addInSubfolder(['css', ['boostrap']], file);
}

export {FileSystem as default}