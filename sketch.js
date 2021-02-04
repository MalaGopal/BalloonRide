var balloon
var bg,bgImg,balloon,balloon_flying,balloon
var database,position

function preload(){
  bgImg = loadImage("bgCity.png")
  balloon_flying = loadAnimation("hb1.png","hb2.png","hb3.png");
  balloonImg = loadImage("hb1.png")
}
function setup() {
  database = firebase.database()
  createCanvas(1250,550);
  balloon = createSprite(100, 430, 50, 50);
  balloon.addImage("balloon",balloonImg)
  balloon.scale =0.5

  var balloon_position = database.ref("Balloon/Height")
  balloon_position.on("value",readPosition,showError)


}

function draw() {
  background(bgImg);  

  textSize(20)
  stroke("black")
  text("**Use arrow keys to move the balloon",100,30)
  if(keyDown("up")){
   // balloon.y = balloon.y - 10
    updateHeight(0,-10)
    balloon.scale = balloon.scale - 0.01
    balloon.addAnimation("flying",balloon_flying)
  }
  if(keyDown("down")){
  //  balloon.y = balloon.y + 10
    updateHeight(0,10)
    balloon.scale = balloon.scale + 0.01
    balloon.addAnimation("flying",balloon_flying)
  }
  if(keyDown("left")){
   // balloon.x = balloon.x - 10
    updateHeight(-10,0)
    balloon.addAnimation("flying",balloon_flying)
  }
  if(keyDown("right")){
   // balloon.x = balloon.x + 10
    updateHeight(10,0)
    balloon.addAnimation("flying",balloon_flying)
  }
  drawSprites();
}

function updateHeight(x,y){
  database.ref("Balloon/Height").update({
    x:balloon.x+x,
    y:balloon.y+y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y
}

function showError(){
  console.log("error")
}