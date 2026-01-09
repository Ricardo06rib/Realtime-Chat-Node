const socket = io();
const messages = document.getElementById("messages");
const username = localStorage.getItem("username");

/*
function loadPage() {
    if(localStorage.getItem("name")) return;
    if(localStorage.getItem("room") === roomId) return;

    alert("Entrada bloqueada");
    window.location.href = "/";
}
*/

document.getElementById("chatInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

socket.emit("joinRoom", roomId);

socket.on("chatMessage", (senderName, message) => {
    const container = document.createElement('div');
    container.style.display = "flex";
    container.style.marginBottom = "10px";

    const bubble = document.createElement('div');
    bubble.innerText = `${senderName}: ${message}`;

    bubble.style.padding = "8px 15px";
    bubble.style.borderRadius = "18px";
    bubble.style.maxWidth = "70%";
    bubble.style.wordBreak = "break-word";

    if (senderName === username) {
        container.style.justifyContent = "flex-end";
        bubble.style.backgroundColor = "#128C7E";
        bubble.style.color = "white";
        bubble.style.borderRadius = "18px 18px 0px 18px";
        const msg = document.getElementById("chatInput");
        msg.value = "";
    } else {
        container.style.justifyContent = "flex-start";
        bubble.style.backgroundColor = "#e9e9eb";
        bubble.style.color = "black";
        bubble.style.borderRadius = "18px 18px 18px 0px";
    }

    container.appendChild(bubble);
    messages.appendChild(container);

    messages.scrollTop = messages.scrollHeight;
});

socket.on("chatImage", (senderName, url) => {
    const container = document.createElement('div');
    container.style.display = "flex";
    container.style.marginBottom = "15px";

    const bubble = document.createElement('div');
    bubble.style.padding = "10px";
    bubble.style.borderRadius = "15px";
    bubble.style.maxWidth = "60%";
    bubble.style.display = "flex";
    bubble.style.flexDirection = "column";

    const newImg = document.createElement('img');
    newImg.src = url;
    newImg.style.width = "100%";
    newImg.style.borderRadius = "10px";
    newImg.style.display = "block";

    newImg.onerror = () => container.remove();

    const label = document.createElement('span');
    label.innerText = senderName;
    label.style.fontSize = "0.8rem";
    label.style.marginBottom = "5px";
    label.style.fontWeight = "bold";

    if (senderName === username) {
        container.style.justifyContent = "flex-end";
        bubble.style.backgroundColor = "#007bff";
        label.style.color = "white";
        bubble.style.borderRadius = "15px 15px 0px 15px";
    } else {
        container.style.justifyContent = "flex-start";
        bubble.style.backgroundColor = "#e9e9eb";
        label.style.color = "#555";
        bubble.style.borderRadius = "15px 15px 15px 0px";
    }

    bubble.appendChild(label);
    bubble.appendChild(newImg);
    container.appendChild(bubble);
    messages.appendChild(container);

    messages.scrollTop = messages.scrollHeight;
});

function sendMessage() {
    const msg = document.getElementById("chatInput");

    if (msg.value) {
        socket.emit("sendMessage", username, (msg.value), roomId);
    }
}

function sendImage() {
    const url = document.getElementById("imgInput");

    if (url.style.display !== "flex") {
        url.style.display = "flex";
        url.focus();
        return;
    }

    if (url.value.trim() !== "") {
        socket.emit("sendImage", username, url.value, roomId);
        url.value = "";
        url.style.display = "none";
    } else {
        url.style.display = "none";
    }
}