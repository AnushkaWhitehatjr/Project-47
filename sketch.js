
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var scubaD, scubaDImg;
var shark1, sharkImg;
var jf, jfImg;
var sharksGroup, jfGroup;
var bg, bgImg;
var tc, tcImg, tc2, tc2A;
var world, engine;

function preload()
{
	scubaDImg = loadAnimation("Images/Scuba/scuba1.png", "Images/Scuba/scuba2.png", "Images/Scuba/scuba3.png", 
	"Images/Scuba/scuba4.png", "Images/Scuba/scuba5.png", "Images/Scuba/scuba6.png");

	sharkImg = loadAnimation("Images/Shark/shark1.png", "Images/Shark/shark2.png", "Images/Shark/shark3.png", 
	"Images/Shark/shark4.png", "Images/Shark/shark5.png");

	jfImg = loadAnimation("Images/Jellyfish/jf1.png", "Images/Jellyfish/jf2.png", "Images/Jellyfish/jf3.png", 
	"Images/Jellyfish/jf4.png");

	bgImg = loadImage("Images/bg.jpg");

	tcImg = loadImage("Images/tcc.png");

	tc2A = loadAnimation("Images/Tc/tc1.png", "Images/Tc/tc2.png", "Images/Tc/tc3.png", "Images/Tc/tc4.png")
}

function setup() {
	createCanvas(1705, 815);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.

	scubaD = createSprite(170,200,50,50);
	scubaD.addAnimation("scubaAanimation", scubaDImg);

	sharksGroup = createGroup();
	jfGroup = createGroup();
	  
	tc = createSprite(1480,700,50,50);
	tc.addImage(tcImg);
	tc.scale = 0.7;

	tc2 = createSprite(1480,700,50,50);
	tc2.addAnimation("tc2Animation", tc2A);
	tc2.scale = 0.7;

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  createEdgeSprites();
  background(bgImg);
  shark();
  jellyfish();

  fill(0);
  textSize(30);
  text("Use your arrow keys to move the Scuba Diver!", 110, 50);
  text("Try to reach the treasure, but be careful to avoid the sharks and jellyfish on the way!", 110,90);

  tc2.visible = false;

  if(keyDown("UP_ARROW")){
	  scubaD.y = scubaD.y - 10;
  }

  if(keyDown("DOWN_ARROW")){
	  scubaD.y = scubaD.y + 10;
  }

  if(keyDown("RIGHT_ARROW")){
	  scubaD.x = scubaD.x + 10;
  }

  if(keyDown("LEFT_ARROW")){
	  scubaD.x = scubaD.x - 10;
  }

  if(scubaD.isTouching(sharksGroup)){
	//scubaD.x = 170;
  }
  
  if(scubaD.isTouching(tc2)){
	  tc.visible = false;
	  tc2.visible = true;
	  scubaD.velocityX = 0;
  }

  drawSprites();
 
}

function shark(){
	if(frameCount % 140 === 0){
		shark1 = createSprite(1920,Math.round(random(100,800)),50,50);
		shark1.addAnimation("sharkAnimation", sharkImg);
		shark1.velocityX = -10;
		shark1.lifetime = 500;
		if(scubaD.isTouching(tc2)){
			shark1.velocityX = 0;
		}
		sharksGroup.add(shark1);
	}
}

function jellyfish(){
	if(frameCount % 190 === 0){
		jf = createSprite(Math.round(random(400,1700)),950,50,50);
		jf.addAnimation("jfAnimation", jfImg);
		jf.velocityY = -10;
		jf.lifetime = 500;
		if(scubaD.isTouching(tc2)){
			jf.velocityX = 0;
		}
		jfGroup.add(jf);
	}
}

