let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let nodes = [];

const numberOfNodes = 200;
const mouseRange = 150;

canvas.addEventListener("mousemove",(e)=>{
    clear()
    let m = [e.clientX, e.clientY];
    for(let a of nodes){
        let r = range(m,a);
        if(r<=mouseRange){
            line(m,a,r)
        }
        circle(a[0],a[1],r);
    }
})


canvas.addEventListener("touchmove",(e)=>{
    clear()
    let m = [e.touches[0].clientX, e.touches[0].clientY];
    for(let a of nodes){
        let r = range(m,a);
        if(r<=mouseRange){
            line(m,a,r)
        }
        circle(a[0],a[1],r);
    }
})

window.onload=()=>{
    init();
}

function init(){
    for(let i=0; i<numberOfNodes; i++){
        let x = Math.floor(Math.random()*(canvas.width-4))+2 // x axis
        let y = Math.floor(Math.random()*(canvas.height-4))+2 // y axis
        nodes[i] = [x,y]
    }

    draw()
}

function draw(){
    for(let a of nodes){
        
    }
}

function clear(){
    ctx.fillStyle="#000"
    ctx.fillRect(0,0,canvas.width,canvas.height)
}

function line(p1,p2,r){
    ctx.beginPath();
    ctx.moveTo(p1[0],p1[1]);
    ctx.lineTo(p2[0],p2[1]);
    ctx.lineWidth=2;
    r<=0.1*mouseRange?ctx.strokeStyle="hsl(0, 0%, 100%)":ctx.strokeStyle=`hsl(0, 0%, ${-1000*r/(9*mouseRange)+1000/9}%)`;
    ctx.stroke();
}

function circle(x, y, r){
    ctx.beginPath()
    ctx.arc(x, y, 2, 0, 2*Math.PI)
    r<=1*mouseRange?ctx.fillStyle="hsl(0, 0%, 100%)":ctx.fillStyle=`hsl(0, 0%, ${-50*r/(mouseRange)+100}%)`;
    ctx.fill()
}

function range(p1,p2){
    return Math.sqrt(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2))
}