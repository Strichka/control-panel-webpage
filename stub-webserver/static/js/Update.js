let UpdatesButton = document.getElementById("UpdatePop");

UpdatesButton.addEventListener("click", (event) => {
    console.log('updates loaded');



    var GETupdates = new XMLHttpRequest();
    GETupdates.open("GET", '/update/check', true);
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
            if (UpdateResponse.found === false) {
                popup.innerHTML = "<div class='textbox'>Найдены обновления!<div class='UpdateList' id='UpdateList'></div><div><button class='button' id='AgreeUpd'>Обновить</button><button class='button' id='DisagreeUpd'>Не обновлять</button></div></div>";
                popup.className = "Popup";
            document.body.appendChild(popup);
            var UpdateList = document.getElementById('UpdateList');
            
            console.log(UpdateResponse.updates[UpdateResponse.updates.length-1]["firmware_version"]);
            var updateitems= UpdateResponse.updates[UpdateResponse.updates.length-1]["firmware_version"];
            UpdateList.innerHTML= "<span>"+ updateitems  +"</span>" + "<span>"+ UpdateResponse.updates[0]["change_list"]  +"</span>";
                agreeUpd = document.getElementById('AgreeUpd');
                denyUpd = document.getElementById('DisagreeUpd');

                agreeUpd.addEventListener("click", (event) => {

                    askUpdate = new XMLHttpRequest();
                    askUpdate.open('GET', '/update/perform',true);
                    askUpdate.send();

                    PingServer();


                });

                denyUpd.addEventListener("click", (event) => {

                    popup.parentNode.removeChild(popup);

                    


                });
            

            }
            else{
                popup.innerHTML = "<div class='textbox'>У вас последняя версия!<div class='UpdateList' id='UpdateList'></div><div><button class='button' id='AgreeClosePopup'>Хорошо</button></div>";
                popup.className = "Popup";
            document.body.appendChild(popup);

            agreeClosePopup = document.getElementById('AgreeClosePopup');
            agreeClosePopup.addEventListener("click", (event) =>{

                popup.parentNode.removeChild(popup);
            });
            


            }
            

        }
    }


});