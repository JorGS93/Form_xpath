var formElement=null;
var numeroSecreto=null;
var numeroSecreto1=null;
var respuestaSelect0=null;
var respuestaSelect1=null;
var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];
var respuestasRadio1 = [];
var respuestasRadio2 = [];
var respuestaSelectMultiple= [];
var respuestaSelectMultiple1= [];
var respuestaRadio=null;
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   if (comprobar()){
    document.getElementsByClassName('hola')[0].style.display = "block";
   corregirNumber();
   corregirNumber1();
   corregirSelect0();
   corregirSelect1();
   corregirCheckbox();
   corregirCheckbox1();
   corregirRadio();
   corregirRadio2();
   presentarNota(); 
 

   }
   return false;
 }
 
 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "https://rawgit.com/JorGS93/Formulario/master/xml/Preguntas.xml", true);
 xhttp.send();
}

//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //NUMBER quiero que sea text
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput=xmlDoc.getElementsByTagName("title")[2].innerHTML;
 ponerDatosInputHtml(tituloInput);
 numeroSecreto=xmlDoc.getElementById("jbo003").getElementsByTagName("answer")[0].innerHTML;

// text1
  var tituloInput1=xmlDoc.getElementsByTagName("title")[3].innerHTML;
 ponerDatosInputHtml1(tituloInput1);
 numeroSecreto1=xmlDoc.getElementById("jbo004").getElementsByTagName("answer")[0].innerHTML;
 
 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect2=xmlDoc.getElementsByTagName("title")[8].innerHTML;
 var xpath="/questions/question[@id='jbo009']/option";
 var nodesSelect2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

 ponerDatosSelectHtml1(tituloSelect2,nodesSelect2);
 respuestaSelect1=xmlDoc.getElementById("jbo009").getElementsByTagName("answer")[0].innerHTML;


 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta

 var tituloSelect1=xmlDoc.getElementsByTagName("title")[9].innerHTML;
 var xpath="/questions/question[@id='jbo010']/option";
 var nodesSelect1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

 ponerDatosSelectHtml(tituloSelect1,nodesSelect1);
 respuestaSelect0=xmlDoc.getElementById("jbo010").getElementsByTagName("answer")[0].innerHTML;



 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
   var tituloCheckbox0 = xmlDoc.getElementsByTagName("title")[0].innerHTML;
 var xpath="/questions/question[@id='jbo001']/option";
var nodesCheckbox0 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 
 ponerDatosCheckboxHtml(tituloCheckbox0,nodesCheckbox0);
 var nres = xmlDoc.getElementById('jbo001').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById('jbo001').getElementsByTagName("answer")[i].innerHTML;
 }




//CHECKBOX1
var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var xpath="/questions/question[@id='jbo002']/option";
var nodesCheckbox1 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 
 ponerDatosCheckboxHtml1(tituloCheckbox1,nodesCheckbox1);
 var nres = xmlDoc.getElementById('jbo002').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox2[i]=xmlDoc.getElementById('jbo002').getElementsByTagName("answer")[i].innerHTML;
 }
//SELECT multiple
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 //SELECT MULTIPLE
var tituloSelectM=xmlDoc.getElementsByTagName("title")[4].innerHTML;
var xpath="/questions/question[@id='jbo005']/option";
var nodesMultiple= xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
ponerDatosSelectMultipleHtml(tituloSelectM,nodesMultiple);
 var nopt = xmlDoc.getElementById("jbo005").getElementsByTagName('option').length;
for(i=0; i < nopt; i++){
respuestaSelectMultiple=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);
}

//SELECT MULTIPLE2
var tituloSelectM1=xmlDoc.getElementsByTagName("title")[5].innerHTML;
var xpath="/questions/question[@id='jbo006']/option";
var nodesMultiple1= xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
ponerDatosSelectMultipleHtml1(tituloSelectM1,nodesMultiple1);
 var nopt = xmlDoc.getElementById("jbo006").getElementsByTagName('option').length;
for(i=0; i < nopt; i++){
respuestaSelectMultiple1=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);
}

 var tituloRadio = xmlDoc.getElementsByTagName("title")[6].innerHTML;
 var xpath="/questions/question[@id='jbo007']/option";
var nodesCheckbox = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 
 ponerDatosRadioHtml(tituloRadio,nodesCheckbox);
 var nres = xmlDoc.getElementById('jbo007').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio1[i]=xmlDoc.getElementById('jbo007').getElementsByTagName("answer")[i].innerHTML;
 }


//RADIO2
var tituloRadio2 = xmlDoc.getElementsByTagName("title")[7].innerHTML;
 var xpath="/questions/question[@id='jbo008']/option";
