window.addEventListener('load', (event) => {
    console.log('page is fully loaded');


    var GETpolicy = new XMLHttpRequest();
    GETpolicy.open("GET", '/policy', true);
    GETpolicy.send();

    GETpolicy.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            var policyResponse = JSON.parse(this.responseText)
            console.log(policyResponse.is_initialized)

            if (policyResponse.is_initialized === false) {





                body = document.getElementById("Body")
                var popup = document.createElement("div");
                popup.innerHTML = "<div class='textbox'>Привет! <br> Мы бы хотели собрать всю твою личную информацию<div><button class='button' id='Agree'>согласен</button><button class='button' id='Disagree'>не согласен</button></div></div>";
                popup.className = "Popup";
                document.body.appendChild(popup);

                document.getElementById('Agree').addEventListener('click', () => {
                    popup.parentNode.removeChild(popup);
                    var ACCEPTpolicy = new XMLHttpRequest();
                    ACCEPTpolicy.open("PUT", '/policy', true);
                    console.log(JSON.stringify({is_initialized: true,is_accepted: true}));
                });
                document.getElementById('Disagree').addEventListener('click', () => {
                    popup.parentNode.removeChild(popup);
                    var DECLINEpolicy = new XMLHttpRequest();
                    DECLINEpolicy.open("PUT", '/policy', true);
                    DECLINEpolicy.send(JSON.stringify({is_initialized: false,is_accepted: false}));
                });
            }
        }
    }
});


