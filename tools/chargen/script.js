let btn = document.getElementById("generate");

let alpha = "abcdefghijklmnopqrstuvwxyz";
let numeric = "0123456789";


btn.addEventListener("click",()=>{
    let d = document.getElementById("nums").value;

    let s = "";
    for(let i=0; i<d; i++){
        switch(document.getElementById("chars").value){
            case "hex":
                let k=Math.floor(Math.random()*16);
                s+= k<=9?numeric.charAt(k):alpha.charAt(k-10);
                break;
            case "alpha_low":
                let j=Math.floor(Math.random()*26);
                s+= alpha.charAt(j);
                break;
            case "alpha_up":    
                let l=Math.floor(Math.random()*52);
                s+= l<=25?alpha.charAt(25-l):alpha.toUpperCase().charAt(51-l);
                break;
            case "alphanumeric":
                let m=Math.floor(Math.random()*(2*alpha.length+numeric.length));
                s+= (alpha+alpha.toUpperCase()+numeric).charAt(m);
        }
        document.getElementById("output").innerHTML=s;
    }
});