var canvas
var bg;
var background
var player, player_running, player_firing;
var monstersGroup;
var obstaclesGroup;
var invisibleGround;
var bullet,bulletGroup;
var gameState=1
var gameOver, restart;
var score=0;


function preload(){
  backgroundImg= loadImage("assets/bg1.jpg")
  player_runningImg= loadAnimation("assets/ch2.png","assets/ch3.png","assets/ch4.png","assets/ch5.png","assets/ch6.png")
  player_firingImg= loadAnimation("assets/ch1.png")
  bulletImg=loadImage("assets/bullet1.png")
  monster1= loadImage("assets/monster1.png")
  monster2= loadImage("assets/monster2.png")
  monster3= loadImage("assets/monster3.png")
  monster4= loadImage("assets/monster4.png")
  obstacle1= loadImage("assets/obstacle1.png")
  obstacle2= loadImage("assets/obstacle2.png")
  obstacle3= loadImage("assets/obstacle3.png")
  obstacle4= loadImage("assets/obstacle4.png")
  gameOverImg= loadImage("assets/game over.png")
  restartImg= loadImage("assets/reset.png")
}


function setup() {
 canvas = createCanvas(windowWidth,windowHeight);  

  bg = createSprite(0)
  bg.addImage(backgroundImg)
  bg.scale=2


  player=createSprite(150,740,20,20)
  player.setCollider("rectangle",0,0,200,200)
  player.addAnimation("running",player_runningImg)
  player.addAnimation("firing",player_firingImg)
  player.scale=0.07
  player.setCollider("circle",0,0,300)


  gameOver = createSprite(400,500);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(700,700);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  

  monstersGroup = new Group();
  obstaclesGroup= new Group();
  bulletGroup= new Group();

  score=0;
}

function draw() {
  background(255);
  text("Score: "+ score, 200,50);


  

if (gameState===1){

  bg.velocityX=-4

  if(bg.x<50)
  {
    bg.x=1000
  }
 
  
  score = score + Math.round(frameCount/60);

  if(keyDown("space")&& player.y >= 710) {
  player.velocityY = -12;
  }
  player.velocityY = player.velocityY + 0.5
  

if(obstaclesGroup.isTouching(player)){
  gameState=2
  }

if(monstersGroup.isTouching(player)){
  gameState=2
  }
    
if(bulletGroup.isTouching(monstersGroup)){
  monstersGroup.destroyEach();
  bulletGroup.destroyEach();
  }

if(mouseWentDown ("leftButton")){
  player.changeAnimation("firing",player_firingImg)
  Bullet();
  }

if (mouseWentUp("leftButton")){
   player.changeAnimation("running",player_runningImg)
  }

  invisibleGround = createSprite(100,750,8000,1);
  invisibleGround.visible = false;
  player.collide(invisibleGround);
  invisibleGround.velocityX=-5

  
  spawnObstacles();
  spawnMonsters();
  
  
}

else if (gameState === 2) {
  gameOver.x=camera.position.x;
  restart.x=camera.position.x;
  gameOver.visible = true;
  restart.visible = true;
    player.velocityY = 0;
    player.changeAnimation("firing",player_firingImg)
    obstaclesGroup.setVelocityXEach(0);
    monstersGroup.setVelocityXEach(0);
    bg.velocityX=0
    bulletGroup.setVelocityXEach(0);
  
    obstaclesGroup.setLifetimeEach(-1);
    monstersGroup.setLifetimeEach(-1);

    if(mousePressedOver(restart)) {
      reset();
    }
    }
    
  drawSprites();

}
function spawnObstacles() {
  if(frameCount % 250 === 0) {

    var obstacle = createSprite(camera.position.x+900,750,40,40);
    obstacle.setCollider("rectangle",0,0,200,200)
    obstacle.velocityX = -4
    obstacle.scale = 0.03;   
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;        
      default: break;
    }

    obstacle.lifetime = 500;
    obstaclesGroup.add(obstacle);
    
  }
}


function spawnMonsters() {
  if(frameCount % 350 === 0) {

    var monster = createSprite(camera.position.x+900,680,40,40);
    monster.setCollider("rectangle",0,0,200,200)
    monster.velocityX = -4 
    monster.scale = 0.2;

    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: monster.addImage(monster1);
              break;
      case 2: monster.addImage(monster2);
              break;
      case 3: monster.addImage(monster3);
              break;
      case 4: monster.addImage(monster4);
              break;        
      default: break;
    }

    monster.lifetime = 500;
    monstersGroup.add(monster);
  }
  }
function keyPressed() { 
	if (keyCode === LEFT_ARROW)  {
		player.x=player.x-20;
		
  }
    else if (keyCode === RIGHT_ARROW) {
	    player.x=player.x+20;
       
    }
  
}

  function Bullet(){
    bullet= createSprite(player.x+50,player.y+7, 100,20)
    bullet.addImage(bulletImg)
    bullet.scale=0.05
    bullet.velocityX= 7
    bulletGroup.add(bullet)
    bullet.lifetime=500
  }
  
  /*function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }*/
  
  function reset(){
    gameState = 1;
    gameOver.visible = false;
    restart.visible = false;
    player.visible = true;
    player.changeAnimation("firing",player_firingImg);
    obstaclesGroup.destroyEach();
    monstersGroup.destroyEach();
    bulletGroup.destroyEach();
    score = 0;
  }