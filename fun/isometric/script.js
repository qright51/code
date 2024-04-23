let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

window.onresize=()=>{
    location.reload();
}

function point(x,y,z=0){
    let sizeOffset = 5;

    ctx.fillStyle="white";
    ctx.fillRect(x-sizeOffset/2,y-sizeOffset/2-z,sizeOffset,sizeOffset);
}

function clear(){
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

let arraySize = 25;

let array = new Array(arraySize);
for(let i=0; i<arraySize; i++){
    array[i] = new Array(arraySize);
    for(let j=0; j<arraySize; j++){
        array[i][j] = 0;
    }
}

function reposition(){
    clear();
    for(let i=0; i<arraySize; i++){
        for(let j=0; j<arraySize; j++){

            let const1 = (canvas.height/2)/arraySize;
            let const2 = const1;

            let deltaX = 1;
            let deltaY = 0.5;

            let fX = i*deltaX*const1-j*deltaX*const2;
            let fY = deltaY*i*const1+deltaY*j*const2;

            let limit = deltaY*(arraySize-1)*(const1+const2);

            point(fX+canvas.width/2, fY+(canvas.height-limit)/2, array[i][j]);
        }
    }
}

let xc = 0;

function changeArray(){
    xc+=0.1;

    for(let i=0; i<arraySize; i++){
        for(let j=0; j<arraySize; j++){

            let a = 50;
            let b = 0.25;

            array[i][j] = a*Math.sin(b*(i)-xc);
        }
    }
    reposition();
}

let interval = setInterval(changeArray, 16.67);

clear();
reposition();