/*import *  as firebase from 'firebase';
import database from '/const.js';*/
/*var config = {
  apiKey: "AIzaSyBJ4dfma4MgQvIjMJwJUp3U5KOKYm_4OFs",
  authDomain: "combinacionespdf.firebaseapp.com",
  databaseURL: "https://combinacionespdf.firebaseio.com",
  projectId: "combinacionespdf",
  storageBucket: "combinacionespdf.appspot.com",
  messagingSenderId: "657783964881"
};
firebase.initializeApp(config);

const database = firebase.database();*/

PDFJS.workerSrc = 'build/pdf.worker.js';
TmpPath=[];
PDF_URL=[];
$(document).ready(function() {
  // Escuchamos el evento 'change' del input donde cargamos el archivo
  $(document).on('change', 'input[type=file]', function(e) {
    // Obtenemos la ruta temporal mediante el evento
    tamanio = this.files.length;//cantidad de elementos seleccionados

  for(var i = 0; i < tamanio; i++)
   {
   TmpPath[i] = URL.createObjectURL(e.target.files[i]);
    // Mostramos la ruta temporal
    PDF_URL[i]= TmpPath[i];// URL del archivo PDF
  }
});

});




  function Cargar(){
    for(var i = 0; i <tamanio; i++)
{
  PDF_url = PDF_URL[i];
    //visualizar el PDF
  /*var loadingTask = PDFJS.getDocument(PDF_url);
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
  });*/


      /////////////////////////////

    //Extraer datos del PDF
    PDFJS.getDocument(PDF_url).then(function (PDFInstancia) {

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

          var textItems = textContent.items;
          var combinaciones = [];//arreglo donde se guadan las combinaciones obtenidas
          var cont = 0;
          var  lista = "";


            for (var i = 0; i < textItems.length; i++) {

                var item = textItems[i];
                var item2 = textItems[i-1];
                var item3 = textItems[i+2];

                var reExp = /\w\s+\w\s+\w\s+\w\s+\w/;
                var reExpSorteo = /\b\d{5}\b/;
                var reExpFecha= /[A-Za-zÉÁ]{3}\s\d{2}/;
                var reExpEspacios = /\b\s*\s*\s*\s*/;
                var reExpNue = /\w\w\w\w\w/;

                var Sorteo= reExpSorteo.test(item.str);//Valida si es numero de Sorteo
                var Fecha = reExpFecha.test(item.str);//valida Si es Fecha
                var ok = reExp.test(item.str);//valida si es o no una combinacion


                if(Sorteo){

                  console.log("Sorteo: " + item.str + "\n");
                  sorteo = item.str;

                  }

                if(Fecha){

                  fechaSorteo = item.str;
                  console.log("Fecha: " + item.str + "\n");

                }

                if(ok){

                  modalidad = item2.str;
                  combinacion = item.str;
                  cantidadApostada = item3.str;
                  tipo = 1;
                  ganado = false;
                  cantidadGanada=0;
                  combinacion= item.str.replace(/ /g, "");
                  modalidad = tipoNum(modalidad);

                  dia = fechaSorteo.substring(4, 6);
                  mes= fechaSorteo.substring(7, 10);
                  mes = mesNumero(mes);
                  mes -= 1;
                  anio= fechaSorteo.substring(12, 16);

                  //sorteo, combinacion, cantidadApostada, cantidadganada, modalidad, ganado

                  combinaciones[cont]={ cantidadApostada, cantidadGanada, tipo, ganado, combinacion, sorteo, modalidad, dia, mes, anio}



                  //subir(combinaciones[cont])

                  cont ++;
                      }

                }
                document.getElementById("parrafo").innerHTML = "Archivos Cargados";
                mostrar();
                console.log("Combinaciones: \n");
                console.log(dia + "/" + mes + "/" + anio);
                for(var i = 0; i < combinaciones.length; i++){

                  console.log( combinaciones[i]);

              }
            });

        });

    });

}

function mesNumero(mes){
  salir = true;
  while(salir == true){
    switch (mes) {
      case "ENE": salir = false;
      return 1;
      break;
      case "FEB": salir = false;
      return 2;
      break;
      case "MAR": salir = false;
      return 3;
      break;
      case "ABR": salir = false;
      return 4;
      break;
      case "MAY": salir = false;
      return 5;
      break;
      case "JUN": salir = false;
      return 6;
      break;
      case "JUL": salir = false;
      return 7;
      break;
      case "AGO": salir = false;
      return 8;
      break;
      case "SEP": salir = false;
      return 9;
      break;
      case "OCT": salir = false;
      return 10;
      break;
      case "NOV": salir = false;
      return 11;
      break;
      case "DIC": salir = false;
      return 12;
      break;

      default: return mes;
      break;

    }
  }
}

function tipoNum(tipo){
  salir = true;
  while(salir == true){
    switch (tipo) {
      case "DIRECTA 5": salir = false;
      return 1;
      break;
      case "DIRECTA 4": salir = false;
      return 2;
      break;
      case "DIRECTA 3": salir = false;
      return 3;
      break;
      case "PAR INICIAL": salir = false;
      return 4;
      break;
      case "PAR FINAL": salir = false;
      return 5;
      break;
      case "INICIAL": salir = false;
      return 6;
      break;
      case "FINAL": salir = false;
      return 7;
      break;

      default: return tipo;
      break;
}

}
}

function mostrar(){
document.getElementById('oculto').style.display = 'block';}

/*function subir(arreglo){
axios.post('http://localhost:4000/evento',
{
  sorteo:arreglo.sorteo,
  combinacion: arreglo.combinacion,
  cantidadApostada: arreglo.cantidadApostada,
  cantidadGanada: arreglo.CantidadGanada,
  tipo: arreglo.tipo,
  modalidad: arreglo.modalidad,
  ganado: arreglo.ganado,
  dia: arreglo.dia,
  mes: arreglo.mes,
  anio:arreglo.anio
}).then(res =>{
  alert(res.data);
})

}*/ }
}
