let sliders = document.querySelectorAll('input[name=rangeInput]');
let PLUSbtn = document.getElementById("PLUSbtn");
let MINUSbtn = document.getElementById("MINUSbtn");
var output = document.querySelectorAll("span.SlideOut");
let Dropmenu = document.getElementById("Menu1");
var ModeSelectors = document.getElementsByName('ModeSelector')
var ModeIndex;
var sliderSettings;
let sliderTimeout = new Date();

window.addEventListener('load', (event) => { //receiving data from server and syncing sliders with it by emulating mouseup event

    checkscrn();

    var GETsliders = new XMLHttpRequest();
    GETsliders.open("GET", '/v0/led/config', true);
    GETsliders.send();
    GETsliders.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            sliderSettings = JSON.parse(this.responseText);
            let SetArray = [];
            SetArray[0] = sliderSettings.brightness;
            SetArray[1] = sliderSettings.speed;
            SetArray[2] = sliderSettings.width;
            SetArray[3] = sliderSettings.led_count;
            SetArray[4] = sliderSettings.mode_index;
            sliders.forEach((element, i) => {
                if (i == 0) {
                    element.value = SetArray[i] * 100 / 255;
                }
                else {
                    element.value = SetArray[i];
                }
                var event = new Event('mouseup', {});
                element.dispatchEvent(event);
            });
            ModeIndex = sliderSettings.mode_index;
            ModeSelectors[ModeIndex].classList.add("Active");
            sliders.forEach((element, i) => {
                if (i > 0 && i < 3) {
                    output[i].innerHTML = (Math.pow(2, (element.value / 16384 - 2))).toFixed(2);
                }
                else {
                    output[i].innerHTML = element.value;
                }
            });
        }
    }
});

let arrS = [];//array of dynamic styles for slider color
sliders.forEach(element => {
    arrS.push(document.createElement("style"))
});
arrS.forEach(element => {
    document.head.appendChild(element);
});

sliders.forEach((element, i) => {
    element.addEventListener("input", () => {//slider color change on input
        enforce_maxlength(event);
        arrS[i].textContent = ` .slidecontainer:nth-child(${i + 1}) .slider::-webkit-slider-thumb{background-color: hsl(${100 - (element.value / (element.max / 100))}, 100%, 50%)} `
        if (i > 0 && i < 3) {
            output[i].innerHTML = (Math.pow(2, (element.value / 16384 - 2)).toFixed(2));
            ChangeSlideData(element, i);
        }
        else {
            output[i].innerHTML = element.value;
            ChangeSlideData(element, i);
        }
        if (i == 3) {
            ChangeSlideData(element, i);
        }
    })
});


sliders.forEach((element, i) => {
    element.addEventListener("mouseup", () => {//slider color change  and data flow on release
        enforce_maxlength(event);
        arrS[i].textContent = ` .slidecontainer:nth-child(${i + 1}) .slider::-webkit-slider-thumb{background-color: hsl(${100 - (element.value / (element.max / 100))}, 100%, 50%)} `;
        if (i > 0 && i < 3) {
            output[i].innerHTML = (Math.pow(2, (element.value / 16384 - 2))).toFixed(2);
        }
        else {
            output[i].innerHTML = element.value;
        }
        ChangeSlideData(element, i);
    })
});

