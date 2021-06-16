let russDictionary;
let engDictionary;
let uaDictionary;
let currDictionary = engDictionary;
let langSelected = "ENG";

function  getLanguagePackets(){
    var GETlanguages = new XMLHttpRequest();
    GETlanguages.open("GET", "/static/locales.json", true);
    GETlanguages.send();
    console.log("sent")
    GETlanguages.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var langs = JSON.parse(this.responseText);
            russDictionary=langs.russDictionary
            engDictionary=langs.engDictionary
            uaDictionary=langs.uaDictionary
            generateModes(engDictionary.menu[0])
            
            if(localStorage.getItem('lang')){
                defaultLang(localStorage.getItem('lang'));
            }
            else{
                localStorage.setItem('lang', navigator.language);
                defaultLang(navigator.language);
            }
            TranslateAll(langSelected);
            langButtons.childNodes[langlist.indexOf(langSelected)].classList.add("Active");
            
            
        }

    }
}

let ModeSelectorsPlace = document.getElementById("ModeSelectorsPlace")

function generateModes(array) {
    console.log(array);
    array.forEach((e,i)=>{
        if(i>0){
        let modeNode = document.createElement("div");
        modeNode.className = "ModeSelector";
        modeNode.innerHTML = "<div name='ModeSelector' class='NetworkSettingSubmit menuTranslatePool' href='#'>Mode</div>"
        ModeSelectorsPlace.appendChild(modeNode)
        }
    })
    let hrNode = document.createElement("hr");
    hrNode.className = "borderLine";
    ModeSelectorsPlace.appendChild(hrNode)
    sliderInit()
}


function SetLanguage(lang) {//dictionary selector
    langSelected = lang;
    if (langSelected === "RU") {
        currDictionary = russDictionary;
    }
    else if (langSelected === "UA") {
        currDictionary = uaDictionary;
    }
    else if (langSelected === "ENG") {
        currDictionary = engDictionary;
    }
    else {
        currDictionary = engDictionary;
    }
    
}

function GetDict(component) {//wannabe getter for easier dictionary component access
    return currDictionary[component];
}

function TranslateList(list, componentDictionary) {//translate single component
    console.log();
    if (typeof (componentDictionary[0]) != "object") {//translate simple, single array components
        Array.from(list).forEach((element, i) => {
            element.firstChild.data = componentDictionary[i];
        });
    }
    else {//translate composite, multi-array components
        let compiledDict = [];
        Array.from(componentDictionary).forEach((element, i) => {
            compiledDict = compiledDict.concat(element);
        });
        Array.from(list).forEach((element, i) => {
            element.firstChild.data = compiledDict[i];
        });
    }
}

function TranslateAll(lang = langSelected) {//total translation of all components

    langSelected = lang;
    SetLanguage(lang);
    
    let slidersText = document.getElementsByClassName("sliderTranslatePool");
    let menuText = document.getElementsByClassName("menuTranslatePool");
    let popupText = document.getElementsByClassName("popupTranslatePool");
    let popupUpdateText = document.getElementsByClassName("updatePopupTranslatePool");
    let popupNoUpdateText = document.getElementsByClassName("noUpdatePopupTranslatePool");
    let popupLoadingText = document.getElementsByClassName("loadingPopupTranslatePool");
    TranslateList(slidersText, GetDict("sliders"));
    TranslateList(menuText, GetDict("menu"));
    if (popupText[0]) {
        TranslateList(popupText, GetDict("popup"));
    }
    if (popupUpdateText[0]) {
        TranslateList(popupUpdateText, GetDict("updatePopup"));
    }
    if (popupNoUpdateText[0]) {
        TranslateList(popupNoUpdateText, GetDict("noUpdatePopup"));
    }
    if (popupLoadingText[0]) {
        TranslateList(popupLoadingText, GetDict("loadingScreen"));
    }
}


function defaultLang(str) {//interpret browser language string and set language setting
    if (str.includes("ru")) {
        SetLanguage("RU");
    }
    else if (str === "uk" || str === "uk-UA") {
        SetLanguage("UA");
    }
    else {
        SetLanguage("ENG");
    }
}
window.addEventListener('load',  async (event) => {//startup laguage setup
     getLanguagePackets()
});

//Buttons functionality
let langlist = ["ENG", "UA", "RU"]
let navLang = ["en","uk","ru"]
let langButtons = document.getElementById("langPanel");
langButtons.childNodes.forEach((element, i) => {
    element.addEventListener("click", (event) => {
        localStorage.setItem('lang',navLang[i]);
        TranslateAll(langlist[i]);
        makeLangButtonActive(i);
    })
})

//Button active class juggling
let makeLangButtonActive = (i) => {
    if (!(langButtons.childNodes[i].classList.contains("Active"))) {
        langButtons.childNodes[i].classList.add("Active");
        langButtons.childNodes.forEach((element, i) => {
            if (langSelected !== langlist[i]) {
                element.classList.remove("Active");
            }
        });
    }
}