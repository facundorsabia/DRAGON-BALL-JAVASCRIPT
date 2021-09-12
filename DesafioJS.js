//Declaracion de Personajes (Objetos)

class Personaje{
    constructor(nombre, raza, procedencia, transformacion, salud, fuerza, velocidad, imgsrc, defeated){
        this.nombre = nombre;
        this.raza = raza;
        this.procedencia = procedencia;
        this.transformacion = transformacion;
        this.salud = salud;
        this.fuerza = fuerza;
        this.velocidad = velocidad;
        this.imgsrc = imgsrc;
        this.defeated = defeated;
    }
    hablar(){
      $("#elegir").remove();
      $("#pantalla2").append(`<div class="button__card choose"><p class='parrafo'> ${this.nombre} : Gracias por elegirme. La raza ${this.raza} es la más poderosa de la Galaxia. Luchemos contra todos los enemigos para demostrarlo.</p><button class='draw' onclick='mostrarPantalla2b()'>CONTINUAR</button></div>`);
    }
}


const Goku = new Personaje ("Goku", "Saiyajin", "el planeta Vegeta", "Super Saiyajin", 85, 100, 90, "img/goku.png", "img/GokuDefeated.png" );

const Piccolo = new Personaje ("Piccolo", "Namekiano", "el planeta Namekusei", "Gran Namekiano", 80, 80, 80, "img/piccolo.png");

const Krilin = new Personaje ("Krilin", "Terrícola", "el planeta tierra", "un terrícola Sin Ego", 70, 80, 70, "img/krilin.png")

const Gohan = new Personaje ("Gohan", "Saiyajin", "el planeta tierra", "Super Saiyajin", 60, 70, 60, "img/gohan.png");

const Vegeta = new Personaje ("Vegeta", "Sayajin", "el planeta Vegeta", "Super Saiyajin", 80, 85, 80 )

const Freezer = new Personaje ("Freezer", "ciborg mutante", "el Universo 7", "mi forma definitiva", 100, 85, 95);

const Cell = new Personaje ("Cell", "bioandroide", "el Laboratorio de Gero", "una forma superperfecta", 100, 85, 90);


//Declaración de Array de Pesonajes (Objetos)

const Personajes = [Goku, Freezer, Piccolo, Krilin, Gohan, Cell];

const Heroes = [Goku, Piccolo, Krilin, Gohan];


//INICIO del Juego: bienvenida y comienzo de la música.

let pantalla1 = document.getElementById("pantalla1");

let btnJugar = document.getElementById("btnJugar");


let audio = document.getElementById("audio");
const volume = document.querySelector("audio").volume;
document.querySelector("audio").volume = 0.6;

let btnSound = document.getElementById("btnSound");

btnJugar.addEventListener("click", bienvenida);

function bienvenida(){
  btnSound.play();
  audio.play();
  pantalla1.removeChild(btnJugar);
  let cartel = document.createElement("div");
  cartel.innerHTML = `<a class='button__card choose'><p class='parrafo'>Bienvenido al juego de lucha de Dragon Ball.</p>
                                    <p class='parrafo'>Elige un personaje para derrotar a todos los enemigos y ser el luchador más fuerte de la galaxia. </p>
                                    <button class='draw' onclick='mostrarPantalla2()'>CONTINUAR</button></a>`;
  pantalla1.appendChild(cartel);
}


//CAMBIO de Pantalla 1 (bienvenida) a Pantalla 2 (elección del personaje).

let pantalla2 = document.getElementById("pantalla2");

function mostrarPantalla2(){
  background.classList.remove("background");
  background.classList.add("backgroundBattle");
  btnSound.play();
  document.getElementById('pantalla1').style.display = 'none';
  document.getElementById('pantalla2').style.display = 'block';
}

//Generación de cartas que contienen a los Héroes recorriendo un array de objetos.

let cardContainer = document.getElementById("cardContainer");

for (const Personaje of Heroes){
  let div = document.createElement("div");
  div.innerHTML = ` <div class="b-game-card" id="${Personaje.nombre}">
                    <div class="b-game-card__cover" style="background-image: url(${Personaje.imgsrc});"></div>
                    </div>`;
  
  cardContainer.appendChild(div);
}


//Obtención de características de los personajes mediante AJAX & Jquery

$.ajax({
  type: 'GET',
  url: 'Personajes.json',
  dataType: 'json',
  success: function(data) {
    console.log(JSON.stringify(data));
    info = data;
  }
});


