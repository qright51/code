let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight-4;
document.body.style.backgroundColor="#000";

ctx.strokeStyle="#fff";
ctx.fillStyle="#000";

let length = 75;
let angle=0;

window.onload=()=>{
    ctx.fillRect(0,0,canvas.width, canvas.height);
    drawLine(angle);
}

let vectorI = Math.trunc(canvas.width/length);
let vectorJ = Math.trunc(canvas.height/length);

let array = new Array(vectorJ);
for(let i=0; i<array.length; i++){
    array[i] = new Array(vectorI);
    for(let j=0; j<array[i].length; j++){
        array[i][j]=0;
    }
}
console.log(array);


function drawLine(angle,xy,yy){
    let x = length/2*Math.cos(angle);
    let y = length/2*Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(xy+x,yy-y);
    ctx.lineTo(xy-x,yy+y);
    ctx.strokeStyle="#fff";
    ctx.lineWidth=2;
    ctx.stroke();
}

canvas.addEventListener("mousemove",(e)=>{
    ctx.fillRect(0,0,canvas.width, canvas.height);
    if(angle>=360) angle=0;
    if(angle<0) angle=0;

    for(let i=0; i<array.length; i++){
        for(let j=0; j<array[i].length; j++){
            if(array[i][j]>=360) array[i][j]=0;
            if(array[i][j]<0) array[i][j]=0;

            let tempX = (canvas.width/array[i].length*j)+length/2;
            let tempY = (canvas.height/array.length*i)+length/2;

            let x = tempX-e.pageX;
            let y = e.pageY-tempY;
            array[i][j]=Math.PI/2+Math.atan(y/x);

            drawLine(array[i][j],tempX,tempY);
        }
    }
});