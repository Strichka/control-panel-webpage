let wheels =[];
let wheelBases =[];


wheelBases = document.getElementsByClassName("reinvented-color-wheel");
wheels = document.getElementsByClassName("reinvented-color-wheel--hue-wheel");
window.addEventListener('load', (event) => {
    let WrapParents = document.getElementsByName("WhWr");
    WrapParents[0].style.zIndex=2;
    WrapParents[1].style.zIndex=1;
    console.log(WrapParents);
    //wheelCont();

});

let ChangeSide = document.getElementById("ChangeSide");

ChangeSide.addEventListener("click",(event) => {
    
    Array.from(wheels).forEach((element,i) => {
        element.classList.add("rotating");
        let WrapParents = document.getElementsByName("WhWr");
        console.log(WrapParents[i].style.zIndex);

        if(WrapParents[i].style.zIndex==2){
            WrapParents[i].style.zIndex=1;
        }
        else{
        WrapParents[i].style.zIndex=2;
    }
    });
    setTimeout(()=>{
    Array.from(wheels).forEach((element,i) => {
        element.classList.remove("rotating");
        
    });

    },600);

});

