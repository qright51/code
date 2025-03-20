let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

canvas.width = 800;
canvas.height = 800;

var settings = {
    difficultyScale: 16,        // 10 is optimal
    percentageOfMines: 0.15     // [0,1)
}

var field;
var flags = 0;
var gameRunning = false;

/*

    FIELD:

    0 - default, undiscovered
    1-8 - undiscovered number of mines surrounding the field
    10-18 - discovered fields [ 10 - empty, 11-18 - with text]
    -1 - bomb
    
    20 - undiscovered, flagged
    21-28 - undiscovered, numbered, flagged
    19 - undiscovered bomb, flagged

*/

let scale = settings.difficultyScale;
const undiscoveredImg = new Image();
undiscoveredImg.src = "img/undiscovered.png";
const discoveredImg = new Image();
discoveredImg.src = "img/discovered.png";
const bomb = new Image();
bomb.src = "img/bomb.png";
const flag = new Image();
flag.src = "img/flag.png";

window.onload=()=>{
    field = new Array(scale);
    for(let i=0; i<scale; i++){
        field[i] = new Array(scale);
        for(let j=0; j<scale; j++){
            field[i][j] = 0;
        }
    }

    populateMines();
    draw();


    gameRunning = true;
}

function populateMines(){
    let numberOfMines = Math.floor(settings.percentageOfMines*scale*scale);
    for(let i=0; i<numberOfMines; i++){
        while(settings.percentageOfMines<=1){
            let x = Math.floor(Math.random()*scale);
            let y = Math.floor(Math.random()*scale);
            if(field[y][x]==0){
                field[y][x]=-1;
                break;
            }
        }
    }
}

function draw(){
    for(let i=0; i<scale; i++){
        for(let j=0; j<scale; j++){
            ctx.drawImage(undiscoveredImg, 0, 0, 32, 32, j*canvas.width/scale, i*canvas.height/scale, canvas.width/scale, canvas.height/scale);
            if(field[i][j]!=-1) continue;

            if(j<(scale-1) && field[i][j+1]!=-1) field[i][j+1]++;
            if(j>0 && field[i][j-1]!=-1) field[i][j-1]++;    
            if(i<(scale-1) && j<(scale-1) && field[i+1][j+1]!=-1) field[i+1][j+1]++;
            if(i<(scale-1) && field[i+1][j]!=-1) field[i+1][j]++;    
            if(j>0 && i<(scale-1) && field[i+1][j-1]!=-1) field[i+1][j-1]++;
            if(i>0 && j<(scale-1) && field[i-1][j+1]!=-1) field[i-1][j+1]++;
            if(i>0 && field[i-1][j]!=-1) field[i-1][j]++;    
            if(i>0 && j>0 && field[i-1][j-1]!=-1) field[i-1][j-1]++;
        }
    }
}


function endGame(){
    for(let i=0; i<scale; i++){
        for(let j=0; j<scale; j++){
            if(field[i][j]==-1 || field[i][j]==19){
                if(field[i][j]==19) ctx.drawImage(undiscoveredImg, 0, 0, 32, 32, j*canvas.width/scale, i*canvas.height/scale, canvas.width/scale, canvas.height/scale);
                ctx.drawImage(bomb, 0, 0, 32, 32, j*canvas.width/scale, i*canvas.height/scale, canvas.width/scale, canvas.height/scale);
            }
        }
    }

    console.log("Game Over!");
    gameRunning = false;
}

function markField(j,i){
    if(field[i][j]>=19 && field[i][j]<=28){
        if(flags <= 0) return;
        flags--;
        field[i][j]-=20;
        ctx.drawImage(undiscoveredImg, 0, 0, 32, 32, j*canvas.width/scale, i*canvas.height/scale, canvas.width/scale, canvas.height/scale);
    }
    else if(field[i][j]>=-1 && field[i][j]<=8){
        if(flags >= Math.floor(settings.percentageOfMines*scale*scale)) return;
        flags++;
        field[i][j]+=20;
        ctx.drawImage(undiscoveredImg, 0, 0, 32, 32, j*canvas.width/scale, i*canvas.height/scale, canvas.width/scale, canvas.height/scale);
        ctx.drawImage(flag, 0, 0, 32, 32, j*canvas.width/scale, i*canvas.height/scale, canvas.width/scale, canvas.height/scale);
    }
}

