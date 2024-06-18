const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
let chatHistory = [];

function sendMessage() {
    const message = userInput.value;
    if (message.trim() === '') return;

    appendMessage('You', message);
    userInput.value = '';

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, history: chatHistory }),
    })
    .then(response => response.json())
    .then(data => {
        chatHistory = data.history;
        appendMessage('Chatbot', data.response);
    })
    .catch(error => console.error('Error:', error));
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
