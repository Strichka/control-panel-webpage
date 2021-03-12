let sliders = document.querySelectorAll('input[name=rangeInput]');


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
function enforce_maxlength(event) {
    var t = event.target;
    
    if (t.hasAttribute('max') && parseInt(t.getAttribute('max'))< parseInt(t.value)) {
      t.value = parseInt(t.getAttribute('max'));
    
      console.log("sliced data");
    }
  }
  
  // Global Listener for anything with an maxlength attribute.
  // I put the listener on the body, put it on whatever.
  



