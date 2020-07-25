//This creates all the variables
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground

//This defines the variables for The Physics Engine
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;


function preload()
{
	//This loads the image
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {

	//This creates the Canvas and puts the rectangle in the center
	createCanvas(800, 700);
	rectMode(CENTER);
	
	//This creates the package, helicopter, and ground sprites
	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	//This creates the engine and a world
	engine = Engine.create();
	world = engine.world;

	//Creates a PackageBody
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:3, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

	//This runs the Engine
	Engine.run(engine);
  
}


function draw() {

  rectMode(CENTER);

  //This background is all black
  background(0);

  //This makes the Sprites follow their repsective Bodies
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  groundSprite.x= ground.position.x 
  groundSprite.y= ground.position.y 

  //This makes the sprite Static when touching the ground
  if (packageSprite.isTouching(groundSprite)) {

	Body.setStatic(packageBody,true);

  }

  //This calles the function keyPressed and draw Sprites
  keyPressed();

  drawSprites();
 
}

//This is the function keypressed
function keyPressed() { 
	
	//When the down arrow is pressed the package body becomes un static
	if (keyCode === DOWN_ARROW) {
   
    	Body.setStatic(packageBody,false);
    }
}