//Elección del Personaje mediante Eventos click utilizando Jquery. Cada elección dispara una cantidad de variables distintas en todas las pantallas (imágenes, nombres, diálogos).

let player1 = document.getElementById("player1");

$("#Goku").click ( function () {
  btnSound.play();
  Goku.hablar();
  $(".cardSection").remove();
  $("#pantalla2").prepend(`<div><img src="img/gokuOk.png" style="display:none" id=gokuOk><div>`);  //Variación de la imagen principal del personaje durante la lucha
  $("#gokuOk").fadeIn();
  $("#Especial").text(info[0]['habilidades'][0]);   //Asigno características desde el JSON estático mediante la llamada con AJAX
  $("#Mortal").text(info[0]['habilidades'][1]); 
  $("#player1Tele").attr("src", "img/gokuTele.png"); //Variación de las imagenes de lucha .
  $("#player1Atk").attr("src", "img/gokuAtk.png");
  $("#player1AtkSp").attr("src", "img/gokuAtkSp.png");
  $("#player1Grey").attr("src", "img/gokuGrey.png");
  $("#player1Defeated").attr("src", "img/GokuDefeated.png");
  player1.setAttribute("src", "img/goku2.png");
  personajeElegido = "Goku";
  $('#playerName').append(`<p class="healthNamePlayer1">GOKU</p>`); //Variación del nombre de la barra de salud.
});


$("#Piccolo").click ( function (){
  btnSound.play();
  Piccolo.hablar();
  $(".cardSection").remove();
  $("#pantalla2").prepend(`<div><img src="img/piccoloOk.png" style="display:none" id=piccoloOk><div>`);
  $("#piccoloOk").fadeIn();
  $("#Especial").text(info[1]['habilidades'][4]);   
  $("#Mortal").text(info[1]['habilidades'][5]); 
  $("#player1Tele").attr("src", "img/piccoloTele.png");
  $("#player1Atk").attr("src", "img/piccoloAtk.png");
  $("#player1AtkSp").attr("src", "img/piccoloAtkSp.png");
  $("#player1Grey").attr("src", "img/piccoloGrey.png");
  $("#player1Defeated").attr("src", "img/piccoloDefeated.png");
  player1.setAttribute("src", "img/piccoloFight.png");
  personajeElegido = "Picollo";
  $('#playerName').append(`<p class="healthNamePlayer1">PICCOLO</p>`);
});

$("#Krilin").click ( function (){
  btnSound.play();
  Krilin.hablar();
  $(".cardSection").remove();
  $("#pantalla2").prepend(`<div><img src="img/krilinOk.png" style="display:none" id=krilinOk><div>`);
  $("#krilinOk").fadeIn();
  $("#Especial").text(info[2]['habilidades'][1]);  
  $("#Mortal").text(info[2]['habilidades'][2]); 
  $(".player1").css("transform", "translateY(79px)")
  $("#player1Tele").attr("src", "img/krilinTele.png");
  $("#player1Atk").attr("src", "img/krilinAtk.png");
  $("#player1AtkSp").attr("src", "img/krilinAtkSp.png");
  $("#player1Grey").attr("src", "img/krilinGrey.png");
  $("#player1Defeated").attr("src", "img/krillinDefeated.png");
  player1.setAttribute("src", "img/krilin2.png");
  personajeElegido = "Krillin";
  $('#playerName').append(`<p class="healthNamePlayer1">KRILLIN</p>`);
});

$("#Gohan").click ( function (){
  btnSound.play();
  Gohan.hablar();
  $(".cardSection").remove();
  $("#pantalla2").prepend(`<div><img src="img/gohanOk.png" style="display:none" id=gohanOk><div>`);
  $("#gohanOk").fadeIn();
  $("#Especial").text(info[3]['habilidades'][2]); 
  $("#Mortal").text(info[3]['habilidades'][0]); 
  $("#player1Tele").attr("src", "img/gohanTele.png");
  $("#player1Tele").css("width", "50%");
  $("#player1Atk").attr("src", "img/gohanAtk.png");
  $("#player1Atk").css("width", "50%");
  $("#player1AtkSp").attr("src", "img/gohanAtkSp.png");
  $("#player1AtkSp").css("width", "50%");
  $("#player1Grey").attr("src", "img/gohanGrey.png");
  $("#player1Grey").css("width", "50%");
  $("#player1Defeated").attr("src", "img/GohanDefeated.png");
  player1.setAttribute("src", "img/gohanFight.png");
  player1.style.width="50%";
  personajeElegido = "Gohan";
  $('#playerName').append(`<p class="healthNamePlayer1">GOHAN</p>`);
});


