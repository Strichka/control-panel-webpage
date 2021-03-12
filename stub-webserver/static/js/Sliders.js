 
let sliders = document.querySelectorAll('input[name=rangeInput]');
let PLUSbtn=document.getElementById("PLUSbtn");
let MINUSbtn=document.getElementById("MINUSbtn");

var output = document.querySelectorAll("span.SlideOut");
let Dropmenu = document.getElementById("Menu1");

var sliderSettings;
//document.body.addEventListener('input', enforce_maxlength);
window.addEventListener('load', (event) => {
    


    var GETsliders = new XMLHttpRequest();
    GETsliders.open("GET", '/led/config', true);
    GETsliders.send();

    GETsliders.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            
            sliderSettings = JSON.parse(this.responseText)

            sliders[0].value = sliderSettings.brightness;
            sliders[1].value = sliderSettings.speed;
            sliders[2].value = sliderSettings.width;
            sliders[3].value = sliderSettings.led_count;
            sliders.forEach((element, i) => {
                output[i].innerHTML = element.value;
                
            });

        }
    }




});
let arrS = [];
sliders.forEach(element => {
    arrS.push(document.createElement("style"))
});


arrS.forEach(element => {
    document.head.appendChild(element);
});

output.forEach(element => {
    element.innerHTML = '50';
});

console.log(output);



sliders.forEach((element, i) => {
    element.addEventListener("input", () => {
        
        enforce_maxlength(event);
        arrS[i].textContent = ` .slidecontainer:nth-child(${i + 1}) .slider::-webkit-slider-thumb{background-color: hsl(${100 - (element.value / (element.max / 100))}, 100%, 50%)} `
        
        
        
        output[i].innerHTML = element.value;
        
        ChangeSlideData(element,i);
    })
});

let ChangeSlideData=((element,i) => {

    var changeData = new XMLHttpRequest();
        changeData.open("PATCH", '/led/config', true);
        
        let val = sliderSettings;
        if(i<3){
        val[Object.keys(sliderSettings)[i + 1]] = parseInt(element.value, 10);  
        }
        else{
            val[Object.keys(sliderSettings)[i + 2]] = parseInt(element.value, 10); 
        }
        console.log(val);
        changeData.send(JSON.stringify(val));

});
//
PLUSbtn.addEventListener("mousedown",(event) => {
    sliders[3].value = parseInt(sliders[3].value)+500;
    var event = new Event('input', {});
    
    sliders[3].dispatchEvent(event);
});
MINUSbtn.addEventListener("mousedown",(event) => {
        sliders[3].value = parseInt(sliders[3].value)-500;
    var event = new Event('input', {});
    sliders[3].dispatchEvent(event);
 
    }
);
 

let checker=MINUSbtn.addEventListener("mousedown",(event) => {return true;});




