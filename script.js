let voices = []; // Array to store available voices

// Populate the voice options in the dropdown
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    const voiceSelect = document.getElementById('voiceSelect');
    voiceSelect.innerHTML = '';

    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

// Ensure voices are loaded and populate the dropdown
window.speechSynthesis.onvoiceschanged = loadVoices;

function sendMessage() {
    const userInput = document.getElementById('userInput').value.trim();
    if (userInput === '') return;

    // Display user's message
    displayMessage("User", userInput);
    document.getElementById('userInput').value = '';

    // Basic chatbot responses
    let botResponse = getBotResponse(userInput);
    
    // Display and speak the bot's response
    displayMessage("Bot", botResponse);
    speakResponse(botResponse);
}

function displayMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to bottom
}

function getBotResponse(message) {
    message = message.toLowerCase();
    if (message.includes("hello") || message.includes("hi")) {
        return "Hello! How can I assist you today?";
    } else if (message.includes("how are you")) {
        return "I'm just a bot, but I'm here to help!";
    } else if (message.includes("bye")) {
        return "Goodbye! Have a great day!";
    } else {
        return "I'm not sure how to respond to that. Could you ask something else?";
    }
}

function speakResponse(response) {
    const voiceSelect = document.getElementById('voiceSelect');
    const selectedVoiceIndex = voiceSelect.value;
    const speech = new SpeechSynthesisUtterance(response);
    speech.voice = voices[selectedVoiceIndex];
    speech.lang = "en-US";
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
