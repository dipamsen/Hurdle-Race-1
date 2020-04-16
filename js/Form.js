class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('RESET');
    this.radio = createRadio();
    
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("Hurdle Race Game");
    this.title.position(displayWidth/2 - 50, 0);

    this.input.position(displayWidth/2 - 40 , displayHeight/3);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    
    if(tomCount == 0){
      this.radio.option('Tom'); 
    }
    if(jerryCount == 0){
    this.radio.option('Jerry'); }
    this.radio.position(displayWidth/2-10, displayHeight/2-80);
    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      this.radio.hide();
      player.character = this.radio.value();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });
    this.reset.position(displayWidth/8, displayHeight/6);
    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      Player.updateCarsAtEnd(0);
    })
  }
}
