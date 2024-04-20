let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

document.body.style.backgroundColor="#000";

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let width = canvas.width;
let height = canvas.height;

const timeouts=2;
let rgb=1;

ctx.fillStyle="#000";
ctx.fillRect(0,0,width,height);

let radius=1;
let color=256;

function drawCircle(){
    setTimeout(drawCircle,timeouts);
    if(rgb==0) ctx.fillStyle="rgb("+color+",0,0)";
    else if(rgb==1) ctx.fillStyle="rgb(0,"+color+",0)";
    else ctx.fillStyle="rgb(0,0,"+color+")";
    ctx.beginPath();
    ctx.arc(width/2,height/2,radius,0,2*Math.PI);
    ctx.fill();

    ctx.fillStyle="#000";
    ctx.beginPath();
    ctx.arc(width/2,height/2,3*(radius/3.2),0,2*Math.PI);
    ctx.fill();


    if(color>0) color-=1.2;
    else {radius=0;color=256;}
    if(color<1) rgb++;
    if(rgb>2) rgb=0;
    radius++;
}


setTimeout(drawCircle,timeouts);
