var NetResponse;
var popup;
var isValidData;
var BadTextArray = [];



function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
}


function PingServer(){


LoadingFunction();

var PINGserver = new XMLHttpRequest();
PINGserver.open("GET", '/ping', true);
PINGserver.send();
setTimeout(function() {
console.log("ping");
PINGserver.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var pong = JSON.parse(this.responseText);
        if(pong.pong=== true){
        document.location.reload();
    }
    }
    else{PingServer();}

};
},2000);


}

var PreloadPopUp = () =>{
    body = document.getElementById("Body")
    popup = document.createElement("div");
    popup.innerHTML = "<div class='textbox LoadPopUp'> Перезагрузка! <img src='/static/media/Loading.gif' ></div>";
    popup.className = "Popup";
}
var LoadingFunction = () =>{
    document.body.appendChild(popup);
}
function enforce_maxlength(event) {
    var t = event.target;
    
    if (t.hasAttribute('max') && parseInt(t.getAttribute('max'))< parseInt(t.value)) {
      t.value = parseInt(t.getAttribute('max'));
    
      console.log("sliced number");
    }
    else if(t.hasAttribute('min') && parseInt(t.getAttribute('min'))> parseInt(t.value)) {
        t.value = parseInt(t.getAttribute('min'));
        console.log("zeroed number");
    }
  }

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  