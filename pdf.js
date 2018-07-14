PDFJS.workerSrc = 'build/pdf.worker.js';

$(document).ready(function() {

  // Escuchamos el evento 'change' del input donde cargamos el archivo
  $(document).on('change', 'input[type=file]', function(e) {
    // Obtenemos la ruta temporal mediante el evento
    var TmpPath = URL.createObjectURL(e.target.files[0]);
    // Mostramos la ruta temporal
    PDF_URL= TmpPath;// URL del archivo PDF
  });

});



  function Cargar(){

    //visualizar el PDF
    var loadingTask = PDFJS.getDocument(PDF_URL);
    loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');

    // Fetch the first page
    var pageNumber = 1;

    pdf.getPage(pageNumber).then(function(page) {

    var scale = 1.5;
    var viewport = page.getViewport(scale);
    var canvas = document.getElementById('the-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
    canvasContext: context,
    viewport: viewport
    };

    var renderTask = page.render(renderContext);
    renderTask.then(function () {
    console.log('Page rendered');
    });
  });
},
    function (reason) {
    // PDF loading error
    console.error(reason);
  });

    //Extraer datos del PDF
    PDFJS.getDocument(PDF_URL).then(function (PDFInstancia) {

    var totalpaginas = PDFInstancia.pdfInfo.numPaginas;
    var numeroPagina = 1;

    obtenerPagina(numeroPagina, PDFInstancia).then(function(textPage){

        console.log(textPage);
});
  },
    function (reason) {

      console.error(reason);

      });



    function obtenerPagina(numeroPagina, PDFInstancia) {

    return new Promise(function (resolve, reject) {

      PDFInstancia.getPage(numeroPagina).then(function (pdfPage) {

      pdfPage.getTextContent().then(function (textContent) {

        function datosCombinacion( fecha, sorteo, tipo, combinacion, cantidad){

          this.fecha = "";
          this.sorteo = "";
          this.tipo = "";
          this.combinacion = "";
          this.cantidad = "";

        }

        function mostrar(o){

          var objetoAInspeccionar;
          var resultado = [];

          for(objetoAInspeccionar = o; objetoAInspeccionar !== null; objetoAInspeccionar = Object.getPrototypeOf(objetoAInspeccionar)){
          resultado = resultado.concat(Object.getOwnPropertyNames(objetoAInspeccionar)) + "\n";
          }

          return resultado;

        }
          var textItems = textContent.items;
          var combinaciones = [];//arreglo donde se guadan las combinaciones obtenidas
          var cont = 0;
          var columna = 0;

            for (var i = 0; i < textItems.length; i++) {

                var item = textItems[i];
                var item2 = textItems[i-1];
                var item3 = textItems[i+2];

                var reExp = /\w\s+\w\s+\w\s+\w\s+\w/;
                var reExpSorteo = /\b\d{5}\b/;
                var reExpFecha= /\w{3}\s\d{2}/;

                var Sorteo= reExpSorteo.test(item.str);//Valida si es numero de Sorteo
                var Fecha = reExpFecha.test(item.str);//valida Si es Fecha
                var ok = reExp.test(item.str);//valida si es o no una combinacion


                if(Sorteo){

                  console.log("Sorteo: " + item.str + "\n");
                  numSorteo = item.str;

                  }

                if(Fecha){

                  fechaSorteo = item.str;
                  console.log("Fecha: " + item.str + "\n");

                }

                if(ok){

                  tipoCombinacion = item2.str;
                  combinacion = item.str;
                  cantidad = item3.str;

                  combinaciones[cont]={ cantidad, combinacion, fechaSorteo, numSorteo, tipoCombinacion}

                  cont ++;

                      }

                }

                console.log("Combinaciones: \n");

                for(var i = 0; i < combinaciones.length; i++){

                  console.log( combinaciones[i]);

              }
            });

        });

    });

}

}
