import { main as processWithAI } from "./openAI-integreation.js";

document.addEventListener('DOMContentLoaded', () => {
    const voiceButton = document.querySelector('.voice-btn');
    if (voiceButton) {
        voiceButton.addEventListener('click', startListening);
    }
    clearTaskOutput();
});
function clearTaskOutput(){
    const task=document.querySelector('.task.info');
    if(taskInfo){
        document.getElementById('task').textContent='';
        document.getElementById('urgency').textContent='';
        document.getElementById('datetime').textContent='';
    }
    const confirmationArea=document.getElementById('confirmation-area');
    if(confirmationArea){
        confirmationArea.innerHTML='';
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
    processCommand("Add Clean car on 25th March 2025 highly urgent")
}

async function processCommand(command) {
    try {
        const aiResponse = await processWithAI(command);
        const requestBody={
            operation:aiResponse.operation,
            task:aiResponse.task,
            urgency:aiResponse.urgency,
            dateTime:aiResponse.dateTime
        }
        const response=await fetch("http://localhost:8080/api/add",{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(requestBody)
        });
        if(response.ok){

        }else{
            
        }
    } catch (error) {
        console.error("Error processing command:", error);
    }
}