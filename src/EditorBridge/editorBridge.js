import EditorUI from '../EditorUI/editorUI';

class EditorBridge {

    constructor(frame) {
        this.editorFrame = frame;
        this.selectedElement = undefined;
        this.editorUI = new EditorUI(this.editorFrame);
        this.attachEvents();
    }

    selectElement(el) {
        this.selectedElement = el;
        this.editorUI.syncWithElementEditor(this.selectedElement);
    }

    attachEvents() {
        this.attachSelectionEvent();
    }


    attachSelectionEvent() {
        let frame = this.editorFrame.$iframe;
        let bodyElements = frame.contents().find("body *");
        let self = this;
        bodyElements.click(function(e) {
            e.stopPropagation();
            self.selectElement($(this));
            console.log(self.selectedElement);
        });

        bodyElements.dblclick(function(e) {
            e.stopPropagation();
            self.selectElement($(this).parent());
            console.log(self.selectedElement);
        })
    }


}

export {EditorBridge as default}