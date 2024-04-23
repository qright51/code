let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");

let entry=" ";
while(entry==" "){
    entry=window.prompt("Enter your text: ");
    if(entry.length<4) {entry=" "; alert("Your text has to contain more characters!");}
    if(entry.length>64) {entry=" "; alert("Your text is too big!");}
}
console.log("User's entry is: "+entry);

let index=-1;
const value = [' ','!','"','#','$','%','&','ap','(',')','*','+',',','-','.','/','0','1','2','3','4','5','6','7','8','9',':',';','<','=','>','?','@','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','[','ba',']','^','_','`','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','{','|','}','~'];

const pattern = ["11011001100","11001101100","11001100110","10010011000","10010001100","10001001100","10011001000","10011000100","10001100100","11001001000","11001000100","11000100100","10110011100","10011011100","10011001110","10111001100","10011101100","10011100110","11001110010","11001011100","11001001110","11011100100","11001110100","11101101110","11101001100","11100101100","11100100110","11101100100","11100110100","11100110010","11011011000","11011000110","11000110110","10100011000","10001011000","10001000110","10110001000","10001101000","10001100010","11010001000","11000101000","11000100010","10110111000","10110001110","10001101110","10111011000","10111000110","10001110110","11101110110","11010001110","11000101110","11011101000","11011100010","11011101110","11101011000","11101000110","11100010110","11101101000","11101100010","11100011010","11101111010","11001000010","11110001010","10100110000","10100001100","10010110000","10010000110","10000101100","10000100110","10110010000","10110000100","10011010000","10011000010","10000110100","10000110010","11000010010","11001010000","11110111010","11000010100","10001111010","10100111100","10010111100","10010011110","10111100100","10011110100","10011110010","11110100100","11110010100","11110010010","11011011110","11011110110","11110110110","10101111000","10100011110","10001011110"];

let barLength = 2;
canvas.width=barLength*(35+(11*entry.length));
canvas.height=Math.trunc(0.42763157894*canvas.width);


//start - 11010010000
let startCode = "11010010000";
for(let i=1;i<=11;i++){
    if(startCode[i-1]=='1') ctx.fillStyle="#000";
    else if(startCode[i-1]=='0') ctx.fillStyle="#fff";
    else console.error("Start code variable has wrong value set!");
    ctx.fillRect(barLength*(i-1),0,barLength,canvas.height);
}

//encoded data
for(let i=0; i<entry.length; i++){
    for(let j=0; j<value.length; j++){
        if(entry[i]=='\\') index=60;
        else if(entry[i]=='\'') index=7;
        else if(entry[i]==value[j]) index=j;
    }
    for(let j=0; j<11; j++){
        if(pattern[index][j]=='1'){
            ctx.fillStyle="#000";
            ctx.fillRect(barLength*(j+(11*(i+1))),0,barLength,canvas.height);
        }
        else if(pattern[index][j]=='0'){
            ctx.fillStyle="#fff";
            ctx.fillRect(barLength*(j+(11*(i+1))),0,barLength,canvas.height);
        }
    }
}

//checksum
let sum=104;

for(let i=0; i<entry.length; i++){
    for(let j=0; j<value.length; j++){
        if(entry[i]=='\\') index=60;
        else if(entry[i]=='\'') index=7;
        else if(entry[i]==value[j]) index=j;
    }
    sum+=((i+1)*index);
}
sum%=103;

let checksumCode=pattern[sum];
for(let i=1;i<=11;i++){
    if(checksumCode[i-1]=='1') ctx.fillStyle="#000";
    else if(checksumCode[i-1]=='0') ctx.fillStyle="#fff";
    else console.error("Checksum code variable has wrong value set!");
    ctx.fillRect(barLength*((i-1)+(11*(entry.length+1))),0,barLength,canvas.height);
}

//stop pattern
let stopCode = "1100011101011";

for(let i=1;i<=13;i++){
    if(stopCode[i-1]=='1') ctx.fillStyle="#000";
    else if(stopCode[i-1]=='0') ctx.fillStyle="#fff";
    else console.error("Stop code variable has wrong value set!");
    ctx.fillRect(barLength*((i-1)+(11*(entry.length+2))),0,barLength,canvas.height);
}