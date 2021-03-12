let NetConf = document.querySelectorAll('input[name=NetConf]');
let NetSubmitButton = document.getElementById("NetSubmit");
var NetResponse;
var popup;
var isValidData;
//var BadTextAlert = 
var BadTextArray = [];

window.addEventListener('load', (event) => {
    console.log('NetConf loaded');

    

    var GETnetConf = new XMLHttpRequest();
    GETnetConf.open("GET", '/network/config', true);
    GETnetConf.send();

    GETnetConf.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText);
            NetResponse = JSON.parse(this.responseText);
            NetConf.forEach((element,i) => {
                element.value = NetResponse[Object.keys(NetResponse)[i]]
                
            });

        }
    }

    PreloadPopUp();
});
NetSubmitButton.addEventListener("click",(event) => {
    var isValidData = true;
    var SETnetConfig = new XMLHttpRequest();
    SETnetConfig.open("PUT", '/network/config', true);
    var NetConfObj ={};
    NetConf.forEach((element,i) => {
        if(isASCII(NetConf[i].value)){
        NetConfObj[Object.keys(NetResponse)[i]] = NetConf[i].value
        }
        else{
            isValidData= false;
        }
        
    });
    if(isValidData){
    SETnetConfig.send(JSON.stringify(NetConfObj));
    console.log("sent cfg")
    var PINGserver = new XMLHttpRequest();
    PINGserver.open("GET", '/ping', true);
    PINGserver.send();

    LoadingFunction();

    PINGserver.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var pong = JSON.parse(this.responseText);
            if(pong.pong=== true){
            document.location.reload();
        }
        }
    
    };
    }
    else{
        alert("Use ASCII");
    }
});

var PreloadPopUp = () =>{
    body = document.getElementById("Body")
    popup = document.createElement("div");
    popup.innerHTML = "<div class='textbox LoadPopUp'> Перезагрузка! <img src='/static/media/Loading.gif' ></div>";
    popup.className = "Popup";
}
var LoadingFunction = () =>{
    document.body.appendChild(popup);
}
NetConf.forEach((element,i) => {
    element.addEventListener("input",() =>{
        if(!isASCII(element.value)){
            element.style.border = "red solid 1px";
            if(!BadTextArray[i]){
            BadTextArray[i] = document.createElement("div");
            BadTextArray[i].innerHTML ="Only Ascii symbols please";
            BadTextArray[i].style.fontSize = "small";
            BadTextArray[i].style.color = "crimson";
            BadTextArray[i].style.textAlign = "center";
            element.parentElement.parentElement.appendChild(BadTextArray[i]);
            }
        }
        else{
            element.style.border = "gray solid 1px";
            if(BadTextArray[i]){
            element.parentElement.parentElement.removeChild(BadTextArray[i]);
            }
        }
        
    });
});



function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
}