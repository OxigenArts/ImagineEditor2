var carpeta = new Array();
var archivo = new Array();

function crearCarpeta(){
    var x = $("#carpeta").val();
    carpeta.push(x);
    $("#carpeta").val('');
    return carpeta;
}

function crearArchivo(){
    var x = $("#archivo").val();
    archivo.push(x);
    $("#archivo").val('');
    return archivo;
}
var carpeta = crearCarpeta();
    var archivo = crearArchivo();
function zip(){
    
    
        var zip = new JSZip();
        if(carpeta.length>0){
            for(var car of carpeta){
            var img = zip.folder(car,"");
        }
        if(archivo.length>0){
            for(var ar of archivo){
            var img = zip.file(ar,"");
        }
   }
       if(carpeta.length>1 || archivo.length>1){
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
        });
          carpeta = {};
           archivo = {};
          }
         
}
    }