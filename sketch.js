  var monkey,monkey_running,monkey_collide;
  var banana,bananaImage, obstacle, obstacleImage;
  var ground, invisible;

  var FoodGroup, obstacleGroup;

  var score = 0;
  var survivalTime = 0;
  var GameState;
  var PLAY, END;
  var end;

function preload() {

  //monkey loading animation
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png",
                               "sprite_3.png","sprite_4.png","sprite_5.png",
                               "sprite_6.png","sprite_7.png","sprite_8.png")

  //mokey colliding as gamestate end loading animation
  monkey_collide=loadAnimation("sprite_0.png");
  
  //banana loading image                               
  bananaImage = loadImage("banana.png");
  
  //obstacle loading image
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  
  createCanvas(400, 400);

  PLAY = 1;
  GameState = PLAY;
  END = 0;

  //2 groups
  FoodGroup = new Group();
  obstacleGroup = new Group();

  //monkey creating sprite
  monkey = createSprite(70, 340, 50, 50);
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide",monkey_collide);
  monkey.scale = 0.1;

  //ground creating sprite
  ground = createSprite(250, 350, 1000, 10);
  ground.x = ground.width / 2;

  //iinvisible ground for colliding
  invisible = createSprite(250, 355, 1000, 10);
  invisible.x = ground.width / 2;
  
}



function draw() {
  
  background("lightgreen");
  
  
  //gravity
  monkey.velocityY = monkey.velocityY + 0.9;

  //monkey will move on invisible
  monkey.collide(invisible);
  
  //not showing invisible 
  invisible.visible=false;

  //show text for score that is banana eaten
  stroke("blue");
  textSize(20);
  fill("blue");
  text("score:" + score, 250, 50);

  //show text for survival time that is framecount
  stroke("blue");
  textSize(20);
  fill("blue");
  text("survival Time:" + survivalTime, 50, 50);


  //GAMESTATES....
  if (GameState === PLAY) {

    
   //call 2 function
   Food();
   Obstacle();
    
    //reset the ground
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    
    //moving invisible ground
    if (invisible.x < 0) {
      invisible.x = invisible.width / 2;
    }
    
    //moving speed for invisible 
    invisible.velocityX = -5;

    //MONKEY JUMPS WHEN PRESSED SPACE
    if (keyDown("space") && monkey.isTouching(ground)) {
      monkey.velocityY = -16;
    }
    
    //survival time for monkey as many frames pass
    survivalTime = Math.round(frameCount / 3);
    
    //moving ground
    ground.velocityX = -(5 + 2 * score / 100);
    
    //food wiil destroy if touched by monkey
    if (monkey.isTouching(FoodGroup)) {
       FoodGroup.destroyEach();
      score=score+ 2;
  }
   
    //gamestate will convert into END
    if (monkey.isTouching(obstacleGroup)) {
      GameState = END;
    }

} 
  else if (GameState === END) {
      
    ground.velocityX = 0;
    invisible.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    //2 groUp lifetime
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    //monkey animation will change to still   
    monkey.changeAnimation("collide",monkey_collide);
  
    
  }



  drawSprites();
}

function Food() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(500, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 + 2 * score / 100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    FoodGroup.setLifetimeEach(100);
    FoodGroup.add(banana);
    banana.setCollider("rectangle", 0, 0, 400, 400);
  }
  
}

function Obstacle() {

  if (frameCount % 300 === 0) {
    var obstacle = createSprite(500, 315, 23, 32);
    obstacle.velocityX = -(5 + 2 * score / 100);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
    obstacleGroup.setLifetimeEach(100);
    obstacle.setCollider("circle", 0, 0, 200)
  }
 
}

