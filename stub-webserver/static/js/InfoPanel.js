var infoTab = document.getElementById("infoTab");
var infoBits = [];
var infoNodes = [];

window.addEventListener('load', (event) => {//getting info data from server and giving it to a grid
    GETinfo = new XMLHttpRequest();
    GETinfo.open("GET", "/v0/info", true);
    GETinfo.send();
    GETinfo.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var info = JSON.parse(this.responseText);
            Object.keys(info).forEach((element, i) => {
                infoBits[i] = info[Object.keys(info)[i]];
            });
            infoBits.forEach((element, i) => {
                infoNodes[i] = document.createElement("div");
                infoNodes[i].id = 'infoline';
                infoNodes[i].innerHTML = infoBits[i];
                infoTab.appendChild(infoNodes[i]);
            });
        }
    }
});