function selectField(j,i){

    if(field[i][j]>=10 && field[i][j]<=18) return;
    if(field[i][j]>=19 && field[i][j]<=28){ // if flagged, remove flag, decrease flag, redraw with discoveredImg
        flags--; // check for possible bugs
        field[i][j]-=20;
    }
    if(field[i][j]>=0 && field[i][j]<=8){
        floodFill(j,i);
    }

    //if(field[i][j]!=-1) field[i][j]+=10;

    ctx.drawImage(discoveredImg, 0, 0, 32, 32, j*canvas.width/scale, i*canvas.height/scale, canvas.width/scale, canvas.height/scale);

    if(field[i][j]==-1 || field[i][j]==19){
        endGame();
    }

    drawText(j,i);
}

function floodFill(j,i){
    let s = new Array();
    s.push({i,j});
    while(s.length>0){
        let n = s.shift();        
        if(field[n.i][n.j]>=0 && field[n.i][n.j]<=8){
            field[n.i][n.j]+=10;

            if(field[n.i][n.j]==10){
                if(n.i>=1 && field[n.i-1][n.j]>=0 && field[n.i-1][n.j]<=8) s.push({i:n.i-1,j:n.j});
                if(n.i<(scale-1) && field[n.i+1][n.j]>=0 && field[n.i+1][n.j]<=8) s.push({i:n.i+1,j:n.j});
                if(n.j>=1 && field[n.i][n.j-1]>=0 && field[n.i][n.j-1]<=8) s.push({j:n.j-1,i:n.i});
                if(n.j<(scale-1) && field[n.i][n.j+1]>=0 && field[n.i][n.j+1]<=8) s.push({j:n.j+1,i:n.i});
            }

            ctx.drawImage(discoveredImg, 0, 0, 32, 32, n.j*canvas.width/scale, n.i*canvas.height/scale, canvas.width/scale, canvas.height/scale);
            if(field[n.i][n.j]!=10) drawText(n.j,n.i);
        }

    }
}

function drawText(j,i){
    ctx.font = "bold "+Math.round(8+0.5*canvas.width/scale)+"px Courier";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    switch(field[i][j]){
        case 11:
            ctx.fillStyle="#00f";
            ctx.fillText("1",(j+0.5)*canvas.width/scale, (i+0.5)*canvas.height/scale);
            break;
        case 12:
            ctx.fillStyle="#060";
            ctx.fillText("2",(j+0.5)*canvas.width/scale, (i+0.5)*canvas.height/scale);
            break;
        case 13:
            ctx.fillStyle="#f00";
            ctx.fillText("3",(j+0.5)*canvas.width/scale, (i+0.5)*canvas.height/scale);
            break;
        case 14:
            ctx.fillStyle="#b00";
            ctx.fillText("4",(j+0.5)*canvas.width/scale, (i+0.5)*canvas.height/scale);
            break;
        case 15:
            ctx.fillStyle="#900";
            ctx.fillText("5",(j+0.5)*canvas.width/scale, (i+0.5)*canvas.height/scale);
            break;
        case 16:
            ctx.fillStyle="#700";
            ctx.fillText("6",(j+0.5)*canvas.width/scale, (i+0.5)*canvas.height/scale);
            break;
        case 17:
            ctx.fillStyle="#500";
            ctx.fillText("7",(j+0.5)*canvas.width/scale, (i+0.5)*canvas.height/scale);
            break;
        case 18:
            ctx.fillStyle="#400";
            ctx.fillText("8",(j+0.5)*canvas.width/scale, (i+0.5)*canvas.height/scale);
            break;
    }
}

canvas.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
    if(gameRunning) markField(Math.floor(e.offsetX*scale/canvas.width), Math.floor(e.offsetY*scale/canvas.height));
});

canvas.addEventListener("click",(e)=>{
    if(gameRunning) selectField(Math.floor(e.offsetX*scale/canvas.width), Math.floor(e.offsetY*scale/canvas.height));

    let c = 0;
    for(let i=0; i<scale; i++){
        for(let j=0; j<scale; j++){
            if(field[i][j]>=0 && field[i][j]<=8 || field[i][j]>=20 && field[i][j]<=28) c++;
        }
    }
    if(c==0){
        console.log("You won!");
        gameRunning = false;
    }
});

canvas.addEventListener("mousemove",(e)=>{
    let i = Math.floor(e.offsetY*scale/canvas.height), j = Math.floor(e.offsetX*scale/canvas.width);
    if(field[i][j] >= -1 && field[i][j]<10 || field[i][j]>18 && field[i][j]<=28) canvas.style.cursor = "pointer";
    else canvas.style.cursor = "default";
});