let ChangeSlideData = ((element, i) => {//patch slider settings 
    
    if(new Date().getTime() - sliderTimeout.getTime() > 100){
        sliderTimeout = new Date()
        console.log("sent")
    var changeData = new XMLHttpRequest();
    changeData.open("POST", '/v0/led/config', true);
    changeData.setRequestHeader('Content-type', 'application/json');
    let val = sliderSettings;
    let changedName = "";

    if (i == 0) {
        let processedValue = element.value * 255 / 100
        val[Object.keys(sliderSettings)[i + 1]] = parseInt(processedValue, 10);
        changedName = (Object.keys(sliderSettings)[i + 1]);
        //brightness
    }
    else if (i < 3 && i > 0) {
        val[Object.keys(sliderSettings)[i + 1]] = parseInt(element.value, 10);
        changedName = (Object.keys(sliderSettings)[i + 1]);
        //width and speed
    }
    else if (i == 4) {
        val[Object.keys(sliderSettings)[0]] = parseInt(element.value, 10);
        changedName = (Object.keys(sliderSettings)[0]);
        //mode
    }
    else {
        val[Object.keys(sliderSettings)[i + 1]] = parseInt(element.value, 10);
        changedName = (Object.keys(sliderSettings)[i + 1]);
        //led
    }
    changeData.send(JSON.stringify(val));
}
else{
    console.log("too fast")
}

});
function SendLed() {//emulating mouse up on led input to send data to shared event listener
    var event = new Event('mouseup', {});
    sliders[3].dispatchEvent(event);
}

let timer;
let increment = 1;
let decrement = 1;
let wasChanged = false;

function continuosIncerment() {//led input acceleration function
    if (sliders[3].value < parseInt(sliders[3].getAttribute('max'))) {
        sliders[3].value = parseInt(sliders[3].value) + 1;
        wasChanged = true;
        SendLed()
    }
    if (increment < 10) {
        increment = increment + 2;
    }
    timer = setTimeout(continuosIncerment, 500 - parseInt(increment * 40));
}

function continuosDecerment() {//led input acceleration function
    if (sliders[3].value > parseInt(sliders[3].getAttribute('min'))) {
        sliders[3].value = parseInt(sliders[3].value) - 1;
        wasChanged = true;
        SendLed()
    }
    if (decrement < 10) {
        decrement = decrement + 2;
    }
    timer = setTimeout(continuosDecerment, 500 - parseInt(decrement * 40));
}

function timeoutClear() {//stopping recursion of acceleration functions
    clearTimeout(timer);
    increment = -1;
    decrement = -1;
    if (wasChanged == true) {
        SendLed();
        wasChanged = false;
    }
}

function checkscrn() {//touchscreen check and according input changes
    var isTouch = false;
    PLUSbtn.addEventListener('mousedown', continuosIncerment);
    PLUSbtn.addEventListener('mouseup', timeoutClear);
    PLUSbtn.addEventListener('mouseleave', timeoutClear);
    MINUSbtn.addEventListener('mousedown', continuosDecerment);
    MINUSbtn.addEventListener('mouseup', timeoutClear);
    MINUSbtn.addEventListener('mouseleave', timeoutClear);

    window.addEventListener('touchstart', function touchDetector() {
        isTouch = true;
        PLUSbtn.removeEventListener('mousedown', continuosIncerment);
        PLUSbtn.removeEventListener('mouseup', timeoutClear);
        PLUSbtn.removeEventListener('mouseleave', timeoutClear);
        MINUSbtn.removeEventListener('mousedown', continuosDecerment);
        MINUSbtn.removeEventListener('mouseup', timeoutClear);
        MINUSbtn.removeEventListener('mouseleave', timeoutClear);
        touchctrl();
        window.removeEventListener('touchstart', touchDetector);
    });
}
function touchctrl() {
    PLUSbtn.addEventListener("touchstart", continuosIncerment);
    PLUSbtn.addEventListener('touchend', timeoutClear);
    MINUSbtn.addEventListener('touchstart', continuosDecerment);
    MINUSbtn.addEventListener('touchend', timeoutClear);

}

ModeSelectors.forEach((element, i) => {//mode selector active class juggling and click handling 
    element.addEventListener("click", () => {
        ModeIndex = i;
        if (!(ModeSelectors[i].classList.contains("Active"))) {
            ModeSelectors[i].classList.add("Active");
            ModeSelectors[i].value = i;
            ChangeSlideData(ModeSelectors[i], 4)
            ModeSelectors.forEach((element, i) => {
                if (ModeIndex !== i) {
                    element.classList.remove("Active");
                }
            });
        }
    });
})




