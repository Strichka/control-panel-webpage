window.addEventListener('load', (event) => {
    console.log('page is fully loaded');


    var GETpolicy = new XMLHttpRequest();
    GETpolicy.open("GET", '/v0/policy', true);
    GETpolicy.send();

    GETpolicy.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            var policyResponse = JSON.parse(this.responseText)
            console.log(policyResponse.accepted)

            if (policyResponse.accepted == true || /*первое убрать*/policyResponse.accepted == false || policyResponse.accepted == null) {





                body = document.getElementById("Body")
                var popup = document.createElement("div");
                popup.innerHTML = "<div class='textbox'><span class='popupTranslatePool'>Привет! \n Мы бы хотели собрать всю твою личную информацию</span><div class='popupButtonPanel'><button class='button popupTranslatePool' id='Agree'>согласен</button><button class='button popupTranslatePool' id='Disagree'>не согласен</button></div></div>";
                popup.className = "Popup";
                document.body.appendChild(popup);
                TranslateAll();
                document.getElementById('Agree').addEventListener('click', () => {
                    popup.parentNode.removeChild(popup);
                    var ACCEPTpolicy = new XMLHttpRequest();
                    ACCEPTpolicy.open("PUT", '/v0/policy', true);
                    console.log(JSON.stringify({accepted: true}));
                    ACCEPTpolicy.send(JSON.stringify({accepted: true}));
                });
                document.getElementById('Disagree').addEventListener('click', () => {
                    popup.parentNode.removeChild(popup);
                    var DECLINEpolicy = new XMLHttpRequest();
                    DECLINEpolicy.open("PUT", '/v0/policy', true);
                    DECLINEpolicy.send(JSON.stringify({accepted: false}));
                });
            }
        }
    }
});


