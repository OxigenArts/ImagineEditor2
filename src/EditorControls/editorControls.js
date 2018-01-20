

class EditorControls {

    constructor(editorFrame) {
       this.editorFrame = editorFrame;
       this.fetchElementsEvents();
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
}

export {EditorControls as default}