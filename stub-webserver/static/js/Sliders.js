
let sliders = document.querySelectorAll('input[name=rangeInput]');
let PLUSbtn = document.getElementById("PLUSbtn");
let MINUSbtn = document.getElementById("MINUSbtn");

var output = document.querySelectorAll("span.SlideOut");
let Dropmenu = document.getElementById("Menu1");

var ModeSelectors = document.getElementsByName('ModeSelector')
var ModeIndex;

var sliderSettings;
//document.body.addEventListener('input', enforce_maxlength);
window.addEventListener('load', (event) => {



    var GETsliders = new XMLHttpRequest();
    GETsliders.open("GET", '/led/config', true);
    GETsliders.send();

    GETsliders.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            sliderSettings = JSON.parse(this.responseText)
            console.log(sliderSettings);
            let SetArray = [];
            
            SetArray[0] = sliderSettings.brightness;
            SetArray[1] = sliderSettings.speed;
            SetArray[2] = sliderSettings.width;
            SetArray[3] = sliderSettings.led_count;

            sliders.forEach((element,i) => {
                element.value = SetArray[i];
                var event = new Event('mouseup', {});
                element.dispatchEvent(event);
            });
            ModeIndex = sliderSettings.mode_index;
            ModeSelectors[ModeIndex].classList.add("Active");
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
        if(i==3){
            ChangeSlideData(element, i);
        }

    })
});


sliders.forEach((element, i) => {
    element.addEventListener("mouseup", () => {

        enforce_maxlength(event);
        arrS[i].textContent = ` .slidecontainer:nth-child(${i + 1}) .slider::-webkit-slider-thumb{background-color: hsl(${100 - (element.value / (element.max / 100))}, 100%, 50%)} `



        output[i].innerHTML = element.value;

        ChangeSlideData(element, i);
    })
});

let ChangeSlideData = ((element, i) => {

    var changeData = new XMLHttpRequest();
    changeData.open("PATCH", '/led/config', true);

    let val = sliderSettings;
    if (i < 3) {
        val[Object.keys(sliderSettings)[i + 1]] = parseInt(element.value, 10);
    }
    else {
        val[Object.keys(sliderSettings)[i + 2]] = parseInt(element.value, 10);
    }
    console.log(val);
    changeData.send(JSON.stringify(val));

});
//




function SendLed(){
    var event = new Event('mouseup', {});
    sliders[3].dispatchEvent(event);
}









let timer;
let increment=1;
let decrement=1;

function continuosIncerment() {
    if(sliders[3].value <  parseInt(sliders[3].getAttribute('max'))){
    sliders[3].value = parseInt(sliders[3].value) + 1;
    }
    if(increment<10){
    increment = increment + 1;
    }
  timer = setTimeout(continuosIncerment, 500 - parseInt(increment * 50));
}

function continuosDecerment() {
    if(sliders[3].value >  parseInt(sliders[3].getAttribute('min'))){
    sliders[3].value = parseInt(sliders[3].value) - 1;
    }
    if(increment<10){
    increment = increment + 1;
    }
  timer = setTimeout(continuosDecerment, 500 - parseInt(increment * 50));
}

function timeoutClear() {
  clearTimeout(timer);
    increment = 1;
    decrement = 1;
  SendLed();
}

PLUSbtn.addEventListener('mousedown', continuosIncerment);

PLUSbtn.addEventListener('mouseup', timeoutClear);

PLUSbtn.addEventListener('mouseleave', timeoutClear);

MINUSbtn.addEventListener('mousedown', continuosDecerment);

MINUSbtn.addEventListener('mouseup', timeoutClear);

MINUSbtn.addEventListener('mouseleave', timeoutClear);




























ModeSelectors.forEach((element ,i) => {
    element.addEventListener("click", () => {
        ModeIndex = i;
        console.log(ModeSelectors);
        if(!(ModeSelectors[i].classList.contains("Active")))
        {
        ModeSelectors[i].classList.add("Active");
        ModeSelectors[i].value = i;
        ChangeSlideData(ModeSelectors[i],-1)
            ModeSelectors.forEach((element,i) => {
                if(ModeIndex !== i){
                    element.classList.remove("Active");
                }
                
            });


        }

    });
})




