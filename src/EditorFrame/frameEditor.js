import EditorBridge from '../EditorBridge/editorBridge';

class FrameEditor {
    
    
    //Constructor del frame del editor
    //Al preparar, inicializa el frame y lo adapta al objeto.
    constructor(id) {
        this.markElements = true;
        this.$iframe = $(id);
        this.bridge = new EditorBridge(this);
        this.prepareDOM();
    }

    //Método para obtener el body del frame.
    getBody() {
        return new Promise(resolve => {
            this.$iframe.ready(() => {
                resolve(this.$iframe.contents().find('body'));
            })
        })
    }

    getHead() {
        return new Promise(resolve => {
            this.$iframe.ready(() => {
                resolve(this.$iframe.contents().find('head'));
            })
        })
    }


    //Preparacion del DOM
    prepareDOM() {
        this.prepareBody();
        this.prepareHead();
    }

    attachHighlightEvent() {
        if (this.markElements) {
            let self = this.$iframe;
            this.$iframe.contents().find('body *').mouseenter(function(e){
                var etop = $(e.target).offset().top - self.contents().scrollTop()+ self.offset().top;
                var eleft = $(e.target).offset().left -  self.contents().scrollLeft()+ self.offset().left;
                var ewidth = $(e.target).outerWidth();
                var eheight = $(e.target).outerHeight();

		        $("body").append('<div style="top:'+etop+'px;left:'+eleft+'px;width:'+ewidth+'px;height:'+eheight+'px;" class="selector"></div>')
		    	e.stopPropagation();
            }).mouseleave(function(){
                $('.selector').remove();
            });


            
        }
    }


    //Preparacion del body
    async prepareBody() {
        let body = await this.getBody();
        let self = this;
        body.sortable();
        this.bridge.attachEvents();
        this.attachHighlightEvent();
    }

    //Preparacion del Head
    async prepareHead() {
        let head = await this.getHead();
        let self = this;
        
    }


    //Metodo para agregar HTML al frame.
    async appendHtml(html) {
        let body = await this.getBody();
        body.append(html);
        this.prepareBody();
    }


}

export { FrameEditor as default };