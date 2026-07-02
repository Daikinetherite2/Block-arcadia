const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{x:9*box,y:9*box}];
let food = randomFood();
let score = 0;

let dx = box;
let dy = 0;

document.addEventListener("keydown",changeDirection);

function changeDirection(e){
if((e.key=="ArrowLeft"||e.key=="a")&&dx==0){
dx=-box;dy=0;
}
if((e.key=="ArrowUp"||e.key=="w")&&dy==0){
dx=0;dy=-box;
}
if((e.key=="ArrowRight"||e.key=="d")&&dx==0){
dx=box;dy=0;
}
if((e.key=="ArrowDown"||e.key=="s")&&dy==0){
dx=0;dy=box;
}
}

function randomFood(){
return{
x:Math.floor(Math.random()*20)*box,
y:Math.floor(Math.random()*20)*box
};
}

function collision(head,array){
for(let i=0;i<array.length;i++){
if(head.x==array[i].x&&head.y==array[i].y){
return true;
}
}
return false;
}

function draw(){

ctx.fillStyle="#222";
ctx.fillRect(0,0,400,400);

ctx.fillStyle="red";
ctx.fillRect(food.x,food.y,box,box);

for(let i=0;i<snake.length;i++){
ctx.fillStyle=i==0?"lime":"green";
ctx.fillRect(snake[i].x,snake[i].y,box,box);
}

let head={
x:snake[0].x+dx,
y:snake[0].y+dy
};

if(head.x==food.x&&head.y==food.y){
score++;
document.getElementById("score").innerText=score;
food=randomFood();
}else{
snake.pop();
}

if(
head.x<0||
head.y<0||
head.x>=400||
head.y>=400||
collision(head,snake)
){
clearInterval(game);
alert("Game Over! Score: "+score);
location.reload();
}

snake.unshift(head);
}

const game=setInterval(draw,100);
