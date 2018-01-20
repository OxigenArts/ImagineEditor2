import Utils from '../Utils/Utils';

class EditorControls {

    constructor(editorFrame) {
       this.editorFrame = editorFrame;
       this.utils = new Utils();
       this.attachEvents();
    }

    attachEvents() {
        this.fetchElementsEvents();
        this.fetchSelectionEvents();
    }

    fetchElementsEvents() {
        let self = this;
        $('[data-control-add-element]').click(function( event )  {

            let element = $(this).data('control-add-element');


            $.get({
                url: `templates/elements/${element}.html`,
                dataType: "html",
                success: (res) => {
                    console.log(res);
                    console.log(self);
                    self.editorFrame.appendHtml(res);
                }
            })
        })
    }

    fetchSelectionEvents() {
        let self = this;
        $('[data-control-selected-element]').change(function( event ) {
            
            let selectedElement = $(self.editorFrame.bridge.selectedElement);
            let propName = $(this).data('control-selected-element');
            selectedElement.attr(propName, $(this).val());
            console.log(selectedElement, propName, $(this).val());
            console.log("Changed");
        })
    }
}

export {EditorControls as default}