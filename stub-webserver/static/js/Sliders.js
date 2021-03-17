


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

    checkscrn();

    var GETsliders = new XMLHttpRequest();
    GETsliders.open("GET", '/v0/led/config', true);
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
                if(i==0){
                element.value = SetArray[i] * 100 / 255;
                }
                else{
                    element.value = SetArray[i] ;
                }
                var event = new Event('mouseup', {});
                element.dispatchEvent(event);
            });
            ModeIndex = sliderSettings.mode_index;
            ModeSelectors[ModeIndex].classList.add("Active");
            sliders.forEach((element, i) => {
                if(i>0&&i<3){
                    output[i].innerHTML = (Math.pow(2,(element.value/16384 - 2))).toFixed(1);
                }
                else{
                output[i].innerHTML = element.value;
                }
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
        if(i>0&&i<3){
            output[i].innerHTML = (Math.pow(2,(element.value/16384 - 2)).toFixed(1));
        }
        else{
        output[i].innerHTML = element.value;
        }
        if(i==3){
            ChangeSlideData(element, i);
        }

    })
});


sliders.forEach((element, i) => {
    element.addEventListener("mouseup", () => {

        enforce_maxlength(event);
        arrS[i].textContent = ` .slidecontainer:nth-child(${i + 1}) .slider::-webkit-slider-thumb{background-color: hsl(${100 - (element.value / (element.max / 100))}, 100%, 50%)} `


        if(i>0&&i<3){
            output[i].innerHTML = (Math.pow(2,(element.value/16384 - 2))).toFixed(1);
        }
        else{
        output[i].innerHTML = element.value;
        }
        ChangeSlideData(element, i);
    })
});

let ChangeSlideData = ((element, i) => {

    var changeData = new XMLHttpRequest();
    changeData.open("PATCH", '/v0/led/config', true);

    let val = sliderSettings;
    //place to modify data for server V
    if(i==0){
        let processedValue = element.value * 255/100
        val[Object.keys(sliderSettings)[i + 1]] = parseInt(processedValue, 10);
        //brightness
    }
    else if (i < 3 && i>0) {

        

        val[Object.keys(sliderSettings)[i + 1]] = parseInt(element.value, 10);
        
        //width and speed
    }
    else {
        val[Object.keys(sliderSettings)[i + 2]] = parseInt(element.value, 10);
    }
    //use formulas here ^
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
    increment = increment + 2;
    }
    console.log("+");
  timer = setTimeout(continuosIncerment, 500 - parseInt(increment * 40));
}

function continuosDecerment() {
    if(sliders[3].value >  parseInt(sliders[3].getAttribute('min'))){
    sliders[3].value = parseInt(sliders[3].value) - 1;
    }
    if(decrement<10){
        decrement = decrement + 2;
    }
  timer = setTimeout(continuosDecerment, 500 - parseInt(decrement * 40));
}

function timeoutClear() {
  clearTimeout(timer);
    increment = -1;
    decrement = -1;
  SendLed();
}

//touchscreen check
function checkscrn(){
    var isTouch = false;
    
    
    PLUSbtn.addEventListener('mousedown', continuosIncerment);
            PLUSbtn.addEventListener('mouseup', timeoutClear);
            PLUSbtn.addEventListener('mouseleave', timeoutClear);
        
            MINUSbtn.addEventListener('mousedown', continuosDecerment);
            MINUSbtn.addEventListener('mouseup', timeoutClear);
            MINUSbtn.addEventListener('mouseleave', timeoutClear);


    window.addEventListener('touchstart', function touchDetector() {
        alert("touch");
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
    function touchctrl(){
        PLUSbtn.addEventListener("touchstart", continuosIncerment);
        PLUSbtn.addEventListener('touchend', timeoutClear);
        MINUSbtn.addEventListener('touchstart', continuosDecerment);
        MINUSbtn.addEventListener('touchend', timeoutClear);
            
        }




























ModeSelectors.forEach((element ,i) => {
    element.addEventListener("click", () => {
        ModeIndex = i;
        console.log(ModeSelectors);
        if(!(ModeSelectors[i].classList.contains("Active")))
        {
        ModeSelectors[i].classList.add("Active");
        ModeSelectors[i].value = i;
        ChangeSlideData(ModeSelectors[i],-2)
            ModeSelectors.forEach((element,i) => {
                if(ModeIndex !== i){
                    element.classList.remove("Active");
                }
                
            });


        }

    });
})




