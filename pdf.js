PDFJS.workerSrc = 'build/pdf.worker.js';

$(document).ready(function() {

  // Escuchamos el evento 'change' del input donde cargamos el archivo
  $(document).on('change', 'input[type=file]', function(e) {
    // Obtenemos la ruta temporal mediante el evento
    var TmpPath = URL.createObjectURL(e.target.files[0]);
    // Mostramos la ruta temporal
    PDF_URL= TmpPath;
  /*  $('span').html(TmpPath);
    $('img').attr('src', TmpPath);*/
  });

});

//PDF_URL = document.getElementById('file-input');

function Cargar(){
  var loadingTask = PDFJS.getDocument(PDF_URL);
  loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');

    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function(page) {
      console.log('Page loaded');

      var scale = 1.5;
      var viewport = page.getViewport(scale);

      // Prepare canvas using PDF page dimensions
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
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });

  PDFJS.getDocument(PDF_URL).then(function (PDFInstancia) {

var totalpaginas = PDFInstancia.pdfInfo.numPaginas;
console.log(totalpaginas);
var numeroPagina = 1;

obtenerPagina(numeroPagina, PDFInstancia).then(function(textPage){
  console.log(textPage);
});
  },
   function (reason) {
      console.error(reason);
  });
//}


function obtenerPagina(numeroPagina, PDFInstancia) {

    return new Promise(function (resolve, reject) {
        PDFInstancia.getPage(numeroPagina).then(function (pdfPage) {

            pdfPage.getTextContent().then(function (textContent) {
                var textItems = textContent.items;
                var final = "";

                for (var i = 0; i < textItems.length; i++) {
                    var i = textItems[i];

                    final += item.str + " ";
                }
                console.log(final);
                resolve(final);
            });
        });
    });
}

}
