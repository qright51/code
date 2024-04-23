let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

let slider = document.getElementById("range");
let outputDegree = document.getElementById("output"); 

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight-4;
document.body.style.backgroundColor="#000";

let phi = 0;

let anchorX = 0;
let anchorY = 0;

//let vectorA = [[canvas.width/2-50,canvas.height/2],[canvas.width/2+50,canvas.height/2]];
let pointX = 0;
let pointY = 0;

let points = 51;
let distance=5;

let superArray = getArray();

function getArray(){
    let array = new Array(points);

    for(let i=0; i<points; i++){

        array[i]=new Array(points);

        for(let j=0; j<points; j++){
            array[i][j]=new Array(2);
            array[i][j][0]=(-Math.trunc(points/2)*distance)+(j*distance);
            array[i][j][1]=(-Math.trunc(points/2)*distance)+(i*distance);
        }
    }

    return array;
}

function calculateNextPoint(phi,x,y){
    let angle=0;
    if(x!=0) {angle = Math.atan(y/x); if(x<0) angle=Math.PI+angle;}
    else {if(y>0) angle = Math.PI/2; else if(y<0) angle=-Math.PI/2; else angle=0;}
    return new Array (parseFloat(parseFloat(Math.sqrt(((anchorX-x)*(anchorX-x))+((anchorY-y)*(anchorY-y)))*Math.cos(phi+angle)).toFixed(4)),parseFloat(parseFloat(Math.sqrt(((anchorX-x)*(anchorX-x))+((anchorY-y)*(anchorY-y)))*Math.sin(phi+angle)).toFixed(4)));
}

slider.oninput = function() {
    distance=this.value;
    superArray = getArray();
}

function cycle(){
    phi+=0.02;
    if(phi>=2*Math.PI) phi=0;
    output.innerHTML = (phi*180/Math.PI).toFixed(2)+"°";

    ctx.fillStyle="#000";
    ctx.fillRect(0,0,canvas.width, canvas.height);

    let radius = 2;

    //drawing

    for(let i=0; i<superArray.length; i++){
        for(let j=0; j<superArray[0].length; j++){
            pointX=superArray[i][j][0];
            pointY=superArray[i][j][1];

            let array = calculateNextPoint(phi,pointX,pointY);
            pointX = array[0];
            pointY = array[1];

            let actualAnchorX = anchorX+canvas.width/2;
            let actualAnchorY = (-anchorY)+canvas.height/2;

            let actualX = (anchorX+pointX)+canvas.width/2;
            let actualY = -(anchorY+pointY)+canvas.height/2;

            ctx.fillStyle="#ff0";
            ctx.fillRect(actualAnchorX-radius,actualAnchorY-radius,2*radius,2*radius);

            ctx.fillStyle="#fff";
            ctx.fillRect(actualX-radius,actualY-radius,2*radius,2*radius);
        }
    }
}

setInterval(cycle,1);