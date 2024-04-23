let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

let scale = 0.2;

let img = new Image();
img.src="segment.png";

function time(){
    let t = new Date();
    let arr = new Array(6);
    arr = [Math.trunc(t.getHours()/10),t.getHours()%10,Math.trunc(t.getMinutes()/10),t.getMinutes()%10,Math.trunc(t.getSeconds()/10),t.getSeconds()%10];
    return arr;
}

function init(){
    canvas.width = 1920;
    canvas.height = 947;
    rect("black",0,0,canvas.width,canvas.height);
    document.body.style.backgroundColor="black";

    let x = false;

    img.onload=()=>{
        if(!x){
            let t = new Date();
            let y = t.getSeconds();
            while(y==t.getSeconds()){t = new Date();}
            setInterval(render,1000);
            x=!x;
        }
    }
}

function render(){
    ctx.setTransform(1,0,0,1,0,0);
    rect("black",0,0,canvas.width,canvas.height);

    let time_arr = time();

    let digit_arr = [digit(time_arr[0]),digit(time_arr[1]),digit(time_arr[2]),digit(time_arr[3]),digit(time_arr[4]),digit(time_arr[5])];

            draw(112.5/450*canvas.width,canvas.height/2-(1/18*canvas.width),scale,0,digit_arr[0][0]);
            draw(100/450*canvas.width,canvas.height/2-(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[0][5]);
            draw(125/450*canvas.width,canvas.height/2-(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[0][1]);
            draw(112.5/450*canvas.width,canvas.height/2,scale,0,digit_arr[0][6]);
            draw(112.5/450*canvas.width,canvas.height/2+(1/18*canvas.width),scale,0,digit_arr[0][3]);
            draw(100/450*canvas.width,canvas.height/2+(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[0][4]);
            draw(125/450*canvas.width,canvas.height/2+(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[0][2]);

            draw(150/450*canvas.width,canvas.height/2-(1/18*canvas.width),scale,0,digit_arr[1][0]);
            draw(137.5/450*canvas.width,canvas.height/2-(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[1][5]);
            draw(162.5/450*canvas.width,canvas.height/2-(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[1][1]);
            draw(150/450*canvas.width,canvas.height/2,scale,0,digit_arr[1][6]);
            draw(150/450*canvas.width,canvas.height/2+(1/18*canvas.width),scale,0,digit_arr[1][3]);
            draw(137.5/450*canvas.width,canvas.height/2+(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[1][4]);
            draw(162.5/450*canvas.width,canvas.height/2+(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[1][2]);

            
            ctx.setTransform(scale, 0, 0, scale, 178.125/450*canvas.width,canvas.height/2);
            rect("#3E17FF",-64,-192,128,128);

            ctx.setTransform(scale, 0, 0, scale, 178.125/450*canvas.width,canvas.height/2);
            rect("#3E17FF",-64,128,128,128);

            draw(206.25/450*canvas.width,canvas.height/2-(1/18*canvas.width),scale,0,digit_arr[2][0]);
            draw(193.75/450*canvas.width,canvas.height/2-(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[2][5]);
            draw(218.75/450*canvas.width,canvas.height/2-(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[2][1]);
            draw(206.25/450*canvas.width,canvas.height/2,scale,0,digit_arr[2][6]);
            draw(206.25/450*canvas.width,canvas.height/2+(1/18*canvas.width),scale,0,digit_arr[2][3]);
            draw(193.75/450*canvas.width,canvas.height/2+(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[2][4]);
            draw(218.75/450*canvas.width,canvas.height/2+(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[2][2]);

            draw(canvas.width-206.25/450*canvas.width,canvas.height/2-(1/18*canvas.width),scale,0,digit_arr[3][0]);
            draw(canvas.width-193.75/450*canvas.width,canvas.height/2-(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[3][1]);
            draw(canvas.width-218.75/450*canvas.width,canvas.height/2-(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[3][5]);
            draw(canvas.width-206.25/450*canvas.width,canvas.height/2,scale,0,digit_arr[3][6]);
            draw(canvas.width-206.25/450*canvas.width,canvas.height/2+(1/18*canvas.width),scale,0,digit_arr[3][3]);
            draw(canvas.width-193.75/450*canvas.width,canvas.height/2+(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[3][2]);
            draw(canvas.width-218.75/450*canvas.width,canvas.height/2+(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[3][4]);

            ctx.setTransform(scale, 0, 0, scale, canvas.width-178.125/450*canvas.width,canvas.height/2);
            rect("#3E17FF",-64,-192,128,128);

            ctx.setTransform(scale, 0, 0, scale, canvas.width-178.125/450*canvas.width,canvas.height/2);
            rect("#3E17FF",-64,128,128,128);

            draw(canvas.width-150/450*canvas.width,canvas.height/2-(1/18*canvas.width),scale,0,digit_arr[4][0]);
            draw(canvas.width-137.5/450*canvas.width,canvas.height/2-(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[4][1]);
            draw(canvas.width-162.5/450*canvas.width,canvas.height/2-(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[4][5]);
            draw(canvas.width-150/450*canvas.width,canvas.height/2,scale,0,digit_arr[4][6]);
            draw(canvas.width-150/450*canvas.width,canvas.height/2+(1/18*canvas.width),scale,0,digit_arr[4][3]);
            draw(canvas.width-137.5/450*canvas.width,canvas.height/2+(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[4][2]);
            draw(canvas.width-162.5/450*canvas.width,canvas.height/2+(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[4][4]);

            draw(canvas.width-112.5/450*canvas.width,canvas.height/2-(1/18*canvas.width),scale,0,digit_arr[5][0]);
            draw(canvas.width-100/450*canvas.width,canvas.height/2-(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[5][1]);
            draw(canvas.width-125/450*canvas.width,canvas.height/2-(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[5][5]);
            draw(canvas.width-112.5/450*canvas.width,canvas.height/2,scale,0,digit_arr[5][6]);
            draw(canvas.width-112.5/450*canvas.width,canvas.height/2+(1/18*canvas.width),scale,0,digit_arr[5][3]);
            draw(canvas.width-100/450*canvas.width,canvas.height/2+(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[5][2]);
            draw(canvas.width-125/450*canvas.width,canvas.height/2+(12.5/450*canvas.width),scale,Math.PI/2,digit_arr[5][4]);
}

function rect(color,x,y,w,h){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
}

function drawImage(image, x, y, scale, rotation){
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ctx.rotate(rotation);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    return;
} 

function draw(x,y,scale,rotation,skip=1){
    if(!skip) return;
    drawImage(img,x,y,scale,rotation);
    return;
}

function digit(n){
    let x = new Array(7);
    switch(n){
        case 0:
            x = [1,1,1,1,1,1,0];
            break;
        case 1:
            x = [0,1,1,0,0,0,0];
            break;
        case 2:
            x = [1,1,0,1,1,0,1];
            break;
        case 3:
            x = [1,1,1,1,0,0,1];
            break;
        case 4:
            x = [0,1,1,0,0,1,1];
            break;
        case 5:
            x = [1,0,1,1,0,1,1];
            break;
        case 6:
            x = [1,0,1,1,1,1,1];
            break;
        case 7:
            x = [1,1,1,0,0,0,0];
            break;
        case 8:
            x = [1,1,1,1,1,1,1];
            break;
        case 9:
            x = [1,1,1,1,0,1,1];
            break;
        default:
            x = [0,0,0,0,0,0,0];
            break;                   
    }
    return x;
}

time();
init();

window.onresize=()=>{
    init();
}