var nodesCheckbox2 = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
 
 ponerDatosRadioHtml2(tituloRadio2,nodesCheckbox2);
 var nres = xmlDoc.getElementById('jbo008').getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio2[i]=xmlDoc.getElementById('jbo008').getElementsByTagName("answer")[i].innerHTML;
 }

}

//****************************************************************************************************
//implementación de la corrección

function corregirNumber(){
  var s=formElement.elements[0].value;     
  if (s==numeroSecreto) {
   darRespuestaHtml("Pregunta 1: Exacto!");
   nota +=1;
  }
  else {
    if (s>numeroSecreto) darRespuestaHtml("Pregunta 1: Te has pasado");
    else darRespuestaHtml("Pregunta 1: Te has quedado corto");
  }
}

function corregirNumber1(){
  var s=formElement.elements[1].value;     
  if (s==numeroSecreto1) {
   darRespuestaHtml("Pregunta 2: Exacto!");
   nota +=1;
  }
  else {
    if (s>numeroSecreto1) darRespuestaHtml("Pregunta 2: Te has pasado");
    else darRespuestaHtml("Pregunta 2: Te has quedado corto");
  }
}

function corregirSelect0(){
  var sel = formElement.elements[2];  
  if (sel.selectedIndex==respuestaSelect0) {
   darRespuestaHtml("Pregunta 3: Correcto");
   nota +=1;
  }
  else darRespuestaHtml("Pregunta 3: Incorrecto");
}

function corregirSelect1(){
  var sel = formElement.elements[3];  
  if (sel.selectedIndex==respuestaSelect1) {
   darRespuestaHtml("Pregunta 4 : Correcto");
   nota +=1;
  }
  else darRespuestaHtml("Pregunta 4: Incorrecto");
}

function corregirCheckbox(){
  var contador=0;
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.jor.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.jor[i].checked){
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
   } 
  }
  for (i = 0; i < f.jor.length; i++) {   
   if (f.jor[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     contador++;
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
    }   
   }
  }
  if(contador==2){
    darRespuestaHtml("Pregunta 5: correcta");    
  }else{
    darRespuestaHtml("Pregunta 5: incorrecta");  
  }
}


function corregirCheckbox1(){
  var cont=0;
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.FLOR.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.FLOR[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox2.length; j++) {
     if (i==respuestasCheckbox2[j]) escorrecta[i]=true;
    }
   } 
  }
  for (i = 0; i < f.FLOR.length; i++) {   
   if (f.FLOR[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas      
     cont++;
    } else {
     nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
    }   
   }
  }
    if(cont==2){
    darRespuestaHtml("Pregunta 6: correcta");    
  }else{
    darRespuestaHtml("Pregunta 6: incorrecta");  
  }
}




function corregirRadio(){
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadio1.length; j++) {
     if (i==respuestasRadio1[j]) escorrecta[i]=true;
    }
   } 
  }
  for (i = 0; i < f.color.length; i++) {   
   if (f.color[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasRadio1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 7: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasRadio1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 7: "+i+" incorrecta");
    }   
   }
  }
}


function corregirRadio2(){
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.POKEMON.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.POKEMON[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasRadio2.length; j++) {
     if (i==respuestasRadio2[j]) escorrecta[i]=true;
    }
   } 
  }
  for (i = 0; i < f.POKEMON.length; i++) {   
   if (f.POKEMON[i].checked) {
    if (escorrecta[i]) {
     nota +=1.0/respuestasRadio2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 8: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasRadio2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 8: "+i+" incorrecta");
    }   
   }
  }
}


//****************************************************************************************************
// poner los datos recibidos en el HTML
//text
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
}
//text1
function ponerDatosInputHtml1(t){
 document.getElementById("tituloInput1").innerHTML = t;
}

//selectMultiple
function ponerDatosSelectMultipleHtml(t,nodes){
  document.getElementById("tituloSelectMultiple").innerHTML=t;
  var select = document.getElementsByTagName("select")[2];// opciones
  var result = nodes.iterateNext();
  var i=0;
 while(result){ 
    var option = document.createElement("option");
    option.text = result.innerHTML;
    option.value=i+1;i++;
    select.options.add(option);
    result = nodes.iterateNext();
 }  
}

//selecctmultiple1
function ponerDatosSelectMultipleHtml1(t,nodes){
  document.getElementById("tituloSelectMultiple1").innerHTML=t;
  var select = document.getElementsByTagName("select")[3];// opciones
  var result = nodes.iterateNext();
  var i=0;
 while(result){ 
    var option = document.createElement("option");
    option.text = result.innerHTML;
    option.value=i+1;i++;
    select.options.add(option);
    result = nodes.iterateNext();
 }  
}

//select
function ponerDatosSelectHtml(t,nodes){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  var result = nodes.iterateNext();
  var i=0;
  while (result) {
   var option = document.createElement("option");
   option.text = result.innerHTML;
   option.value=i+1; i++;
   select.options.add(option);
   result = nodes.iterateNext();
  }  
}

