const russDictionary = {
    sliders: ["Яркость: ", "Скорость: ", "Ширина: ", "Количество светодиодов: ","Применить"],
    menu: [["Режимы", "Режим 1", "Режим 2", "Режим 3"],
    ["Сеть", "Имя сети", "Пароль сети", "Имя локальной сети", "Пароль локальной сети", "Сохранить"],
    /*["Обновления", "Проверить Обновления"],*/
    ["Информация"]],
    popup: ["Согласен? Lorem ipsum lorem ipsum lorem lorem, Согласен же?", "Принять", "Закрыть"],
    updatePopup: ["Есть обновления!", "Обновить", "Закрыть"],
    noUpdatePopup: ["Последняя версия!", "Отлично"],
    loadingScreen: ["Грузим"]
}

const engDictionary = {
    sliders: ["Brightness: ", "Speed: ", "Width: ", "LED count: ","Accept"],
    menu: [["Modes", "Mode 1", "Mode 2", "Mode 3"],
    ["Network", "Network Name", "Network Password", "Local network name", "Local Network Password", "Save"],
    /*["Updates", "Check Updates"],*/
    ["Info"]],
    popup: ["Accept it pls, Lorem ipsum lorem ipsum lorem lorem ", "Accept", "Close"],
    updatePopup: ["Found Updates!", "Update", "Close"],
    noUpdatePopup: ["Latest version!", "Good"],
    loadingScreen: ["Loading"]
}

const uaDictionary = {
    sliders: ["Яскравість: ", "Швидкість: ", "Ширина: ", "Кількіть Світлодіодів: ","Зберегти"],
    menu: [["Режими", "Режим 1", "Режим 2", "Режим 3"],
    ["Мережа", "Ім'я мережі", "Пароль мережі", "Ім'я локальної мережі", "Пароль локальної мережі", "Зберегти"],
    /*["Оновлення", "Перевірити оновлення"],*/
    ["Інформація"]],
    popup: ["Згоден? Lorem ipsum lorem ipsum lorem lorem, Згоден же?", "Згоден", "Закрити"],
    updatePopup: ["Знайдені оновлення!", "Оновити", "Закрити"],
    noUpdatePopup: ["Остання версія!", "Файно"],
    loadingScreen: ["Завантаження"]
}

let currDictionary = engDictionary;
let langSelected = "ENG";

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

let slidersText = document.getElementsByClassName("sliderTranslatePool");
let menuText = document.getElementsByClassName("menuTranslatePool");
let popupText = document.getElementsByClassName("popupTranslatePool");
let popupUpdateText = document.getElementsByClassName("updatePopupTranslatePool");
let popupNoUpdateText = document.getElementsByClassName("noUpdatePopupTranslatePool");
let popupLoadingText = document.getElementsByClassName("loadingPopupTranslatePool");

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
window.addEventListener('load', (event) => {//startup laguage setup
    if(localStorage.getItem('lang')){
        defaultLang(localStorage.getItem('lang'));
    }
    else{
        localStorage.setItem('lang', navigator.language);
        defaultLang(navigator.language);
    }
    TranslateAll(langSelected);
    langButtons.childNodes[langlist.indexOf(langSelected)].classList.add("Active");
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