//Variables globales:
var width = 700;
var height = 300;
var canvas, ctx;
var imgRex, imgCloud, imgFloor, imgCactus;
var floor = 200

//OBJETOS CON SUS ATRIBUTOS:
var trex = {y: floor, vy: 0, gravity: 2, jumping: 25, vymax: 9, jump: false};
var level = {speed: 9, score: 0, died: false};
var cactus = {x: 300, y: floor-12.5};
var cloud = {x: 400, y: 100, speed: 2};
var floorgraph = {x: 0, y: floor + 30}

//Conjunto de funciones
//La siguiente se inicializa a la par del programa.
function initialize(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  uploadImages();
}

//Borra el cuadro de juego y restablece los valores.
function deleteCanvas(){
  canvas.width = width;
  canvas.height = height;
}

//Carga las imágenes
function uploadImages(){
  imgRex = new Image ();
  imgCloud = new Image ();
  imgFloor = new Image ();
  imgCactus = new Image ();
  imgRex.src = 'T-Rex.png'
  imgCloud.src = 'cloud.png'
  imgFloor.src = 'floor.png'
  imgCactus.src = 'cactus.png'
}

//Se dibujan las imágenes.
function drawRex(){
  ctx.drawImage(imgRex, 0, 0, 141, 154, 100, trex.y, 50, 50);
}

function drawCactus(){
  ctx.drawImage(imgCactus, 0, 0, 113, 179, cactus.x, cactus.y, 45, 75);
}

function drawCloud(){
  ctx.drawImage(imgCloud, 0, 0, 159, 73, cloud.x, cloud.y, 82, 31);
}

function drawFloor(){
  ctx.drawImage(imgFloor, floorgraph.x, 0, 700, 300, 0, floorgraph.y, 700, 300);
}

//Se define la lógica de cada objeto.
function cactusLogic(){
  if(cactus.x < -100){
    cactus.x = width + 50;
  } else {
    cactus.x -= level.speed;
  }
}

function cloudLogic(){
  if(cloud.x < -100){
    cloud.x = width + 50;
  } else if (cloud.speed == 2){
    cloud.x -= 2;
  } else {
    cloud.x = cloud.x;
  }
}

function floorLogic(){
  if(floorgraph.x > 700){
    floorgraph.x = 0;
  } else {
    floorgraph.x += level.speed;
  }
}

//Par de funciones que definen que el T-Rex salte cuando se presiona la flecha hacia arriba.
document.addEventListener('keydown', function(event){
  if (event.keyCode == 32){
    console.log("jump");
    toJump();
  }
})

function toJump (){
  trex.jump = true;
  trex.vy = trex.jumping;
}

function gravity(){
  if (trex.jump == true){
    if (trex.y - trex.vy - trex.gravity > floor){
      trex.jump = false;
      trex.vy = 0;
      trex.y = floor;
    } else {
      trex.vy -= trex.gravity;
      trex.y -= trex.vy;
    }
  }
}

//Colision del dinosaurio con los cactus.
function collision(){
  if (cactus.x >= 90 && cactus.x <= 150){
     if(trex.y >= floor-12.5){
       level.died = true;
       level.speed = 0;
       cloud.speed = 0;
       }
     }
}


//Bucle principal
var FPS = 50 //frames por segundo
setInterval(function(){
  principal();
}, 1000/FPS);

//La funcion principal se ejecutará una vez cada 10 segundos.
function principal(){
  collision();
  deleteCanvas();
  gravity();
  floorLogic();
  cactusLogic();
  cloudLogic();
  drawFloor();
  drawCactus();
  drawCloud();
  drawRex();
}
