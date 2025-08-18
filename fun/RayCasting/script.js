let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let polygon = [];
let points = [];
let hue = Math.floor(Math.random()*360);

function drawBackground(){
    let backgroundScale = 100;
    let cross = (28+backgroundScale)/16;

    let anchorX = canvas.width/2;
    let anchorY = canvas.height/2;

    ctx.fillStyle="#dedede";
    for(let i=0; i<Math.ceil(canvas.height/backgroundScale); i++){
        for(let j=0; j<Math.ceil(canvas.width/backgroundScale); j++){
            ctx.fillRect(anchorX%backgroundScale + j*backgroundScale-cross/2, anchorY%backgroundScale + i*backgroundScale, cross+1, 1);
            ctx.fillRect(anchorX%backgroundScale + j*backgroundScale, anchorY%backgroundScale + i*backgroundScale-cross/2, 1, cross+1);
        }
    }
}

function clear(){
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function draw(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    clear();
    drawBackground();
    drawPolygon();
    drawPoints();

    //rayCast();
}

function rayCast(){
    ctx.strokeStyle="#f00";
    points.forEach(el => {
        ctx.beginPath();
        ctx.moveTo(el[0], el[1]);
        ctx.lineTo(el[0]+100*Math.cos(el[2]), el[1]-100*Math.sin(el[2]));
        ctx.stroke();
        ctx.closePath();
    });
}

function drawPoints(){
    points.forEach(el => {

        let c = 0;
        for(let i=0; i<polygon.length; i++){
            let A = polygon[i];
            let B;
            if(i==polygon.length-1) B = polygon[0];
            else B = polygon[i+1];
            let alpha = el[2];
            let q = Math.cos(alpha)*(B[1]-A[1])-Math.sin(alpha)*(B[0]-A[0]);
            if(q==0) continue;
            let t = ((A[0]-el[0])*(B[1]-A[1])-(A[1]-el[1])*(B[0]-A[0])) / q;
            let u = ((A[0]-el[0])*Math.sin(alpha)-(A[1]-el[1])*Math.cos(alpha)) / q;

            if(t>=0 && (u>=0 && u<=1)) c++;
        }
        if(c%2==0) ctx.fillStyle="#f00";
        else ctx.fillStyle="#000";
        
        ctx.beginPath();
        ctx.arc(el[0], el[1], 7.5, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    })
}

function drawPolygon(){
    ctx.fillStyle=`hsla(${hue},100%,50%,25%)`;
    ctx.strokeStyle=`hsl(${hue},100%,50%)`;

    if(!polygon.length) return;
    ctx.beginPath();
    ctx.moveTo(polygon[0][0], polygon[0][1]);
    for(let i=1; i<polygon.length; i++){
        ctx.lineTo(polygon[i][0], polygon[i][1]);
    }
    ctx.lineTo(polygon[0][0], polygon[0][1]);
    ctx.lineWidth=2;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function init(){
    draw();
}

document.body.addEventListener("click",(e)=>{
    polygon.push([e.clientX, e.clientY]);
    draw();
})

document.body.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
})

document.body.addEventListener("auxclick",(e)=>{
    let angle = Math.floor(Math.random()*2*Math.PI);
    points.push([e.clientX, e.clientY, angle]);
    draw();
})

window.onload=()=>init();
window.onresize=()=>draw();