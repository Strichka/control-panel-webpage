window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    body = document.getElementById("Body")
    var popup = document.createElement("div");
        popup.innerHTML = "<div class='textbox'>Привет! <br> Мы бы хотели собрать всю твою личную информацию<div><button class='button' id='Agree'>согласен</button><button class='button' id='Disagree'>не согласен</button></div></div>";
        popup.className = "Popup";
    document.body.appendChild(popup);

    document.getElementById('Agree').addEventListener('click', () =>{
    popup.parentNode.removeChild(popup);
});
    document.getElementById('Disagree').addEventListener('click', () =>{
    popup.parentNode.removeChild(popup);
});
    
  });

  