// Cambio de Pantalla 2 a Pantalla 2.2 (presentación del enemigo)

let pantalla2b = document.getElementById("pantalla2b");

function mostrarPantalla2b(){
  $("#pantalla2b").prepend(`<div><img src="img/vegeta1.png" style="display:none" id=vegeta1><div>`);
  btnSound.play();
  document.getElementById('pantalla2').style.display = 'none';
  document.getElementById('pantalla2b').style.display = 'block';
  $("#vegeta1").fadeIn("fast");
  let cartelFinal = document.createElement("div");
  cartelFinal.innerHTML = `<a class='button__card'><p class='parrafo'>VEGETA</p>
                                    <p class='parrafo'>Te aplastaré como un insecto, eres una inmundicia inservible. Prepárate para morir.</p>
                                    <button class='draw' onclick='mostrarPantalla3()'>CONTINUAR</button></a>`;
  pantalla2b.appendChild(cartelFinal);
}


//Cambio de Pantalla 2.2 a Pantalla 3 (escenario principal de lucha)

// Declaración de las barras de salud (objetos) que se actualizan según los golpes recibidos.

class ProgressBar{
  constructor (element, initialValue = 100 ) {
    this.valueElem = element.querySelector(".progress-bar-value");
    this.fillElem = element.querySelector(".progress-bar-fill");

    console.log(this.valueElem);
    console.log(this.fillElem);
    this.setValue(initialValue);
  }

  setValue (newValue) {
      if (newValue<=0){             //Condición para disparar el evento FIN DE LUCHA cuando alguna de las barras llegue a 0.
          if (healthEnemy<=0){      //Detecta si el enemigo ha sido derrotado
            enemyDefeated();       
          }else if (healthPlayer1<=0){ //Detecta si el usuario ha sido derrotado
            heroDefeated();
          }
        newValue = 0;
      }
      if (newValue>100){
        newValue = 100;
      }
      this.value = newValue;
      this.update();
  }
  update(){         //Actualiza la barra de salud (relleno de color y porcentaje de vida)
    const percentage = this.value + "%";

    this.fillElem.style.width = percentage;
    this.valueElem.textContent = percentage;
  }
}

const saludPlayer1 = new ProgressBar(document.querySelector("#saludPlayer1"), ); //Creación de la barra de salud del usuario
const saludPlayer2 = new ProgressBar (document.querySelector("#saludPlayer2"), ); //Creación de la barra de salud del enemigo



let background = document.getElementById("background");

