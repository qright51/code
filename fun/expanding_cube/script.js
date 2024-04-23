let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

document.body.style.backgroundColor="#000";

canvas.width = 500;
canvas.height = 500;

let width = 500;
let height = 500;

ctx.fillStyle="#000";
ctx.fillRect(0,0,width,height);

let repeat=0;
let interval;

interval = setInterval(drawCube,9);

function returnX(x){
    return (width-x)/2;
}

function returnY(y){
    return (height-y)/2;
}

function removeCube(){
    if(repeat>10) {repeat--;
        ctx.fillStyle="#000";
        ctx.fillRect(returnX(repeat)-5,returnY(repeat)-5,repeat+10,repeat+10);
    
        ctx.fillStyle="#00f";
        ctx.fillRect(returnX(repeat),returnY(repeat),repeat,repeat);
        setTimeout(removeCube,9);
    }
}

function drawCube(){
    if(repeat!=500) repeat++;
    else {clearInterval(interval); removeCube();}
    ctx.fillStyle="#0f0";
    ctx.fillRect(returnX(repeat),returnY(repeat),repeat,repeat);
}
