let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let points = [];

let distance = 300;
let grain = 1;

function init(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function redraw(){
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for(let i=0; i<canvas.height/grain; i++){
        if(!points.length) break;
        let y = i*grain;
        for(let j=0; j<canvas.width/grain; j++){
            let x = j*grain;
            let min = 0;
            for(let k=1; k<points.length; k++){
                if((x-points[k][0])*(x-points[k][0])+(y-points[k][1])*(y-points[k][1])<(x-points[min][0])*(x-points[min][0])+(y-points[min][1])*(y-points[min][1]))
                    min = k;
            }
            
            if((x-points[min][0])*(x-points[min][0])+(y-points[min][1])*(y-points[min][1])>distance*distance) continue;
            ctx.fillStyle=points[min][2];
            ctx.fillRect(x,y,grain,grain);
        }
    }

    ctx.fillStyle="#000";
    for(let i=0; i<points.length; i++){
        ctx.beginPath();
        ctx.arc(points[i][0], points[i][1], 10, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}

document.body.addEventListener("click",(e)=>{
    let color = Math.floor(Math.random()*360);
    color = `hsl(${color}, 100%, 60%)`;

    points.push([e.clientX, e.clientY, color]);

    redraw();
})

window.onload=()=>init();