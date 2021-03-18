

const russDictionary = {
    sliders:["Яркостььььььь: ","Скорость: ","Ширина: ","Количество светодиодов: "],
    menu:[["Режимы","Режим 1","Режим 2","Режим 3"],
    ["Сеть","Имя сети","Пароль сети","Имя локальной сети","Пароль локальной сети","Сохранить"],
    ["Обновления","Проверить Обновления"],
    ["Информация"]],
    popup:["Согласен? ccccccccccc cccccccccccc ccccccccccccccccccccccccccc cccccccccccccccc cccccccccccccc ccccccccccc cccccccccccc cccccccccccccccccccccccccccccccccccccc cccccccccccc cccccccccccccccccccccccccccccccccccccc cccccccccccc ccccccccccccccccccccccccccc cccccccccccccccc cccccccccccccc cccccccccccccccc cccccccccccccccc ccccccccccccccc cccccccccccccccc cccccccccccccc cccccccccccccccc cccccccccccccccc ccccccccccccccc cccccccccccccccc cccccccccccccc cccccccccccccccc cccccccccccccccc ccccccccccccccc cccccccccccccccc cccccccccccccccc ccccccccccccccc Согласен же?","да","нет"],
    updatePopup:["Есть парочка обнов!","канеш","не"],
    noUpdatePopup:["Последняя версия!","Отлично"],
    loadingScreen:["Грузим"]
}

const engDictionary = {
    sliders:["Brightness: ","Speed: ","Width: ","LED count: "],
    menu:[["Modes","Mode 1","Mode 2","Mode 3"],
    ["Network","Network Name","Network Password","Local network name","Local Network Password","Save"],
    ["Updates","Check Updates"],
    ["Info"]],
    popup:["Accept it pls Accept it pls Accept it pls Accept it pls Accept it pls Accept it pls", "yes","no"],
    updatePopup:["Found Updates!","yes","no"],
    noUpdatePopup:["Latest version!","Good"],
    loadingScreen:["Loading"]
}

const uaDictionary = {
    sliders:["Яскравість: ","Швидкість: ","Ширина: ","Кількіть Світлодіодів: "],
    menu:[["Режими","Режим 1","Режим 2","Режим 3"],
    ["Мережа","Ім'я мережі","Пароль мережі","Ім'я локальної мережі","Пароль локальної мережі","Зберегти"],
    ["Оновлення","Перевірити оновлення"],
    ["Інформація"]],
    popup:["Згоден? ccccccccccc cccccccccccc ccccccccccccccccccccccccccc cccccccccccccccc cccccccccccccc ccccccccccc cccccccccccc cccccccccccccccccccccccccccccccccccccc cccccccccccc cccccccccccccccccccccccccccccccccccccc cccccccccccc ccccccccccccccccccccccccccc cccccccccccccccc cccccccccccccc cccccccccccccccc cccccccccccccccc ccccccccccccccc cccccccccccccccc cccccccccccccc cccccccccccccccc cccccccccccccccc ccccccccccccccc cccccccccccccccc cccccccccccccc cccccccccccccccc cccccccccccccccc ccccccccccccccc cccccccccccccccc cccccccccccccccc ccccccccccccccc Згоден же?","Так","Ні"],
    updatePopup:["Є кілька оновлень!","Звісно","Ні"],
    noUpdatePopup:["Остання версія!","Файно"],
    loadingScreen:["Завантаження"]
}



let currDictionary = russDictionary;
let langSelected = "ENG";

function SetLanguage(lang){
    langSelected = lang;
    if(langSelected === "RU"){
        currDictionary = russDictionary;
    }
    else if(langSelected === "UA"){
        currDictionary = uaDictionary;
    }
    else if(langSelected === "ENG"){
        currDictionary = engDictionary;
    }
}

function GetDict(component){
    return currDictionary[component];
}

function TranslateList(list,componentDictionary){
    console.log();
    if(typeof(componentDictionary[0])!="object"){
    Array.from(list).forEach((element,i) => {
        element.firstChild.data = componentDictionary[i];
        console.log(componentDictionary[i]);
    });
}
else{
    let compiledDict = [];
    Array.from(componentDictionary).forEach((element,i)=>{
        //компиляция словаря
        compiledDict = compiledDict.concat(element);
    });
    console.log(compiledDict);
    Array.from(list).forEach((element,i) => {
        
        element.firstChild.data = compiledDict[i];
        console.log(compiledDict[i]);
    });
}
}

function TranslateAll(lang = langSelected){
    SetLanguage(lang);
    TranslateList(slidersText,GetDict("sliders"));
    TranslateList(menuText,GetDict("menu"));
    if(popupText[0]){
    TranslateList(popupText,GetDict("popup"));
    }
    if(popupUpdateText[0]){
    TranslateList(popupUpdateText,GetDict("updatePopup"));
    }
    if(popupNoUpdateText[0]){
        TranslateList(popupNoUpdateText,GetDict("noUpdatePopup"));
        }
    if(popupLoadingText[0]){
        TranslateList(popupLoadingText,GetDict("loadingScreen"));
    }
}



let slidersText = document.getElementsByClassName("sliderTranslatePool");
let menuText = document.getElementsByClassName("menuTranslatePool");
let popupText = document.getElementsByClassName("popupTranslatePool");
let popupUpdateText = document.getElementsByClassName("updatePopupTranslatePool");
let popupNoUpdateText = document.getElementsByClassName("noUpdatePopupTranslatePool");
let popupLoadingText = document.getElementsByClassName("loadingPopupTranslatePool");

function defaultLang(str){
    if (str.includes("ru")){
        SetLanguage("RU");
    }
    else if (str === "uk"){
        SetLanguage("UA");
    }
    else {
        SetLanguage("ENG");
    }
}
window.addEventListener('load', (event) => {
    
    defaultLang(navigator.language);
    TranslateAll(langSelected);
    


});