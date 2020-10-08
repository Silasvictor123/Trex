var trex, trex_running;
var ground, groundimage;
var cloudimage;
var obstacle1image;
var obstacle2image;
var obstacle3image;
var obstacle4image;
var obstacle5image;
var obstacle6image;
var invisibleground;
var score = 0;
var cloudgroup, obstaclegroup;
var gamestate = "play";
var gameOverimage;
var gameOver;
var restartimage;
var restart;
var dieSound;
var jumpSound;
var checkPointsound;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundimage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  obstacle1image = loadImage("obstacle1.png")
  obstacle2image = loadImage("obstacle2.png")
  obstacle3image = loadImage("obstacle3.png")
  obstacle4image = loadImage("obstacle4.png")
  obstacle5image = loadImage("obstacle5.png")
  obstacle6image = loadImage("obstacle6.png")
  gameOverimage = loadImage("gameOver.png")
  restartimage = loadImage("restart.png")
  dieSound = loadSound("die.mp3")
  jumpSound = loadSound("jump.mp3")
   checkPointSound = loadSound("checkPoint.mp3")
  
}

function setup() {
  createCanvas(600, 200)
  trex = createSprite(50, 150, 20, 50);
  trex.addAnimation("silas", trex_running)
  trex.scale = 0.5;

  ground = createSprite(300, 190, 2000, 10);
  ground.addImage("ground", groundimage);

  gameOver = createSprite(300, 60, 10, 10);
  gameOver.addImage("game", gameOverimage);

  restart = createSprite(300, 110, 10, 10);
  restart.addImage("restart", restartimage);

  invisiableground = createSprite(300, 195, 600, 5);
  invisiableground.visible = false;

  cloudgroup = new Group();
  obstaclegroup = new Group();
}

function draw() {
  background("white");
  if (gamestate == "play") {
    
    // ground velocity
    ground.velocityX = -5;
    
    // reset ground
    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    gameOver.visible = false;
    restart.visible = false;
    spawnClouds();
    spawnobstacle();
    
    // score
    score = score + 1;
    text("score:" + score, 500, 30);
    if(score%100==0){
    checkPointSound.play();
    }
    
    
    // trex jumping
    if (keyDown("space") && trex.y > 165) {
      jumpSound.play();
      trex.velocityY = -15;
    }
    console.log(trex.y)
    trex.velocityY = trex.velocityY + 1;
    
    // trex colliding
    if (trex.isTouching(obstaclegroup)) {
      dieSound.play();
      gamestate = "end";
    }
  }
  if (gamestate == "end") {
    
    // stop ground
    ground.velocityX = 0;
    
    // stop cloudgroup
    cloudgroup.setVelocityXEach(0);
    
    // stop obstaclegroup
    obstaclegroup.setVelocityXEach(0);
    
    // make cloud and the obstacle stay on the sceren when trex          collide
    cloudgroup.setLifetimeEach(-1);
    obstaclegroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)) {
      obstaclegroup.destroyEach();
      cloudgroup.destroyEach();
      gamestate = "play";

    }
  }





  




  trex.collide(invisiableground);


  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 == 0) {

    var r = Math.round(random(100, 150));
    cloud = createSprite(600, r, 20, 50);
    cloud.addImage("cloud", cloudimage);
    cloud.velocityX = -5;
    cloud.scale = 1;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 600 / 5;
    cloudgroup.add(cloud);
  }
}

function spawnobstacle() {
  if (frameCount % 120 == 0) {
    var p = Math.round(random(1, 6));
    obstacle = createSprite(600, 175, 10, 10);

    obstacle.velocityX = -10;
    obstacle.scale = 0.5;

    obstacle.lifetime = 600 / 3;
    if (p == 1) {
      obstacle.addImage("obstacle1.png", obstacle1image);
    } else if (p == 2) {
      obstacle.addImage("obstacle2.png", obstacle2image);
    } else if (p == 3) {
      obstacle.addImage("obstacle3.png", obstacle3image);
    } else if (p == 4) {
      obstacle.addImage("obstacle4.png", obstacle4image);
    } else if (p == 5) {
      obstacle.addImage("obstacle5.png", obstacle5image);
    } else if (p == 6) {
      obstacle.addImage("obstacle6.png", obstacle6image);
    }

    obstaclegroup.add(obstacle);
  }
}