function mostrarPantalla3 (){
  btnSound.play();
  $("#pantalla2b").hide();
  $("#pantalla3").show();
  $("#esquivar")[0].play();
  $("#player1Tele").fadeIn("fast").fadeOut("slow");
  $("#player1").fadeIn("fast");
  $("#vegetaTele").fadeIn("fast").fadeOut("slow");
  $("#vegeta").fadeIn("fast");
} 

  //BATALLA

  //Funcion para generar aleatoriedad entre dos numeros 
  function numeroAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }


  let batttle1 = document.getElementById("battle1");

  let luchar = document.getElementById("luchar");
  
  luchar.addEventListener("click", comenzarBatalla);

  function comenzarBatalla(){
    btnSound.play();
    battle1.style.display="none";
    let battle = document.createElement("div");
    battle.innerHTML = `<a class='button__card choose' id='battle'> <p class='parrafo'> ${personajeElegido.toUpperCase()} VS VEGETA</p>                  
                          <p class='parrafo'>Los golpes simples quitan 10% de salud y no pueden ser esquivados<br> Los golpes especiales quitan 20% de salud pero pueden ser esquivados.<br> Los golpes mortales son los más poderosos, sacan 30% de salud, pero hay muchas posibilidades de que sea esquivado.</p>                    
                          <button class='draw' onclick='mostrarAtkBtn()'>CONTINUAR</button></a>`;
   pantalla3.appendChild(battle);                       
  }


  let atkBtn = document.getElementById("atkBtn");

  function mostrarAtkBtn(){
    btnSound.play();
    battle.style.display="none";
    battle1.style.display="none";
    atkBtn.style.display="block";
  }

  let healthPlayer1 = 100;  //Asigno el valor inicial a la barra de salud del Usuario

  let healthEnemy = 100;   //Asigno el valor inicial a la barra de salud del Enemigo

  //EVENTOS GOLPES DEL USUARIO

  //Golpe Simple

  let golpeSimple = document.getElementById("golpeSimple");

  golpeSimple.addEventListener("click", golpearOponente);


  function golpearOponente(){
    $("#punch")[0].play();
    $("#battle1").hide();
    $("#player1").fadeOut("fast");
    $("#player1Atk").fadeIn("fast").fadeOut("slow");
    $("#player1").fadeIn("fast");
    $("#vegeta").fadeOut("fast");
    $("#vegetaGrey").fadeIn("fast").fadeOut("slow");
    $("#vegeta").fadeIn("fast");
    healthEnemy = healthEnemy - 10;     //Quitando 10 puntos a la salud del Enemigo
    saludPlayer2.setValue(healthEnemy); //Actualizando la barra de salud del Enemigo con el nuevo valor
    atkBtn.style.display="none";
    battle1.innerHTML = `<p class='parrafo'>Has golpeado a tu oponente y has reducido su salud 10 puntos.</p>
    <p class='parrafo'>Es el turno de Vegeta.</p>
    <button class='draw' onclick='golpearPlayer1()'>Aceptar</button>`;
    $("#battle1").delay(1000);
    $("#battle1").fadeIn("fast");
  }


  //Golpe Especial

  let golpeEspecial = document.getElementById("golpeEspecial");

  golpeEspecial.addEventListener("click", golpearOponenteFuerte);


  function golpearOponenteFuerte(){
    let azar = numeroAleatorio(1,2);  //Genero aleatoriedad para definir si el golpe será efectivo o será esquivado.
    
      if (azar == 1){
      $("#atkSpecial")[0].play();
      $("#battle1").hide();
      $("#player1").fadeOut("fast");
      $("#player1AtkSp").fadeIn("fast").fadeOut("slow");
      $("#player1").fadeIn("slow");
      $("#vegeta").fadeOut("fast");
      $("#vegetaGrey").fadeIn("fast").fadeOut("slow");
      $("#vegeta").fadeIn("fast");  
      healthEnemy = healthEnemy - 20;
      saludPlayer2.setValue(healthEnemy); 
      atkBtn.style.display="none";
      battle1.innerHTML = `<p class='parrafo'>Has golpeado a tu oponente con un Ataque Especial y has reducido su salud 20 puntos.</p>
      <p class='parrafo'>Es el turno de Vegeta.</p>
      <button class='draw' onclick='golpearPlayer1()'>Aceptar</button>`;
      $("#battle1").delay(1000);
      $("#battle1").fadeIn("fast");
      }
      else{
        $("#esquivar")[0].play();
        $("#battle1").hide();
        $("#vegeta").fadeOut("fast");
        $("#vegetaTele").fadeIn("fast").fadeOut("fast");
        $("#vegeta").fadeIn("fast");
        atkBtn.style.display="none";
        battle1.innerHTML = `<p class='parrafo'>Tu oponente ha esquivado el golpe.</p>
                              <p class='parrafo'>Es el turno de Vegeta.</p>
                              <button class='draw' onclick='golpearPlayer1()'>Aceptar</button>`;
        $("#battle1").delay(700);
        $("#battle1").fadeIn("fast");                              
      }
  }


//Golpe Mortal

let golpeMortal = document.getElementById("golpeMortal");

golpeMortal.addEventListener("click", aniquilarOponente);


