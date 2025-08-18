let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const cellSize = 36;
var grid;
var counter;
var averageArray = new Array();

// 0 - empty
// 1 - missed hit
// 2 - ship
// 3 - hit ship

function clear(){
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function init(){
    counter = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    grid = new Array(10);
    for(let i=0; i<10; i++){
        grid[i] = new Array(10);
        for(let j=0; j<10; j++){
            grid[i][j]=0;
        }
    }

    clear();

    draw("center");
    draw("ships");
    draw("positions");
    draw("text");
    draw("title");
}

function draw(type){

    if(type==="center"){
        ctx.fillStyle="#1a1a1a";
        ctx.fillRect(canvas.width/2-(11*cellSize)/2, canvas.height/2-(11*cellSize)/2, 11*cellSize, 11*cellSize);

        ctx.fillStyle="#222";
        ctx.fillRect(canvas.width/2-(11*cellSize)/2 + cellSize, canvas.height/2-(11*cellSize)/2 + cellSize, 10*cellSize, 10*cellSize);

        return;
    }

    if(type==="positions"){
        ctx.strokeStyle="#aaa";
        
        for(let i=0; i<10; i++){
            for(let j=0; j<10; j++){
                ctx.beginPath();

                ctx.arc(canvas.width/2-(11*cellSize)/2 + 1.5*cellSize+j*cellSize, canvas.height/2-(11*cellSize)/2 + 1.5*cellSize+i*cellSize, 5, 0, 2*Math.PI);

                if(grid[i][j]==1) ctx.fillStyle="#fff";
                else if(grid[i][j]==3) ctx.fillStyle="#f00";
                else ctx.fillStyle="#222";

                ctx.fill();
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }


        return;
    }

    if(type==="ships"){
        fill(5);
        fill(4);
        fill(3);
        fill(3);
        fill(2);
    }

    if(type=="text"){
        ctx.fillStyle="#aaa";
        ctx.font = cellSize/2+"px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for(let i=0; i<10; i++) ctx.fillText(String.fromCharCode(65 + i), canvas.width/2-(10*cellSize)/2, canvas.height/2-(10*cellSize)/2 + (i+1)*cellSize);
        for(let j=0; j<10; j++) ctx.fillText(""+(j+1), canvas.width/2-(10*cellSize)/2 + (j+1)*cellSize, canvas.height/2-(10*cellSize)/2);
        return;
    }

    if(type==="title"){
        return;
    }
}

function fill(n){
    let condition = false;
    if(Math.floor(Math.random()*2)){
        let x, y;
        while(!condition){
            x = Math.floor(Math.random()*(10-n+1));
            y = Math.floor(Math.random()*10);

            condition=true;
            for(let i=0; i<n; i++){
                if(grid[y][x+i]==2){
                    condition=false;
                }
            }
            if(condition){
                ctx.fillStyle="#fff";
                for(let i=0; i<n; i++){
                    grid[y][x+i]=2;

                    if(i==0 || i==(n-1)){
                        ctx.beginPath();
                        ctx.arc(canvas.width/2-(11*cellSize)/2+1.5*cellSize+(x+i)*cellSize, canvas.height/2-(11*cellSize)/2+1.5*cellSize+y*cellSize, 0.4*cellSize, 0, 2*Math.PI);
                        ctx.fill();
                    }
                    else{
                        ctx.fillRect(canvas.width/2-(11*cellSize)/2+1.5*cellSize+(x+i-1)*cellSize, canvas.height/2-(11*cellSize)/2+1.1*cellSize+y*cellSize, 2*cellSize, 0.8*cellSize);
                    }

                    if(n==2){
                        ctx.fillRect(canvas.width/2-(11*cellSize)/2+1.5*cellSize+x*cellSize, canvas.height/2-(11*cellSize)/2+1.1*cellSize+y*cellSize, cellSize, 0.8*cellSize);
                    }
                }
            }
        }
    }
    else{
        let x, y;
        while(!condition){
            x = Math.floor(Math.random()*10);
            y = Math.floor(Math.random()*(10-n+1));

            condition=true;
            for(let i=0; i<n; i++){
                if(grid[y+i][x]==2){
                    condition=false;
                }
            }
            if(condition){
                ctx.fillStyle="#fff";
                for(let i=0; i<n; i++){
                    grid[y+i][x]=2;

                    if(i==0 || i==(n-1)){
                        ctx.beginPath();
                        ctx.arc(canvas.width/2-(11*cellSize)/2+1.5*cellSize+x*cellSize, canvas.height/2-(11*cellSize)/2+1.5*cellSize+(y+i)*cellSize, 0.4*cellSize, 0, 2*Math.PI);
                        ctx.fill();
                    }
                    else{
                        ctx.fillRect(canvas.width/2-(11*cellSize)/2+1.1*cellSize+x*cellSize, canvas.height/2-(11*cellSize)/2+1.5*cellSize+(y+i-1)*cellSize, 0.8*cellSize, 2*cellSize);
                    }

                    if(n==2){
                        ctx.fillRect(canvas.width/2-(11*cellSize)/2+1.1*cellSize+x*cellSize, canvas.height/2-(11*cellSize)/2+1.5*cellSize+y*cellSize, 0.8*cellSize, cellSize);
                    }
                }
            }
        }
    }
}

window.onload=()=>init();

var counting = 0;
let countingInterval = setInterval(()=>{
    let x = Math.floor(Math.random()*10);
    let y = Math.floor(Math.random()*10);
    while((grid[y][x]==1 || grid[y][x]==3) && counter<(5+4+3+3+2)){
        x = Math.floor(Math.random()*10);
        y = Math.floor(Math.random()*10);
    }
    if(counter>=(5+4+3+3+2)){
        averageArray.push(counting);
        let average = 0;
        averageArray.forEach(el=>average+=el);
        average /= averageArray.length;
        console.log("["+averageArray.length+"] "+"Total steps until winning: "+counting+"\t Average: "+parseFloat(average).toFixed(2));
        //clearInterval(countingInterval);

        counting = 0;
        init();
        return;
    }
    if(grid[y][x]==2) counter++;
    if(grid[y][x]==0 || grid[y][x]==2) grid[y][x]++;
    counting++;
    draw("positions");
}, 1);