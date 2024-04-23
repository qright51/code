let wheel = document.getElementById("wheel");
let ratio = document.getElementById("ratio-text");

document.body.style.backgroundColor="rgba(128,128,128)";

let angle=0;

function change(x){
    if(x>=-120 && x<=120){
        wheel.style.transform="rotateZ("+x+"deg)";
        angle=x;
        x+=120;
        let percentage = Math.trunc(x/240*100);
        ratio.innerText=percentage+"%";
        let value = 2.55*percentage;
        document.body.style.backgroundColor="rgba("+value+","+value+","+value+")";
    }
}

let mouseState=0;
let mouseX=-1;
let mouseY=-1;
let midX=window.innerWidth/2;
let midY=window.innerHeight/2;
let prevX=-1;
let prevY=-1;

window.addEventListener("mousemove",(e)=>{if(mouseState>=1) {mouseState=2; prevX=mouseX; prevY=mouseY; mouseX=e.pageX; mouseY=e.pageY; getCurrentAngle();}});
wheel.addEventListener("mousedown",(e)=>{if(mouseState==0) {mouseState=1; mouseX=e.pageX; mouseY=e.pageY; prevX=e.pageX; prevY=e.pageY;}});
wheel.addEventListener("touchstart",(e)=>{if(mouseState==0) {mouseState=1; mouseX=e.touches[0].pageX; mouseY=e.touches[0].pageY; prevX=e.touches[0].pageX; prevY=e.touches[0].pageY;}});
window.addEventListener("touchmove",(e)=>{if(mouseState>=1) {mouseState=2; prevX=mouseX; prevY=mouseY; mouseX=e.touches[0].pageX; mouseY=e.touches[0].pageY; getCurrentAngle();}});
window.addEventListener("mouseup",()=>{mouseState=0; mouseX=-1; mouseY=-1; prevX=-1; prevY=-1;});
wheel.addEventListener("touchend",()=>{mouseState=0; mouseX=-1; mouseY=-1; prevX=-1; prevY=-1;});

window.addEventListener("resize",()=>{
    midX=window.innerWidth/2;
    midY=window.innerHeight/2;
});

function getCurrentAngle(){
    let deltaX=mouseX-midX;
    let deltaY=mouseY-midY;
    let angleS=Math.atan(deltaX/deltaY)*180/Math.PI;
    if(deltaY>0) angleS+=180;
    else if(deltaY<0 && deltaX<0) angleS+=360;

    let deltaX2=prevX-midX;
    let deltaY2=prevY-midY;
    let angleX=Math.atan(deltaX2/deltaY2)*180/Math.PI;
    if(deltaY2>0) angleX+=180;
    else if(deltaY2<0 && deltaX2<0) angleX+=360;

    let difference = angleX-angleS;
    change(Math.round(difference+angle));
}