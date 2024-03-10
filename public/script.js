let socket = io();

const username = document.getElementById('username');
const password = document.getElementById('password');
const inputUsername = document.getElementById('inputUsername');
const input = document.getElementById('input');
const loginBtn = document.getElementById('loginBtn');
const disBtn = document.getElementById('disBtn');
const chatBox = document.getElementById('chatBox');
const loginForm = document.getElementById('loginForm');
const sendBtn = document.getElementById('sendBtn');
const messages = document.getElementById('messages');
const toggleButton = document.getElementById('toggle-btn');


chatBox.style.visibility = "hidden";
loginBtn.addEventListener('click', () => {
    socket.emit('login', {
        username: username.value,
        password: password.value
    })
})


socket.on('logged_in', (data) => {
    chatBox.style.visibility = "visible";
    loginForm.style.visibility = "hidden";
})


sendBtn.addEventListener('click', () => {
    socket.emit('chat_message', {
        sendToUser: inputUsername.value,
        msg: input.value
    })
    input.value = '';
    inputUsername.value = '';
})


socket.on('message-rcvd', (data) => {
    const item = document.createElement('li');
    item.textContent = data.msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})


toggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (socket.connected) {
        toggleButton.innerText = 'Connect';
        socket.disconnect();
        chatBox.style.visibility = "hidden";
        loginForm.style.visibility = "visible";
    }
});

socket.on('login_error', () => {
    username.value = '';
    password.value = '';
    window.alert('User and password does not match');
})
socket.on('no_user', () => {
    input.value = '';
    inputUsername.value = '';
    window.alert('No such user exist!');
})

