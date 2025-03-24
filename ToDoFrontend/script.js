import { main as processWithAI } from "./openAI-integreation.js";

document.addEventListener('DOMContentLoaded', () => {
    const voiceButton = document.querySelector('.voice-btn');
    if (voiceButton) {
        voiceButton.addEventListener('click', startListening);
    }
    clearTaskOutput();
});
function clearTaskOutput() {
    const taskInfo = document.querySelector('.task-info');
    if (taskInfo) {
        document.getElementById('task').textContent = '';
        document.getElementById('urgency').textContent = '';
        document.getElementById('datetime').textContent = '';
    }
    const confirmationArea = document.getElementById('confirmation-area');
    if (confirmationArea) {
        confirmationArea.innerHTML = '';
    }
}

function startListening() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.onstart = function () {
            console.log("Listening started....");
            clearTaskOutput();
        };
        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            console.log('Got transcript:', transcript);
            processCommand(transcript);  // Now processes the transcript correctly
        };
        recognition.start(); // Missing recognition start in original code
    } else {
        alert("Not supported by the browser");
    }
}

async function processCommand(command) {
    try {
        const aiResp = await processWithAI(command);
        console.log("AI Response:", aiResp);

        const aiResponse = aiResp.choices?.[0]?.message?.content || aiResp;
        const parsedResponse = typeof aiResponse === 'string' ? JSON.parse(aiResponse) : aiResponse;

        const requestBody = {
            operation: parsedResponse.operation,
            task: parsedResponse.task,
            urgency: parsedResponse.urgency,
            dateTime: parsedResponse.dateTime
        };

        const response = await fetch("http://localhost:8080/api/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            console.error(`Http error with status code: ${response.status}`);
            return { error: `Request failed with status ${response.status}` };
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error("Error processing command:", error);
        return { error: "Internal processing error" };
    }
}