function aniquilarOponente(){
  let azar = numeroAleatorio(1,3); //Aumento la aleatoriedad en el Golpe Mortal.
  
    if (azar == 1){
      $("#atkSpecial")[0].play();
      $("#battle1").hide();
      $(".light").fadeIn("fast");
      $(".backgroundBattleShake").fadeIn("slow");
      $(".light").fadeOut("fast");
      $(".backgroundBattleShake").fadeOut(3000);
      $("#player1").fadeOut("fast");
      $("#player1AtkSp").fadeIn("fast").fadeOut(2000);
      $("#player1").fadeIn("slow");
      $("#vegeta").fadeOut("fast");
      $("#vegetaGrey").fadeIn("slow").fadeOut(1700);
      $("#vegeta").fadeIn("fast");  
      healthEnemy = healthEnemy - 30;
      saludPlayer2.setValue(healthEnemy); 
      atkBtn.style.display="none";
      battle1.innerHTML = `<p class='parrafo'>Has golpeado a tu oponente con un Ataque Mortal y has reducido su salud 30%.</p>
      <p class='parrafo'>Es el turno de Vegeta.</p>
      <button class='draw' onclick='golpearPlayer1()'>Aceptar</button>`;
      $("#battle1").delay(1000);
      $("#battle1").fadeIn("fast");
    }
    else{
      $("#esquivar")[0].play();
      $("#battle1").hide();
      $("#vegeta").fadeOut("fast");
      $("#vegetaTele").fadeIn("fast").fadeOut("fast");
      $("#vegeta").fadeIn("fast");
      atkBtn.style.display="none";
      battle1.innerHTML = `<p class='parrafo'>Tu oponente ha esquivado el golpe.</p>
                            <p class='parrafo'>Es el turno de Vegeta.</p>
                            <button class='draw' onclick='golpearPlayer1()'>Aceptar</button>`;
      $("#battle1").delay(700);
      $("#battle1").fadeIn("fast");                      
    }
}





  //GOLPES DEL ENEMIGO

  function golpearPlayer1(){ 
    btnSound.play();
    let azar = numeroAleatorio(1,3);  //Genero aleatoriedad para definir qué tipo de ataque lanza el Enemigo 
    
    if(azar == 1){
        //Golpe Simple
        $("#battle1").hide();
        $("#punch")[0].play();
        $("#vegeta").fadeOut("fast");
        $("#vegetaAtk").fadeIn("fast").fadeOut("slow");
        $("#vegeta").fadeIn("fast");
        $("#player1").fadeOut("fast");
        $("#player1Grey").fadeIn("fast").fadeOut("slow");
        $("#player1").fadeIn("fast");
        healthPlayer1 = healthPlayer1 - 10;
        saludPlayer1.setValue(healthPlayer1);
        battle1.innerHTML = `<p class='parrafo'>Vegeta te ha golpeado con Golpe Simple y tu salud se redujo 10 puntos.</p>
        <p class='parrafo'>Tu turno.</p>
        <button class='draw' onclick='mostrarAtkBtn()'>Aceptar</button>`;
        $("#battle1").delay(900);
        $("#battle1").fadeIn("fast");
      

    }else if (azar == 2){ 

        //Golpe Especial
        let azar = numeroAleatorio(1,2);
          
          if (azar == 1){
          $("#battle1").hide();
          $("#atkSpecial")[0].play();
          $("#vegeta").fadeOut("fast");
          $("#vegetaAtkSp").fadeIn("fast").fadeOut("slow");
          $("#vegeta").fadeIn("fast");
          $("#player1").fadeOut("fast");
          $("#player1Grey").fadeIn("fast").fadeOut("fast");
          $("#player1").fadeIn("fast");
          healthPlayer1 = healthPlayer1 - 20;
          saludPlayer1.setValue(healthPlayer1); 
          battle1.innerHTML = `<p class='parrafo'>Vegeta te ha golpeado con un Ataque Especial y tu salud se redujo 20 puntos.</p>
          <p class='parrafo'>Tu turno.</p>
          <button class='draw' onclick='mostrarAtkBtn()'>Aceptar</button>`;           
          $("#battle1").delay(1000);
          $("#battle1").fadeIn("fast");           
          }
          else{
            $("#battle1").hide();
            $("#esquivar")[0].play();
            $("#player1").fadeOut("fast");
            $("#player1Tele").fadeIn("fast").fadeOut("fast");
            $("#player1").fadeIn("fast");
            atkBtn.style.display="none";
            battle1.innerHTML = `<p class='parrafo'>Vegeta ha intentado golpearte con Ataque Especial pero has esquivado el golpe.</p>
                                  <p class='parrafo'>Vuelve a atacar.</p>
                                  <button class='draw' onclick='mostrarAtkBtn()'>Aceptar</button>`;
            $("#battle1").delay(1000);
            $("#battle1").fadeIn("fast");                      
          
      }
    }else {
      //Golpe Mortal
      let azar = numeroAleatorio(1,3);
  
      if (azar == 1){
        $("#battle1").hide();
        $("#atkSpecial")[0].play();
        $(".light").fadeIn("fast");
        $(".backgroundBattleShake").fadeIn("slow");
        $(".light").fadeOut("fast");
        $(".backgroundBattleShake").fadeOut(3000);
        $("#battle1").hide();
        $("#vegeta").fadeOut("fast");
        $("#vegetaAtkSp").fadeIn("fast").fadeOut("slow");
        $("#vegeta").fadeIn("fast");
        $("#player1").fadeOut("fast");
        $("#player1Grey").fadeIn("slow").fadeOut("slow");
        $("#player1").fadeIn("fast");
        $("#battle1").fadeOut("fast");
        healthPlayer1 = healthPlayer1 - 30;
        saludPlayer1.setValue(healthPlayer1); 
        atkBtn.style.display="none";
        battle1.innerHTML = `<p class='parrafo'>Vegeta te ha golpeado con el Ataque Mortal y perdiste 30% de salud.</p>
        <p class='parrafo'>Tu turno</p>
        <button class='draw' onclick='mostrarAtkBtn()'>Aceptar</button>`;
        $("#battle1").delay(1000);
        $("#battle1").fadeIn("fast");
      }
      else{
        $("#battle1").hide();
        $("#esquivar")[0].play();
        $("#player1").fadeOut("fast");
        $("#player1Tele").fadeIn("fast").fadeOut("fast");
        $("#player1").fadeIn("fast");
        atkBtn.style.display="none";
        battle1.innerHTML = `<p class='parrafo'>Vegeta ha intentado golpearte con Ataque Mortal pero has esquivado el golpe.</p>
                              <p class='parrafo'>Vuelve a atacar.</p>
                              <button class='draw' onclick='mostrarAtkBtn()'>Aceptar</button>`;
        $("#battle1").delay(1000);
        $("#battle1").fadeIn("fast");                      
      }
    }
  }


