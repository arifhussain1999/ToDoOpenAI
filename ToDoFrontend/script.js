import { main as processWithAI } from "./openAI-integreation.js";

document.addEventListener('DOMContentLoaded', () => {
    const voiceButton = document.querySelector('.voice-btn');
    if (voiceButton) {
        voiceButton.addEventListener('click', startListening);
    }
});

function startListening() {
    // if ('webkitSpeechRecognition' in window) {
    //     const recognition = new webkitSpeechRecognition();
    //     recognition.onstart = function () {
    //         console.log("Listening started");
    //     };
    //     recognition.onresult = function (event) {
    //         const transcript = event.results[0][0].transcript;
    //         console.log('Got transcript:', transcript);
    //         processCommand(transcript);  // Now processes the transcript correctly
    //     };
    //     recognition.start(); // Missing recognition start in original code
    // } else {
    //     alert("Not supported by the browser");
    // }
    processCommand("Add Clean car on 25th March 2025 highly urgent")
}

async function processCommand(command) {
    try {
        const aiResponse = await processWithAI(command);
        console.log("AI Response:", aiResponse);  // Display AI response for better visibility
    } catch (error) {
        console.error("Error processing command:", error);
    }
}