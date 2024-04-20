let elem = document.getElementById("update");

const n = 4;
const base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
let counter = [0,0,0,0];

elem.innerText="PREPARING...";

let string=[];

let partOne=[];
let partTwo=[];

for(let i=0; i<Math.pow(64,n); i++){
    let buff=[];
    for(let j=0; j<n; j++){
        buff[j] = base64[counter[j]];
        if(j==0) counter[0]++;
        if(counter[j]>=64){
            counter[j]=0;
            if(j!=(n-1)){
                counter[j+1]++;
            }
            else counter[(n-1)]=0;
        }
    }
    partOne.push(buff.reverse().join(""));
}

for(let i=0; i<Math.pow(64,n); i++){
    let buff=[];
    for(let j=0; j<n; j++){
        buff[j] = base64[counter[j]];
        if(j==0) counter[0]++;
        if(counter[j]>=64){
            counter[j]=0;
            if(j!=(n-1)){
                counter[j+1]++;
            }
            else counter[(n-1)]=0;
        }
    }
    partTwo.push(buff.reverse().join(""));
}

partOne = shuffle(partOne);
partTwo = shuffle(partTwo);

for(let i=0; i<partOne.length; i++){
    string.push((partOne[i]+partTwo[i]));
}

download(shuffle(string).join("\n"),"base64_string.txt",'text/plain');

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
    elem.innerText="DONE";
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }