
let itr = document.querySelectorAll('input[name=rangeInput]')
var output = document.querySelectorAll("span.SlideOut");
let Dropmenu = document.getElementById("Menu1")


let arrS=[];
itr.forEach(element => {
    arrS.push(document.createElement("style"))
});


arrS.forEach(element => {
    document.head.appendChild(element);
});

output.forEach(element => {
    element.innerHTML = '50';
});

console.log(output);



itr.forEach( (element,i) => {
    element.addEventListener("input", () => {
        
        arrS[i].textContent = ` .slidecontainer:nth-child(${i+1}) .slider::-webkit-slider-thumb{background-color: hsl(${100-(element.value/(element.max/100))}, 100%, 50%)} `
        output[i].innerHTML = element.value;
        
      })
      
      
});


console.log(itr);
    
  