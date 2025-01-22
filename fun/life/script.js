let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let cellSize = 10;
let frameRate = 60; // frames per second (ideal case or rendering)

let state;
let cells;
let button;
let sim_stop;

// processes:

// 1. population (draw the initial LIVE cells)
// 2. search (for each cell generate LIVE/DEAD state for next generation)
// 3. run simulation (kill off DEAD cells, populate LIVE cells)
// 4. run search again through another tick

window.onload=()=>{
    init();
}

window.onresize=()=>{
    init();
}


function clear(){
    ctx.fillStyle="#000";
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

let fileInput;
function loadFile(){
    fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';

    let fileBuffer = new Array();

    fileInput.addEventListener("change", (event) => {

        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const arrayBuffer = reader.result;
                const byteArray = new Uint8Array(arrayBuffer);

                byteArray.forEach((byte) => {
                    for (let i = 7; i >= 0; i--) {
                        fileBuffer.push((byte >> i) & 1);
                    }
                });
  
                for(let i=0; i<cells.length; i++){
                    for(let j=0; j<cells[0].length; j++){
                        if(i*cells.length+j >= fileBuffer.length) break;
                        if(fileBuffer[i*cells.length+j]) cells[i][j]=true;
                    }
                }
                draw();

            };

            reader.readAsArrayBuffer(file);
        }
    });
}

function init(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    clear();
    state = false;
    sim_stop = false;
    cells = new Array(Math.trunc(canvas.height/cellSize));
    for(let i=0; i<cells.length; i++){
        cells[i] = new Array(Math.trunc(canvas.width/cellSize));
    }
    document.body.style.cursor="crosshair";

    loadFile();
}

function simulation(){
    draw();

    let drawer = new Array(cells.length);
    for(let i=0; i<cells.length; i++){
        drawer[i] = new Array(cells[0].length);
        for(let j=0; j<cells[0].length; j++){
            drawer[i][j] = cells[i][j];
        }
    }

    for(let i=0; i<cells.length; i++){
        for(let j=0; j<cells[0].length; j++){
            let neighbours = 0;

            if(i-1>=0){
                if(j-1>=0) if(cells[i-1][j-1]) neighbours++;
                if(j+1<=cells[0].length-1) if(cells[i-1][j+1]) neighbours++;
                if(cells[i-1][j]) neighbours++;
            }
            if(i+1<=cells.length-1){
                if(j-1>=0) if(cells[i+1][j-1]) neighbours++;
                if(j+1<=cells[0].length-1) if(cells[i+1][j+1]) neighbours++;
                if(cells[i+1][j]) neighbours++;
            }
            if(j-1>=0) if(cells[i][j-1]) neighbours++;
            if(j+1<=cells[0].length-1) if(cells[i][j+1]) neighbours++;

            if(cells[i][j] && neighbours<2) drawer[i][j] = false; // rule 1
            if(cells[i][j] && (neighbours==2 || neighbours==3)) drawer[i][j] = true; // rule 2
            if(cells[i][j] && neighbours>3) drawer[i][j] = false; // rule 3
            if(!cells[i][j] && neighbours==3) drawer[i][j] = true; // rule 4
        }
    }

    sim_stop = true;
    for(let i=0; i<cells.length; i++){
        for(let j=0; j<cells[0].length; j++){
            if(cells[i][j]!=drawer[i][j]) sim_stop=false;
            cells[i][j] = drawer[i][j];
        }
    }

    if(sim_stop){
        console.log("Simulation ended!")
        clearInterval(sim_interval);
        document.body.style.cursor="crosshair";
        state = !state;
    }

    
}

function draw(){
    clear();
    ctx.fillStyle="#fff";
    for(let i=0; i<cells.length; i++){
        for(let j=0; j<cells[0].length; j++){
            if(cells[i][j]) ctx.fillRect(j*cellSize, i*cellSize, cellSize, cellSize);
        }
    }

    ctx.fillStyle="#000";
    for(let i=0; i<Math.trunc(canvas.height/cellSize); i++){
        ctx.fillRect(0, i*cellSize-0.5, canvas.width, 1);
    }
    for(let j=0; j<Math.trunc(canvas.width/cellSize); j++){
        ctx.fillRect(j*cellSize-0.5, 0, 1, canvas.height);
    }
}

let sim_interval;
document.body.addEventListener("keypress",(e)=>{
    if(e.key="enter"){
        if(!state){
            sim_interval = setInterval(simulation,1000.0/frameRate);
            console.log("Simulation started!")
            document.body.style.cursor="none";
        }
        else{
            clearInterval(sim_interval);
            console.log("Simulation ended!")
            document.body.style.cursor="crosshair";
        }
        state = !state;
    }
});

document.body.addEventListener("mousedown",(e)=>{
    if(!state){
        let x = Math.trunc(e.clientX/cellSize);
        let y = Math.trunc(e.clientY/cellSize);

        if(e.button==0){
            cells[y][x] = true;
            button = 0;
        }
        else if(e.button==1){
            if(fileInput) fileInput.click();
            button = -1;
        }
        else if(e.button==2){
            cells[y][x] = false;
            button = 2;
        }
        draw();
    }
    else button = -1;
});

document.body.addEventListener("mouseleave",(e)=>{
    button = -1;
});


document.body.addEventListener("mouseup",(e)=>{
    button = -1;
});

document.body.addEventListener("mousemove",(e)=>{
    if(!state){
        let x = Math.trunc(e.clientX/cellSize);
        let y = Math.trunc(e.clientY/cellSize);

        if(button==0){
            cells[y][x] = true;
        }
        else if(button==2){
            cells[y][x] = false;
        }
        draw();
    }
});

document.body.addEventListener("contextmenu", e => e.preventDefault());
