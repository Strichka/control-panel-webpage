var infoTab = document.getElementById("infoTab");
var infoBits = [];
var infoNodes = [];
let infoObj = {
    ap_mac: "empty",
    ap_mode: "empty",
    firmware_name: "empty",
    firmware_version: "empty",
    sta_ip: "empty",
    sta_mac: "empty",
    sta_mode: "empty"
}


window.addEventListener('load', (event) => {//getting info data from server and giving it to a grid
    GETinfo = new XMLHttpRequest();
    GETinfo.open("GET", "/v0/info", true);
    GETinfo.send();
    GETinfo.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var info = JSON.parse(this.responseText);
            console.log(info)
            
                infoBits[0] = info["firmware_name"];
                infoBits[1] = info["firmware_version"];
                infoBits[2] = info["ap_mode"];
                infoBits[3] = info["sta_mode"];
                infoBits[4] = info["ap_mac"];
                infoBits[5] = info["sta_mac"];
                infoBits[6] = info["sta_ip"];
            
            infoBits.forEach((element, i) => {
                infoNodes[i] = document.createElement("div");
                infoNodes[i].id = 'infoline';
                infoNodes[i].innerHTML = infoBits[i];
                infoTab.appendChild(infoNodes[i]);
            });
        }
    }
});