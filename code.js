var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["b1da6278-201b-4079-8893-2a66c1d0bcfc"],"propsByKey":{"b1da6278-201b-4079-8893-2a66c1d0bcfc":{"name":"golfball_1","sourceUrl":"assets/api/v1/animation-library/gamelab/HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY/category_sports/golfball.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/HnGkChZ0Lf5fTeAmaQDwhmGSUiF59YcY/category_sports/golfball.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//creación del paddle y la pelota con sus respectivas características
var paddle  = createSprite(200, 390, 100, 20);
var ball = createSprite(200, 200, 20, 20);
ball.setAnimation("golfball_1");
ball.scale = 0.05;

// Puntaje
var score = 0;


// Estado del Juego
var gameState = "Inicio";


//creación de los brick y sus filas
var bricks = new Group();

createbricks(65, "red");
createbricks(65+30, "blue");
createbricks(65+30+30, "orange");
createbricks(65+30+30+30, "purple");

function createbricks(y, color) {
  for (var c = 0; c < 6; c++) {
  var brick = createSprite(65+54*c, y, 50, 25);
  brick.shapeColor = color;
  bricks.add(brick);
  } 
}


//creación de ejes
createEdgeSprites();


//función para la interación de ball con los bricks
function ballbricks(){
  if (ball.isTouching(bricks)) {
    ball.bounceOff(bricks);
  }
}


// Estado del Juego en Inicio
function Inicio() {
  if (gameState == "Inicio") {
    textSize(20);
    stroke("white");
    text("¡Hola! Presiona ESPACIO para jugar", 40, 200);
    if (keyDown("space")) {
      ball.velocityX = 5;
      ball.velocityY = 6;
      gameState = "Juego";
    }
  }
}


// Estado del Juego en Juego
function Juego() {
  if (gameState == "Juego") {
    paddle.x = mouseX;
    textSize(20);
    stroke("white");
    text("Puntuación: " + score, 260, 30);
  }
}


// Estado del Juego en Fin
function Fin() {
  if (score == 24) {
    gameState = "Fin1";
    textSize(25);
    stroke("white");
    text("¡Felicidades, has ganado!", 55, 210);
    ball.velocityY = 0;
    ball.velocityX = 0;
    paddle.x = 200;
    ball.x = 200;
    ball.y = 200;
    paddle.destroy();
    ball.destroy();
  } else if (ball.isTouching(bottomEdge)){
    gameState = "Fin2";
  }
}


//función draw
function draw() {
  background("black");
  drawSprites();
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
  ball.bounceOff(topEdge);
  ball.bounceOff(paddle);
  ball.bounceOff(bricks, bricksHit);
  ballbricks();
  Inicio();
  Juego();
  Fin();
  if (gameState == "Fin2" ) {
    textSize(25);
    stroke("white");
    text("¡Qué mal, has perdido!", 55, 210);
    ball.velocityY = 0;
    ball.velocityX = 0;
    paddle.x = 200;
    ball.x = 200;
    ball.y = 200;
    paddle.destroy();
    ball.destroy();
  }  
}


//destrucción de bricks
function bricksHit(ball, brick) {
  brick.remove();
  score += 1;
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
