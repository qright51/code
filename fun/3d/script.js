let cv = document.getElementById("cv");
let cx = cv.getContext("2d");

cv.width = document.body.clientWidth;
cv.height = document.body.clientHeight;
cl();

var cp = {a:[-100,-100,100],b:[100,-100,100],c:[100,100,100],d:[-100,100,100],e:[-100,-100,-100],f:[100,-100,-100],g:[100,100,-100],h:[-100,100,-100]};

function dp(a){
    let offset = 2;
    cx.fillStyle="white";
    return [(a[0]+750)-offset, ((cv.height-a[1])-250)-offset];
}

function side(p,a,b,c,d){
    cx.beginPath();
    cx.moveTo(a[0], a[1]);
    cx.lineTo(b[0],b[1]);
    cx.lineTo(c[0],c[1]);
    cx.lineTo(d[0],d[1]);
    cx.closePath();

    if(p==0) cx.fillStyle = "#666";
    else if(p==1) cx.fillStyle = "#999";
    else if(p==2) cx.fillStyle = "#ccc";
    else cx.fillStyle = "#fff";
    cx.fill(); 
    cx.lineWidth = 3;
    cx.strokeStyle = "#555";
    cx.stroke();
}

function cl(){
    cx.fillStyle="black";
    cx.fillRect(0,0,cv.width,cv.height);
}

function calcMatrix(a,x){
    a*=Math.PI/180;
    let baseArr = [[Math.cos(a)*Math.cos(gamma), Math.sin(alpha)*Math.sin(a)*Math.cos(gamma)-Math.cos(alpha)*Math.sin(gamma), Math.cos(alpha)*Math.sin(a)*Math.cos(gamma)+Math.sin(alpha)*Math.sin(gamma)],[Math.cos(a)*Math.sin(gamma),Math.sin(alpha)*Math.sin(a)*Math.sin(gamma)+Math.cos(alpha)*Math.cos(gamma),Math.cos(alpha)*Math.sin(a)*Math.sin(gamma)-Math.sin(alpha)*Math.cos(gamma)],[-Math.sin(a),Math.sin(alpha)*Math.cos(a),Math.cos(alpha)*Math.cos(a)]];
    let b = math.matrix(baseArr);
    return math.multiply(b,x)._data;
}

let angle = 0;
let alpha = 10 * (Math.PI/180);
let gamma = 20 * (Math.PI/180);

setInterval(change,10);


function change(){
    cl();
    angle+=0.5;
    if(angle>=360) angle=0;
    
    if(angle>=0 && angle<90){
        side(0,dp(calcMatrix(angle, cp.e)),dp(calcMatrix(angle, cp.f)),dp(calcMatrix(angle, cp.g)),dp(calcMatrix(angle, cp.h)));
        side(1,dp(calcMatrix(angle, cp.f)),dp(calcMatrix(angle, cp.b)),dp(calcMatrix(angle, cp.c)),dp(calcMatrix(angle, cp.g)));
        side(2,dp(calcMatrix(angle, cp.h)),dp(calcMatrix(angle, cp.g)),dp(calcMatrix(angle, cp.c)),dp(calcMatrix(angle, cp.d)));
        side(2,dp(calcMatrix(angle, cp.a)),dp(calcMatrix(angle, cp.b)),dp(calcMatrix(angle, cp.f)),dp(calcMatrix(angle, cp.e)));
        side(1,dp(calcMatrix(angle, cp.e)),dp(calcMatrix(angle, cp.a)),dp(calcMatrix(angle, cp.d)),dp(calcMatrix(angle, cp.h)));
        side(3,dp(calcMatrix(angle, cp.a)),dp(calcMatrix(angle, cp.b)),dp(calcMatrix(angle, cp.c)),dp(calcMatrix(angle, cp.d)));
    }
    else if(angle>=90 && angle<180){
        side(3,dp(calcMatrix(angle, cp.a)),dp(calcMatrix(angle, cp.b)),dp(calcMatrix(angle, cp.c)),dp(calcMatrix(angle, cp.d)));
        side(1,dp(calcMatrix(angle, cp.f)),dp(calcMatrix(angle, cp.b)),dp(calcMatrix(angle, cp.c)),dp(calcMatrix(angle, cp.g)));
        side(2,dp(calcMatrix(angle, cp.h)),dp(calcMatrix(angle, cp.g)),dp(calcMatrix(angle, cp.c)),dp(calcMatrix(angle, cp.d)));
        side(2,dp(calcMatrix(angle, cp.a)),dp(calcMatrix(angle, cp.b)),dp(calcMatrix(angle, cp.f)),dp(calcMatrix(angle, cp.e)));
        side(0,dp(calcMatrix(angle, cp.e)),dp(calcMatrix(angle, cp.f)),dp(calcMatrix(angle, cp.g)),dp(calcMatrix(angle, cp.h)));
        side(1,dp(calcMatrix(angle, cp.e)),dp(calcMatrix(angle, cp.a)),dp(calcMatrix(angle, cp.d)),dp(calcMatrix(angle, cp.h)));
    }
    else if(angle>=180 && angle<270){
        side(3,dp(calcMatrix(angle, cp.a)),dp(calcMatrix(angle, cp.b)),dp(calcMatrix(angle, cp.c)),dp(calcMatrix(angle, cp.d)));
        side(1,dp(calcMatrix(angle, cp.e)),dp(calcMatrix(angle, cp.a)),dp(calcMatrix(angle, cp.d)),dp(calcMatrix(angle, cp.h)));
        side(2,dp(calcMatrix(angle, cp.h)),dp(calcMatrix(angle, cp.g)),dp(calcMatrix(angle, cp.c)),dp(calcMatrix(angle, cp.d)));
        side(2,dp(calcMatrix(angle, cp.a)),dp(calcMatrix(angle, cp.b)),dp(calcMatrix(angle, cp.f)),dp(calcMatrix(angle, cp.e)));
        side(1,dp(calcMatrix(angle, cp.f)),dp(calcMatrix(angle, cp.b)),dp(calcMatrix(angle, cp.c)),dp(calcMatrix(angle, cp.g)));
        side(0,dp(calcMatrix(angle, cp.e)),dp(calcMatrix(angle, cp.f)),dp(calcMatrix(angle, cp.g)),dp(calcMatrix(angle, cp.h)));
    }
    else if(angle>=270 && angle<360){
        side(1,dp(calcMatrix(angle, cp.e)),dp(calcMatrix(angle, cp.a)),dp(calcMatrix(angle, cp.d)),dp(calcMatrix(angle, cp.h)));
        side(0,dp(calcMatrix(angle, cp.e)),dp(calcMatrix(angle, cp.f)),dp(calcMatrix(angle, cp.g)),dp(calcMatrix(angle, cp.h)));
        side(2,dp(calcMatrix(angle, cp.h)),dp(calcMatrix(angle, cp.g)),dp(calcMatrix(angle, cp.c)),dp(calcMatrix(angle, cp.d)));
        side(2,dp(calcMatrix(angle, cp.a)),dp(calcMatrix(angle, cp.b)),dp(calcMatrix(angle, cp.f)),dp(calcMatrix(angle, cp.e)));
        side(3,dp(calcMatrix(angle, cp.a)),dp(calcMatrix(angle, cp.b)),dp(calcMatrix(angle, cp.c)),dp(calcMatrix(angle, cp.d)));
        side(1,dp(calcMatrix(angle, cp.f)),dp(calcMatrix(angle, cp.b)),dp(calcMatrix(angle, cp.c)),dp(calcMatrix(angle, cp.g)));
    }
}