import EditorControls from './EditorControls/editorControls';
import EditorFrame from './EditorFrame/frameEditor';

class EditorCore {
    constructor(id) {
        this.id = id;
    }


    setPreloadMethod(preloadMethod) {
        this.preload = preloadMethod;
    }

    init() {
        if (this.preload) this.preload();

        this.frame = new EditorFrame(this.id);
        this.controls = new EditorControls(this.frame);
    }


}

export {EditorCore as default}