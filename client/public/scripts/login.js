function entrarChatGlobal(){
    let username = document.getElementById("username").value;
    if(!username){
        alert("Digite um nome de usuário");
        return;
    }

    if (!localStorage.getItem("username")) localStorage.setItem("username", username);
    if (localStorage.getItem("room")) localStorage.removeItem("room");
    localStorage.setItem("room", "global");

    window.location.href = "/global"
}

function chatEspecifico(){
    document.getElementById("inputRoomBox").style.display = "flex";
}

function entrarChatEspecifico() {
    let username = document.getElementById("username").value;
    if(!username){
        alert("Digite um nome de usuário");
        return;
    }

    if (!localStorage.getItem("username")) localStorage.setItem("username", username);
    if (localStorage.getItem("room")) localStorage.removeItem("room");
    localStorage.setItem("room", document.getElementById("room").value);

    window.location.href = `/${localStorage.getItem("room")}`;
}