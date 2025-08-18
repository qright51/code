let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let renderInterval;
let physicsInterval;

const setting = {
    ballSize: 10,
    ballSpeed: 2.5,
    paddleWidth: 50,
    paddleHeight: 1/5,
    padding: 50
};

class Ball{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.s = setting.ballSize;
        this.speed = setting.ballSpeed,
        this.angle = 0;
    }
}

class Paddle{
    constructor(y){
        this.y = y;
        this.pad = setting.padding;
        this.w = setting.paddleWidth;
        this.h = window.innerHeight*setting.paddleHeight;
    }
}

var ball;
var paddleL;
var paddleR;

function drawPaddles(){
    ctx.fillStyle="#fff";
    ctx.fillRect(paddleL.pad, paddleL.y-paddleL.h/2, paddleL.w, paddleL.h);
    ctx.fillRect(canvas.width-paddleR.pad-paddleR.w, paddleR.y-paddleR.h/2, paddleR.w, paddleL.h);
}

function drawBall(){
    ctx.fillStyle="#fff";
    ctx.fillRect(ball.x-ball.s/2, ball.y-ball.s/2, ball.s, ball.s);
}

function clear(){
    ctx.fillStyle="#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function init(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ball = new Ball(canvas.width/2, canvas.height/2);
    paddleL = new Paddle(canvas.height/2);
    paddleR = new Paddle(canvas.height/2);

    let d_angle = Math.atan(canvas.height/canvas.width);
    let c = Math.floor(Math.random()*4);
    switch(c){
        case 0:
            ball.angle = Math.PI-d_angle*Math.random();
            break;
        case 1:
            ball.angle = Math.PI+d_angle*Math.random();
            break;
        case 2:
            ball.angle = d_angle*Math.random();
            break;
        case 3:
            ball.angle = 2*Math.PI-d_angle*Math.random();
            break;
    }
}

function draw(){
    clear();
    drawPaddles();
    drawBall();
}

function physics(){
    if(!ball || !paddleL || !paddleR) return;

    let paddleSpeed = 4;
    let extra = 0;
    
    if(key.up_L && !key.down_L && paddleL.y>paddleL.h/2){
        paddleL.y -= paddleSpeed;
        if(paddleL.y<paddleL.h/2) paddleL.y = paddleL.h/2;
        extra = 0.5;
    }

    if(!key.up_L && key.down_L && paddleL.y<canvas.height-paddleL.h/2){
        paddleL.y += paddleSpeed;
        if(paddleL.y>canvas.height-paddleL.h/2) paddleL.y = canvas.height-paddleL.h/2;
        extra = -0.5;
    }

    if(key.up_R && !key.down_R && paddleR.y>paddleR.h/2){
        paddleR.y -= paddleSpeed;
        if(paddleR.y<paddleR.h/2) paddleR.y = paddleR.h/2;
        extra = 0.5;
    }

    if(!key.up_R && key.down_R && paddleR.y<canvas.height-paddleR.h/2){
        paddleR.y += paddleSpeed;
        if(paddleR.y>canvas.height-paddleR.h/2) paddleR.y = canvas.height-paddleR.h/2;
        extra = -0.5;
    }

    ball.x += ball.speed*Math.cos(ball.angle);
    ball.y += -ball.speed*Math.sin(ball.angle);

    if(ball.y<0){
        ball.angle = 2*Math.PI-ball.angle;
        ball.y = 0;
    }

    if(ball.y>canvas.height){
        ball.angle = 2*Math.PI-ball.angle;
        ball.y = canvas.height;
    }

    if(ball.x<paddleL.pad+paddleL.w && ball.x>paddleL.pad && ball.y>paddleL.y-paddleL.h/2 && ball.y<paddleL.y+paddleL.h/2){
        ball.angle = Math.PI-ball.angle+extra;
        ball.x = paddleL.pad+paddleL.w;
    }

    if(ball.x>canvas.width-paddleR.pad-paddleR.w && ball.x<canvas.width-paddleR.pad && ball.y>paddleR.y-paddleR.h/2 && ball.y<paddleR.y+paddleR.h/2){
        ball.angle = Math.PI-ball.angle-extra;
        ball.x = canvas.width-paddleR.pad-paddleR.w;
    }
}

window.onload=()=>init();
window.onresize=()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

renderInterval = setInterval(draw, 1000/60);
physicsInterval = setInterval(physics, 1000/240);

var key = {
    up_L: false,
    down_L: false,
    up_R: false,
    down_R: false
}

document.body.addEventListener("keydown",(e)=>{
    switch(e.key){
        case "w":
            key.up_L = true;
            break;
        case "s":
            key.down_L = true;
            break;
        case "ArrowUp":
            key.up_R = true;
            break;
        case "ArrowDown":
            key.down_R = true;
            break;
    }
});

document.body.addEventListener("keyup",(e)=>{
    switch(e.key){
        case "w":
            key.up_L = false;
            break;
        case "s":
            key.down_L = false;
            break;
        case "ArrowUp":
            key.up_R = false;
            break;
        case "ArrowDown":
            key.down_R = false;
            break;
    }
});