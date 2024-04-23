let url = window.prompt("Enter your text:");

let imgID = document.getElementById("qrcode");

imgID.src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data="+url;