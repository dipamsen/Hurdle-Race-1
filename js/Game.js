class Game {
  constructor(){
    
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",(data)=>{
       gameState = data.val();
    });

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    
    car2 = createSprite(300,200);
    
    cars = [car1, car2];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();

    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("#c68767");
      image(track, -195, 0, displayWidth*4, displayHeight);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x;
      var y=0;
      
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = allPlayers[plr].distance;
        //use data form the database to display the cars in y direction
        y += displayHeight/3;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if(allPlayers[plr].character == 'Tom'){
          cars[index-1].addImage('car',img1);
          cars[index-1].scale = 1
        } else {
          cars[index-1].addImage('car',img2);
          cars[index-1].scale = 0.08;
        }
        pits[index-1].y = y;
        
        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          if(cars[index-1].isTouching(pits[index-1])){
            
          }
          camera.position.x = cars[index-1].x;
          camera.position.y = displayHeight/2;
          fill("red");
          ellipse(x, y, 100,100);
        }
        textAlign(CENTER, CENTER);
        textSize(16);
        textStyle(BOLD);
        fill("white");
        text(allPlayers[plr].name, x, y+120);
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null && gameState === 1){
      player.distance +=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null && gameState === 1){
      player.distance -=10
      player.update();
    }
    if(player.distance>4000){
      gameState = 2;
      player.rank++;
      Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();
  }
  end(){
    console.log("GAME OVER!");
    console.log("Rank: " + player.rank);
    //game.update(2);
    
  }
}
