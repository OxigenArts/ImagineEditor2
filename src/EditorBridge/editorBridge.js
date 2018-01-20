import EditorUI from '../EditorUI/editorUI';

class EditorBridge {

    constructor(frame) {
        this.editorFrame = frame;
        this.selectedElement = undefined;
        this.editorUI = new EditorUI(this.editorFrame);


        this.contextElements = [
            {
                title: 'Eliminar',
                callback: function(e) {
                    $(e).remove();
                }
            }
        ]
        this.attachEvents();
    }

    selectElement(el) {
        this.selectedElement = el;
        this.editorUI.syncWithElementEditor(this.selectedElement);
    }

    attachEvents() {
        this.attachSelectionEvent();
        this.attachContextEvents();
    }

    getFrame() {
        return this.editorFrame.$iframe;
    }

    getBodyElements() {
        return this.getFrame().contents().find("body *");
    }




    attachSelectionEvent() {
        let bodyElements = this.getBodyElements();
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

    

    async attachContextEvents() {
        let self = this.editorFrame.$iframe;
        let t = this;
            self.contents().find('body *').contextmenu(function(e){
                e.preventDefault();
                var etop = e.pageY;
                var eleft = e.pageX;
                var ewidth = 200;
                var eheight = 200;

                let contextStyle = {
                    top: etop,
                    left: eleft,
                    width: ewidth,
                    height: eheight
                }

                let box = $('<div class="contextMenu"></div>');

                for(var i = 0; i <= t.contextElements.length; i++) {
                    let el = t.contextElements[i];
                    let cEl = $('<div class="contextMenuItem"></div>');
                    if (el) {
                        let event = e;
                        console.log(el.title);
                        cEl.append(el.title);
                        cEl.click(function(ev) {
                            el.callback(event.target);
                            box.fadeOut(100).end().remove();
                        })
                    }
                    

                    box.append(cEl);
                }

                box.css(contextStyle);
                
                box.mouseout(function() {
                    $(this).remove();
                })

                
                $("body").append(box);
                box.hide().fadeIn(100);
                e.stopPropagation();
            })
    }


}

export {EditorBridge as default}