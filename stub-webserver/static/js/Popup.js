window.addEventListener('load', (event) => {//check policy on page load
    var GETpolicy = new XMLHttpRequest();
    GETpolicy.open("GET", '/v0/policy', true);
    GETpolicy.send();
    GETpolicy.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {//on response
            var policyResponse = JSON.parse(this.responseText);
            if (policyResponse.accepted == false || policyResponse.accepted == null) {//add policy popup if needed
                body = document.getElementById("Body")
                var popup = document.createElement("div");
                popup.innerHTML = "<div class='textbox'><span class='policyspan popupTranslatePool'>lorem\n lorem</span><div class='popupButtonPanel'><button class='button popupTranslatePool' id='Agree'>ok</button><button class='button popupTranslatePool' id='Disagree'>no</button></div></div>";
                popup.className = "Popup";
                document.body.appendChild(popup);
                TranslateAll();
                document.getElementById('Agree').addEventListener('click', () => {
                    popup.parentNode.removeChild(popup);
                    var ACCEPTpolicy = new XMLHttpRequest();
                    ACCEPTpolicy.open("POST", '/v0/policy', true);
                    ACCEPTpolicy.setRequestHeader('Content-type', 'application/json');
                    console.log(JSON.stringify({ accepted: true }));
                    ACCEPTpolicy.send(JSON.stringify({ accepted: true }));
                });
                document.getElementById('Disagree').addEventListener('click', () => {
                    popup.parentNode.removeChild(popup);
                    var DECLINEpolicy = new XMLHttpRequest();
                    DECLINEpolicy.open("POST", '/v0/policy', true);
                    DECLINEpolicy.setRequestHeader('Content-type', 'application/json');
                    DECLINEpolicy.send(JSON.stringify({ accepted: false }));
                });
            }
        }
    }
});