//FIN DE LA BATALLA

let pantalla4 = document.getElementById("pantalla4");

function heroDefeated(){
  $("#battle1").hide();
  console.log("Te han derrotado");
  let cartelFinal = document.createElement("div");
  cartelFinal.innerHTML = `<a class='button__card'><p class='parrafo'>Has sido derrotado por Vegeta.</p>
                                    <p class='parrafo'>Vuelve a intentarlo, no puedes dejar que altere la paz del planeta tierra.</p>
                                    <button class='draw' onclick='reload()'>CONTINUAR</button></a>`;
  pantalla4.appendChild(cartelFinal);
  $("#pantalla3").fadeOut(1000);
  $("#pantalla4").fadeIn(1000);
  $("#player1Defeated").show();
}

function enemyDefeated(){
  $("#battle1").hide();
  $("#pantalla4").prepend(`<div><img src="img/vegetaDefeated.png" style="display:none" id=vegetaDefeated><div>`);

  console.log("enemigo derrotado");
  let cartelFinal = document.createElement("div");
  cartelFinal.innerHTML = `<a class='button__card'><p class='parrafo'>Me has derrotado maldito.</p>
                                    <p class='parrafo'>Entrenaré y volveremos a encontrarnos en otra batalla. </p>
                                    <button class='draw' onclick='mostrarPantalla5()'>CONTINUAR</button></a>`;
  pantalla4.appendChild(cartelFinal);
  $("#pantalla3").fadeOut(1000);
  $("#pantalla4").fadeIn(1000);
  $("#vegetaDefeated").show();
}

//Pantalla 5 Score - Utilización de LocalStorage para guardar los nombres de los ganadores del juego en el lado del cliente.

function mostrarPantalla5() {
    background.classList.remove("backgroundBattle");
    background.classList.add("backgroundFinal");
    $("#pantalla4").hide();
    $("#pantalla5").show();
}

let winners = [];

$('#score').click(function(){    
  //localStorage.clear();
  //Tomo el valor del input userName
  let winnerName = document.getElementById("userName").value;
  //Recupero desde LocalStorage la lista de ganadores previos si es que la hubiere y la guardo en el Array winners
  winners.push( localStorage.getItem("Ganadores"));
  //Agrego el valor del input userName al Array winners
  winners.push(winnerName);
  //Guardo la lista actualizada de ganadores en el LocalStorage
  localStorage.setItem("Ganadores", winners.join(" \uD83C\uDFC6 "));
  //Limpio el campo input userName
  document.getElementById("userName").value = "";
  //Muestro la lista actualizada de ganadores mediante DOM
  $("#pantalla5").hide();
  $("#ranking").prepend(winners.join(" 	\uD83C\uDFC6 "));
  $("#ranking").append(`<button class='draw' onclick='reload()'>Reiniciar</button></a>`);
  $("#pantalla6").show();
});   
       

//Funcion para refrescar la web
function reload (){
  btnSound.play();
  location.reload();
};

//FIN =)