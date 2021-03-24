var NetResponse;
var popup;
var isValidData;
var BadTextArray = [];

function isASCII(str) {//ascii checker
    return /^[\x00-\x7F]*$/.test(str);
}

function PingServer(){//general usage refresh function
LoadingFunction();
var PINGserver = new XMLHttpRequest();
PINGserver.open("GET", '/v0/ping', true);
PINGserver.send();
setTimeout(function() {
PINGserver.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {      
        document.location.reload();
    }
  
    else{PingServer();}
};
},2000);
}

var PreloadPopUp = () =>{//preload popup to get gif in time before server reload
    body = document.getElementById("Body")
    popup = document.createElement("div");
    popup.innerHTML = "<div class='textbox LoadPopUp loadingPopupTranslatePool'> Перезагрузка! <img src='/static/media/Loading.gif' ></div>";
    popup.className = "Popup";
}
var LoadingFunction = () =>{//append popup with translation
    document.body.appendChild(popup);
    TranslateAll();
}
function enforce_maxlength(event) {//enforces length of input both max and min
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