function ponerDatosSelectHtml1(t,nodes){
  document.getElementById("tituloSelect1").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];
  var result = nodes.iterateNext();
  var i=0;
  while (result) {
   var option = document.createElement("option");
   option.text = result.innerHTML;
   option.value=i+1; i++;
   select.options.add(option);
   result = nodes.iterateNext();
  }  
}
//select


//
function ponerDatosCheckboxHtml1(t,nodes){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
  var result = nodes.iterateNext();
  i=0;
  while (result) {
   var input = document.createElement("input");
   var label = document.createElement("label");   
   label.innerHTML = result.innerHTML
   label.setAttribute("for", "jor_"+i);
   input.type="checkbox";
   input.name="jor";
   input.id="jor_"+i; i++;
   checkboxContainer.appendChild(input);
   checkboxContainer.appendChild(label);
   checkboxContainer.appendChild(document.createElement("br"));
   result = nodes.iterateNext();
  }    
}

//checkbox1
function ponerDatosCheckboxHtml(t,nodes){
 var checkboxContainer=document.getElementById('checkboxDiv1');
 document.getElementById('tituloCheckbox1').innerHTML = t;
  var result = nodes.iterateNext();
  i=0;
  while (result) {
   var input = document.createElement("input");
   var label = document.createElement("label");   
   label.innerHTML = result.innerHTML
   label.setAttribute("for", "FLOR_"+i);
   input.type="checkbox";
   input.name="FLOR";
   input.id="FLOR_"+i; i++;
   checkboxContainer.appendChild(input);
   checkboxContainer.appendChild(label);
   checkboxContainer.appendChild(document.createElement("br"));
   result = nodes.iterateNext();
  }    
}



function ponerDatosRadioHtml(t,nodes){
 var checkboxContainer=document.getElementById('checkboxDiv2');
 document.getElementById('tituloRadio').innerHTML = t;
  var result = nodes.iterateNext();
  i=0;
  while (result) {
   var input = document.createElement("input");
   var label = document.createElement("label");   
   label.innerHTML = result.innerHTML
   label.setAttribute("for", "color_"+i);
   input.type="radio";
   input.name="color";
   input.id="color_"+i; i++;
   checkboxContainer.appendChild(input);
   checkboxContainer.appendChild(label);
   checkboxContainer.appendChild(document.createElement("br"));
   result = nodes.iterateNext();
  }    
}

function ponerDatosRadioHtml2(t,nodes){
 var checkboxContainer=document.getElementById('checkboxDiv3');
 document.getElementById('tituloRadio1').innerHTML = t;
  var result = nodes.iterateNext();
  i=0;
  while (result) {
   var input = document.createElement("input");
   var label = document.createElement("label");   
   label.innerHTML = result.innerHTML
   label.setAttribute("for", "POKEMON_"+i);
   input.type="radio";
   input.name="POKEMON";
   input.id="POKEMON_"+i; i++;
   checkboxContainer.appendChild(input);
   checkboxContainer.appendChild(label);
   checkboxContainer.appendChild(document.createElement("br"));
   result = nodes.iterateNext();
  }    
}


//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 10");
  
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}


function comprobar(){
   var f=formElement;
   var checked=false;
   var checked1=false;
   var checked2=false;
   var checked3=false;

   for (i = 0; i < f.jor.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.jor[i].checked) checked=true;
   }

      for (i = 0; i < f.FLOR.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.FLOR[i].checked) checked1=true;
   }

   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) checked2=true;
   }

      for (i = 0; i < f.POKEMON.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.POKEMON[i].checked) checked3=true;
   }

   if (f.elements[0].value=="") {
    //recomendamos focus para input y select "normal", scrollIntoView para el título de select múltiple, radio y checkbox
    f.elements[0].focus(); 
    alert("Escribe tu respuesta");
    return false;
  }if (f.elements[1].value=="") {
    //recomendamos focus para input y select "normal", scrollIntoView para el título de select múltiple, radio y checkbox
    f.elements[1].focus(); 
    alert("Escribe tu respuesta");
    return false;
 
   } 
    if (!checked) {    
    document.getElementsByTagName("h3")[2].scrollIntoView();
    alert("Selecciona una opción del checkbox");
    return false;
   }


    if (!checked1) {    
    document.getElementsByTagName("h3")[3].scrollIntoView();
    alert("Selecciona una opción del checkbox");
    return false;
   } 


    if (!checked2) {    
    document.getElementsByTagName("h3")[8].scrollIntoView();
    alert("Selecciona una opción de radio");
    return false;
   } 


    if (!checked3) {    
    document.getElementsByTagName("h3")[9].scrollIntoView();
    alert("Selecciona una opción de radio");
    return false;
   }else return true;


}