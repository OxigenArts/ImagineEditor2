import Utils from '../Utils/Utils';

class EditorUI {

    constructor(frame) {
        this.frame = frame;
        this.elementEditorID = "#elementEditor";
        this.utils = new Utils();
        this.initUI();
    }

    initUI() {
        this.initElementEditorUI();
    }

    initElementEditorUI() {
        $(this.elementEditorID).draggable();
        $(this.elementEditorID).resizable();
    }



    async syncWithElementEditor(el) {
        
        
        let attrs = await this.utils.getAttributes(el);
        let classAttr = this.utils.getElementInObjectArray('name', 'class', attrs);
        if (classAttr) $(this.elementEditorID).find('#class').val(classAttr.value);
        
        //$(this.elementEditorID).html(elHtml);
    }
}

export {EditorUI as default}