let NetConf = document.querySelectorAll('input[name=NetConf]');
let NetSubmitButton = document.getElementById("NetSubmit");

window.addEventListener('load', (event) => {//get current network settings from server and use them
    var GETnetConf = new XMLHttpRequest();
    GETnetConf.open("GET", '/v0/network/config', true);
    GETnetConf.send();
    GETnetConf.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            NetResponse = JSON.parse(this.responseText);
            NetConf.forEach((element, i) => {
                element.value = NetResponse[Object.keys(NetResponse)[i]]
            });
        }
    }
    PreloadPopUp();
});

NetSubmitButton.addEventListener("click", (event) => {//checking text input and sending new config
    var isValidData = true;
    var SETnetConfig = new XMLHttpRequest();
    SETnetConfig.open("PUT", '/v0/network/config', true);
    var NetConfObj = {};
    NetConf.forEach((element, i) => {
        if (isASCII(NetConf[i].value)) {
            NetConfObj[Object.keys(NetResponse)[i]] = NetConf[i].value
        }
        else {
            isValidData = false;
        }
    });
    if (isValidData) {
        SETnetConfig.send(JSON.stringify(NetConfObj));
        PingServer();
    }
    else {
        alert("Please, use ASCII symbols");
    }
});

NetConf.forEach((element, i) => {//Bad input alert for network settings
    element.addEventListener("input", () => {
        if (!isASCII(element.value)) {
            element.style.border = "red solid 1px";
            if (!BadTextArray[i]) {
                BadTextArray[i] = document.createElement("div");
                BadTextArray[i].innerHTML = "Only ASCII symbols, please";
                BadTextArray[i].style.fontSize = "small";
                BadTextArray[i].style.color = "crimson";
                BadTextArray[i].style.textAlign = "center";
                element.parentElement.parentElement.appendChild(BadTextArray[i]);
            }
        }
        else {
            element.style.border = "gray solid 1px";
            if (BadTextArray[i]) {
                element.parentElement.parentElement.removeChild(BadTextArray[i]);
                BadTextArray[i] = "";
            }
        }
    });
});


