let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const palette = {
  background: "#000000ff",
  foreground: "#ffffffff"
}

const hexSize = 50;
const hexPadding = 2;

var hexTable;
let max_h_count;
let min_h_count;
let max_v_count;
let min_v_count;

var R = 1, time = 0;
var sineAmplitude = 5;
var sineSpeed = 1/30;

function hex(x, y, c=palette.foreground, s=hexSize, a=0){
  let v = [
    {x: x-s/4, y: y-s*Math.sqrt(3)/4},
    {x: x+s/4, y: y-s*Math.sqrt(3)/4},
    {x: x+s/2, y: y},
    {x: x+s/4, y: y+s*Math.sqrt(3)/4},
    {x: x-s/4, y: y+s*Math.sqrt(3)/4},
    {x: x-s/2, y: y}
  ];

  if(a!=0){
    for(let i=0; i<v.length; i++){
      let nx = (v[i].x-x)*Math.cos(a) + (v[i].y-y)*Math.sin(a);
      let ny = -(v[i].x-x)*Math.sin(a) + (v[i].y-y)*Math.cos(a);
      v[i].x = x + nx;
      v[i].y = y + ny;
    }
  }

  ctx.beginPath();
  ctx.moveTo(v[0].x, v[0].y);
  for(let i=1; i<v.length; i++){
    ctx.lineTo(v[i].x, v[i].y);
  }
  ctx.lineTo(v[0].x, v[0].y);
  ctx.fillStyle = c;
  ctx.fill();
}

function clear(){
  ctx.fillStyle = palette.background;
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function init(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  clear();
  
  max_h_count = Math.floor(window.innerWidth/(hexSize+hexPadding*Math.sqrt(3)+(hexSize/2)));
  min_h_count = Math.floor((window.innerWidth-3*hexSize/4-hexPadding/2)/(hexSize+hexPadding*Math.sqrt(3)+(hexSize/2)));
  max_v_count = Math.floor(window.innerHeight/(hexSize*Math.sqrt(3)/2+hexPadding));
  min_v_count = Math.floor((window.innerHeight-hexSize*Math.sqrt(3)/4-hexPadding/2)/(hexSize*Math.sqrt(3)/2+hexPadding));

  if((window.innerWidth-max_h_count*(hexSize+hexPadding*Math.sqrt(3)+(hexSize/2)))>(hexSize+hexPadding*Math.sqrt(3))){
    max_h_count++;
  }
  if(((window.innerWidth-3*hexSize/4-hexPadding/2)-min_h_count*(hexSize+hexPadding*Math.sqrt(3)+(hexSize/2)))>(hexSize+hexPadding*Math.sqrt(3))){
    min_h_count++;
  }

  if((window.innerHeight-max_v_count*(hexSize*Math.sqrt(3)/2+hexPadding))>(hexSize*Math.sqrt(3)/2+hexPadding)){
    max_v_count++;
  }
  if(((window.innerHeight-hexSize*Math.sqrt(3)/4-hexPadding/2)-min_v_count*(hexSize*Math.sqrt(3)/2+hexPadding))>(hexSize*Math.sqrt(3)/2+hexPadding)){
    min_v_count++;
  }

  hexTable = new Array(max_v_count+min_v_count);
  for(let i=0; i<hexTable.length; i++){
    if(i%2==0) hexTable[i] = new Array(max_h_count);
    else hexTable[i] = new Array(min_h_count);

    for(let j=0; j<hexTable[i].length; j++){
      hexTable[i][j] = {x:0, y:0}
    }
  }

  drawHex();
}

function drawHex(){
  clear();
  for(let i=0; i<max_v_count+min_v_count; i++){
    let h_limit = max_h_count;
    if(i%2!=0) h_limit = min_h_count;
    for(let j=0; j<h_limit; j++){
      let x=j,y;
      if(i%2==0) y=i/2;
      else y=(i-1)/2;

      if(i%2==0){
        hexTable[i][j] = {
          x: (hexSize+hexPadding)/2+x*(1.5*hexSize+hexPadding*Math.sqrt(3)), 
          y: (hexSize+hexPadding)/2+y*(hexSize*Math.sqrt(3)/2+hexPadding)-hexSize/2*(1-Math.sqrt(3)/2),
          a: (sineAmplitude)*Math.sin((x+y)/2-time*sineSpeed) + (hexSize-sineAmplitude)
        };
      }
      else{
        hexTable[i][j] = {
          x: hexSize/4+hexPadding*Math.sqrt(3)/2+hexPadding/2+hexSize+x*(1.5*hexSize+hexPadding*Math.sqrt(3)), 
          y: hexPadding+hexSize*Math.sqrt(3)/2+y*(hexSize*Math.sqrt(3)/2+hexPadding),
          a: (sineAmplitude)*Math.sin((x+y)/2-time*sineSpeed) + (hexSize-sineAmplitude)
        }
      }

      let c1 = 1/Math.sqrt(2*Math.PI)*Math.exp(-(Math.pow((hexTable[i][j].x-window.innerWidth/2)/R,2)+Math.pow((hexTable[i][j].y-window.innerHeight/4)/R,2))/2);
      let c2 = 1/Math.sqrt(2*Math.PI)*Math.exp(-(Math.pow((hexTable[i][j].x-window.innerWidth/2+Math.sqrt(3)*window.innerHeight/8)/R,2)+Math.pow((hexTable[i][j].y-window.innerHeight/2-window.innerHeight/8)/R,2))/2);
      let c3 = 1/Math.sqrt(2*Math.PI)*Math.exp(-(Math.pow((hexTable[i][j].x-window.innerWidth/2-Math.sqrt(3)*window.innerHeight/8)/R,2)+Math.pow((hexTable[i][j].y-window.innerHeight/2-window.innerHeight/8)/R,2))/2);
      let color = `rgb(${c1*Math.sqrt(2*Math.PI)*255*1.5},${c2*Math.sqrt(2*Math.PI)*255*1.5},${c3*Math.sqrt(2*Math.PI)*255*1.5})`;

      hex(hexTable[i][j].x, hexTable[i][j].y, color, hexTable[i][j].a);
    }
  }
}

let direction = -1;
setInterval(()=>{
  if(R<=1){
    direction = 1;
  }
  else if(R>=300){
    direction = -0.33;
  }

  R+=direction;
  time++;
  drawHex();
},16.6667);

window.onload=()=>init();
window.onresize=()=>init();