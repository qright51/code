let form = document.getElementById("form");

let alpha = "abcdefghijklmnopqrstuvwxyz";
let numeric = "0123456789";


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let d = document.getElementById("nums").value;
    if(d==0) return;

    let s = "";
    let n;
    for(let i=0; i<d; i++){
        switch(document.getElementById("chars").value){
            case "hex":
                n=Math.floor(Math.random()*16);
                s+= n<=9?numeric.charAt(n):alpha.charAt(n-10);
                break;
            case "alpha_low":
                n=Math.floor(Math.random()*26);
                s+= alpha.charAt(n);
                break;
            case "alpha_up":    
                n=Math.floor(Math.random()*52);
                s+= n<=25?alpha.charAt(25-n):alpha.toUpperCase().charAt(51-n);
                break;
            case "alphanumeric":
                n=Math.floor(Math.random()*(2*alpha.length+numeric.length));
                s+= (alpha+alpha.toUpperCase()+numeric).charAt(n);
                break;
            case "numeric":
                n=Math.floor(Math.random()*numeric.length);
                s+= numeric.charAt(n);
                break;
        }
        document.getElementById("output").innerHTML=s;
    }
});