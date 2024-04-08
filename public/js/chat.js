const socket = io()

const chatbox = document.getElementById("chatbox")
const log = document.getElementById("log")
const usernameForm = document.getElementById("usernameForm")
const usernameInput = document.getElementById("usernameInput")
const chatSection = document.getElementById("chatSection")

let user = null; 

usernameForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
        user = username; 
        usernameForm.style.display = "none"; 
        chatSection.style.display = "block"; 
    }
});

chatbox.addEventListener('keyup', e =>{
    if(e.key === "Enter" && user){
        const now = new Date();
        const time = now.toLocaleTimeString(); 
        socket.emit('message', { user: user, message: chatbox.value, time: time });
        chatbox.value = ""; 
    }
});

socket.on('messageLogs', data => {
    let messages = "";
    data.forEach(msg => {
        messages += `${msg.user} dice ${msg.message} enviado a las (${msg.time}) <br/>`;
    });
    log.innerHTML = messages;
});