/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Shrimp Avoids Flamingo
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p" 
const obstacle = "o" 



setLegend(
  [player, bitmap`
.....0000.......
...008888000....
..08888888880...
.088888888880...
.080888888880...
0880888888880...
08808800888880..
088880..088880..
.08880..088880..
..000....08880..
.....000088880..
....088888880...
....088888880...
.....0088800....
.......000......
................`], 
  [ obstacle, bitmap`
...000..........
..0880..........
.08080..........
066880..........
060080..........
00.080..........
...080..........
...080..........
...08000000.....
....08888880....
....08888880....
....08888880....
.....000000.....
.......88.......
.......88.......
......6666......` ], 
)

const melody = tune `
500: B4/500 + C5/500 + E5^500 + F5^500 + B5^500,
500: F4/500 + C5/500 + D4^500,
500: G5/500 + C5/500 + B5^500,
500: G4/500 + E5^500,
500: B4/500 + A5^500 + G4^500 + E4^500,
500: E5/500 + D4^500,
500: G5/500 + F4/500 + D4^500,
500: F4/500 + D5^500 + C5^500 + D4^500,
500: D5/500 + A5^500 + A4^500 + F5^500 + E5^500,
500: E4^500 + D4^500,
500: B4/500 + G5/500 + E4^500,
500: F4/500 + B4^500 + A5^500,
500: F4/500 + A4/500 + F5/500 + E5/500 + B4^500,
500: D4/500 + A4/500 + A5^500,
500: D5/500 + A5^500 + G5^500,
500: E5/500 + F4^500,
500: B4/500 + C5^500 + D4^500,
500: C5^500 + A5^500,
500: E5^500 + A5^500,
500: B4/500 + F5/500 + F4^500 + D5^500,
500: D4/500 + B4^500 + E5^500 + D5^500,
500: G5/500 + B4^500,
500: F4^500 + F5^500 + E5^500,
500: G4/500 + C4/500 + A4^500 + E4^500 + A5^500,
500: D5/500 + G5/500 + E4^500 + A5^500,
500: D5^500 + C5^500,
500: F4^500 + E5^500,
500: E5/500 + D4/500 + A4^500 + F4^500 + G5^500,
500,
500: F4/500 + A4^500,
500: F5/500 + D5^500 + E4^500 + A5^500,
500: A4/500 + B4/500 + A5^500 + E4^500`;

playTune(melody, Infinity);
setSolids([])

setMap(map`
........
........
........
........
........
........
........
...p....`);

var gameRunning = true;
 
onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1; 
  }
});
 
onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1; 
  }
});
 
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, obstacle);
}
 
function moveObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}
 
function despawnObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == 7) {
     obstacles[i].remove();
   }
  }
}
 
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
 
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }
 
  return false;
}
var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
 
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
 
}, 1000);