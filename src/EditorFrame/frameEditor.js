class FrameEditor {
    
    
    //Constructor del frame del editor
    //Al preparar, inicializa el frame y lo adapta al objeto.
    constructor(id) {
        this.markElements = true;
        this.$iframe = $(id);
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


    //Preparacion del body
    async prepareBody() {
        let body = await this.getBody();
        let self = this;
        body.sortable();
        this.addMark(body.children());
    }

    //Preparacion del Head
    async prepareHead() {
        let head = await this.getHead();
        let self = this;

        head.append("<link rel='stylesheet' href='style/editorFrame.css'>")
    }


    //Metodo para agregar HTML al frame.
    async appendHtml(html) {
        let body = await this.getBody();
        body.append(html);
        this.prepareBody();
    }


    addMark(el) {
        
        $(el).hover(function(){
            $(this).addClass('selector')
            }, function(){
            $(this).removeClass('selector');
        });
    }

}

export { FrameEditor as default };