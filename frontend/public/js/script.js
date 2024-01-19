let socket = io.connect("http://localhost:3000");
let form = document.getElementById("nameForm");
let inputNick = document.getElementById("inputNickname");
let userName = '';
let address = 'http://localhost:3000/chat/';

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if(inputNick.value)
        userName = inputNick.value;
    
    socket.emit('name', userName);
    address += userName;
    window.location.replace(address);
});