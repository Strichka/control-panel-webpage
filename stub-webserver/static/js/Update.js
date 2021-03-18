let UpdatesButton = document.getElementById("UpdatePop");

UpdatesButton.addEventListener("click", (event) => {
    console.log('updates loaded');



    var GETupdates = new XMLHttpRequest();
    GETupdates.open("GET", '/v0/update/list', true);
    GETupdates.send();

    GETupdates.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText);
            UpdateResponse = JSON.parse(this.responseText);
            /*NetConf.forEach((element,i) => {
                element.value = NetResponse[Object.keys(NetResponse)[i]]
                
            });*/

            body = document.getElementById("Body")
            var popup = document.createElement("div");
            if (UpdateResponse.found === false) {// pomenat!
                popup.innerHTML = "<div class='textbox updatePopupTranslatePool'>Найдены обновления!<div class='UpdateList' id='UpdateList'></div><div class='popupButtonPanel'><button class='button updatePopupTranslatePool' id='AgreeUpd'>Обновить</button><button class='button updatePopupTranslatePool' id='DisagreeUpd'>Не обновлять</button></div></div>";
                popup.className = "Popup";
            document.body.appendChild(popup);
            TranslateAll();
            var UpdateList = document.getElementById('UpdateList');
            let updateLines = []; 
            for(let i = UpdateResponse.updates.length -1 ;i>-1;i--){
                updateLines[i] = document.createElement('div')
                var updateitems = UpdateResponse.updates[i]["firmware_version"];
                
                UpdateList.appendChild(updateLines[i]);
                updateLines[i].innerHTML= "<span>"+ updateitems  +"</span>" + "<span>"+ UpdateResponse.updates[i]["change_list"] +"</span>";
                console.log(updateLines[i]);
            }
            console.log(UpdateResponse.updates[UpdateResponse.updates.length-1]["firmware_version"]);
           // var updateitems= UpdateResponse.updates[UpdateResponse.updates.length-1]["firmware_version"];
            //UpdateList.innerHTML= "<span>"+ updateitems  +"</span>" + "<span>"+ UpdateResponse.updates[0]["change_list"]  +"</span>";
                agreeUpd = document.getElementById('AgreeUpd');
                denyUpd = document.getElementById('DisagreeUpd');

                agreeUpd.addEventListener("click", (event) => {

                    askUpdate = new XMLHttpRequest();
                    askUpdate.open('GET', '/v0/update/perform',true);
                    askUpdate.send();

                    PingServer();


                });

                denyUpd.addEventListener("click", (event) => {

                    popup.parentNode.removeChild(popup);

                    


                });
            

            }
            else{
                popup.innerHTML = "<div class='textbox noUpdatePopupTranslatePool'>У вас последняя версия!<div class='UpdateList' id='UpdateList'></div><div class='popupButtonPanel' style='direction: rtl;'><button class='button noUpdatePopupTranslatePool' id='AgreeClosePopup'>Хорошо</button></div>";
                popup.className = "Popup";
            document.body.appendChild(popup);
                TranslateAll();
            agreeClosePopup = document.getElementById('AgreeClosePopup');
            agreeClosePopup.addEventListener("click", (event) =>{

                popup.parentNode.removeChild(popup);
            });
            


            }
            

        }
    }


});