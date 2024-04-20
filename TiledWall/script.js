let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

window.onresize=()=>{
    location.reload();
}

function draw(color, x, y, w, h){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
}

function clear(){
    draw("black",0,0,canvas.clientWidth,canvas.clientHeight);
}

clear();

const tileSize = 20;
const tileMargin = 10;

let rows = Math.trunc(canvas.clientHeight/(2*tileMargin+tileSize));
let columns = Math.trunc(canvas.clientWidth/(2*tileMargin+tileSize));

let tileset = new Array(rows);

for(let i=0; i<rows; i++){
    tileset[i] = new Array(columns);
    for(let j=0; j<columns; j++){
        tileset[i][j] = 0;
    }
}

function positionTiles(){
    clear();
    for(let i=0; i<rows; i++){
        for(let j=0; j<columns; j++){
            draw("white",(tileMargin+j*(tileSize+2*tileMargin))-tileset[i][j],(tileMargin+i*(tileSize+2*tileMargin))-tileset[i][j], tileSize+2*tileset[i][j], tileSize+2*tileset[i][j]);
        }
    }
}

let xc=0;

function incremental(){
    xc+=0.1;

    for(let i=0; i<rows; i++){
        for(let j=0; j<columns; j++){

            let a = tileMargin/3;
            let b = 0.5;

            tileset[i][j] = a*Math.sin(b*(i+j)-xc);
        }
    }
    positionTiles();
}

let interval = setInterval(incremental, 16.67);

positionTiles();