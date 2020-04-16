var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var pit;
var database;
var tomCount = 0;
var jerryCount = 0;
var pits = [];
var form, player, game;
var img1, img2, img3, img4, ground, track;
var cars, car1, car2, car3, car4;

function preload(){
  img1 = loadImage("images/car1.png");
  img2 = loadImage("images/car2.png");
  img3 = loadImage("images/car3.png");
  img4 = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  track = loadImage("images/track.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  pit1 = createSprite(0, 0);
  game.getState();
  pit2 = createSprite(0, 0);
  pit1.x = random(0, 4000);
  pit2.x = random(0, 4000);
  pits.push(pit1, pit2);
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  } 
  if(gameState === 2){
    game.end();
  }
}
