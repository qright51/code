let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


window.onload=()=>{
    init();
}

window.onresize=()=>{
    init();
}

function clear(){
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

function init(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    clear();

    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(canvas.width,canvas.height);
    ctx.moveTo(canvas.width,0);
    ctx.lineTo(0,canvas.height);
    ctx.moveTo(canvas.width/2,0);
    ctx.lineTo(canvas.width/2,canvas.height);
    ctx.moveTo(0,canvas.height/2);
    ctx.lineTo(canvas.width,canvas.height/2);
    ctx.strokeStyle = "#f00";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(canvas.width/3,0);
    ctx.lineTo(canvas.width/3,canvas.height);
    ctx.moveTo(2*canvas.width/3,0);
    ctx.lineTo(2*canvas.width/3,canvas.height);
    ctx.moveTo(0,canvas.height/3);
    ctx.lineTo(canvas.width,canvas.height/3);
    ctx.moveTo(0,2*canvas.height/3);
    ctx.lineTo(canvas.width,2*canvas.height/3);
    ctx.strokeStyle = "#00f";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}