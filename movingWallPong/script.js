let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight-4;
document.body.style.backgroundColor="#000";

//black screen
ctx.fillStyle="#000";
ctx.fillRect(0,0,canvas.width, canvas.height);

let thickness = 20;
let length = 100;

let xOffset = 10;

let yL = canvas.height/2;
let yR = canvas.height/2;

let keysPressed = {};

document.body.addEventListener("keydown",(event)=>{
    keysPressed[event.key] = true;
    if(keysPressed["w"]) updateLeft(87);
    if(keysPressed["s"]) updateLeft(83);
    if(keysPressed["ArrowUp"]) updateRight(38);
    if(keysPressed["ArrowDown"]) updateRight(40);
});

document.body.addEventListener("keyup",(event)=>{
    delete keysPressed[event.key];
});


function updateLeft(key){
    if(key==87){
        yL-=20;
        if(yL<length) yL=length; 
    }
    if(key==83){
        yL+=20;
        if(yL>canvas.height-length) yL=canvas.height-length;
    }

    ctx.fillStyle="#000";
    ctx.fillRect(0,0,canvas.width/2, canvas.height);

    ctx.fillStyle="#fff";
    ctx.fillRect(xOffset,yL-length/2,thickness,length);
}

function updateRight(key){
    if(key==38){
        yR-=20;
        if(yR<length) yR=length; 
    }
    if(key==40){
        yR+=20;
        if(yR>canvas.height-length) yR=canvas.height-length;
    }

    ctx.fillStyle="#000";
    ctx.fillRect(canvas.width/2,0,canvas.width/2, canvas.height);

    ctx.fillStyle="#fff";
    ctx.fillRect(canvas.width-(thickness+xOffset),yR-length/2,thickness,length);
}