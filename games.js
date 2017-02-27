// palendrome code
function ispalindrone(thestring){
  var back = "";
  for (i = thestring.length-1; i> -1; i--){
    back =back+thestring[i];
  }
    if(back == thestring){
      alert ("this is a palendrone");
    }
  else{
    alert ("this is not a palendrone");
  }
  
}
function buttonclick(){
  var input2 = document.getElementById("input2");
  ispalindrone(input2.value);
}
var donebutton = document.getElementById("button2");
donebutton.onclick = buttonclick;
 
// snake code
var canvas = null;
var context = null;
var interval = null;
var display = null;
var block = document.getElementById("block");
var W = 400;
var H = 400;
var size = 20;

function Initialize() {
  canvas = document.getElementById("myCanvas");
  if (!canvas.getContext) {
    alert("This browser does not support the canvas element.");
    return;
  }
  canvas.width = W;
  canvas.height = H;
  context = canvas.getContext("2d");
  
  drawWalls();
  document.getElementById("start").onclick = startIt;
}


function startIt() {
  if (interval !== null)
    window.clearInterval(interval);
  dx = 1;
  dy = 0;
  initialSnake();
  drawSnake();
  window.onkeydown = HandleKeyDown;
  interval = setInterval(tick, 100);
}

// KEY EVENT SECTION
var UP_KEY_CODE = 38;
var DOWN_KEY_CODE = 40;
var LEFT_KEY_CODE = 37;
var RIGHT_KEY_CODE = 39;

function HandleKeyDown(event) {
  if (event.keyCode == UP_KEY_CODE) {
    dx = 0;
    dy = -1;
  }
  if (event.keyCode == DOWN_KEY_CODE) {
    dx = 0;
    dy = 1;
  }
  if (event.keyCode == LEFT_KEY_CODE) {
    dx = -1;
    dy = 0;
  }
  if (event.keyCode == RIGHT_KEY_CODE) {
    dx = 1;
    dy = 0;
  }
}

/////////////////////////////////////////////////////////////////////////////////
// game state variables
var snakePositions = [];

var initialSnakeLength = 8;
var initialX = 20;
var initialY = 20;

var dx = 1;
var dy = 0;

var appleX = GetRandomInt(2, 36);
var appleY = GetRandomInt(2, 36);

function drawWalls() {
  var wall = getOnePieceWall();
  for (var i = 0; i < size; i++) {
    context.drawImage(wall, i * size, 0, size, size);
    context.drawImage(wall, 0, i * size, size, size);
    context.drawImage(wall, i * size, W - size, size, size);
    context.drawImage(wall, H - size, i * size, size, size);
  }
}

function initialSnake() {
  snakePositions = [];
  for (var i = 0; i < initialSnakeLength; i++) {
    snakePositions.push([initialX - i, initialY]);
  }
}

function drawSnake() {
  var head = snakePositions[0];
  drawShape(head[0], head[1], "orange");
  for (var i = 1; i < snakePositions.length; i++) {
    drawShape(snakePositions[i][0], snakePositions[i][1], "blue");
  }
}

function tick() {
  // update snake positions
  var head = snakePositions[0];
  var newHead = [head[0] + dx, head[1] + dy];
  
  if (checkWalls(newHead[0], newHead[1]) || checkSelf(newHead[0], newHead[1])) {
    window.clearInterval(interval);
    alert("LOSER");
  } else {
    context.clearRect(20, 20, 360, 360);
    if (newHead[0] == appleX && newHead[1] == appleY) {
     appleX = GetRandomInt(2,36);
     appleY = GetRandomInt(2,36);
  } else {
    snakePositions.pop();
       }
    snakePositions.unshift([head[0] + dx, head[1] + dy]);
    drawSnake();
    
    // draw Apple
    drawShape(appleX, appleY, "yellow");
  }
}

// HELPER FUNCTIONS FOR THE GAME //

//checks if the snake is touching itself, does not check the last position in the array, because that is the head.
function checkSelf(x, y) {
   for (var j = 1; j < snakePositions.length - 1; j++) {
     var checkSegment = snakePositions[j];
     if (x == checkSegment[0] && y == checkSegment[1]) {
        return true;
     }
   }
   return false;
}

//checks if the snake is touching a wall.
function checkWalls(x, y) {
  return (x==38 || x == 1 || y == 38 || y == 1);
}

//draws the circles to create the snake
function drawShape(x, y, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x * 10 + 5, y * 10 + 5, 5, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
}

//returns a random integer between the minimum and the maximum number
function GetRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getOnePieceWall() {
  var img = new Image;
  img.src = "http://i.istockimg.com/file_thumbview_approve/7663524/3/stock-illustration-7663524-cartoon-bricks.jpg";
  return img;
}