import OpenAI from "https://cdn.skypack.dev/openai";
import { ENCODED_GITHUB_TOKEN } from "./config.js";

function decodeToken(encodedToken) {
    return atob(encodedToken);  // Decodes Base64 token
}

const GITHUB_TOKEN = decodeToken(ENCODED_GITHUB_TOKEN);


const token = GITHUB_TOKEN;

export async function main(userCommand) {
    const client = new OpenAI({
        baseURL: "https://models.inference.ai.azure.com",
        apiKey: token,
        dangerouslyAllowBrowser: true
    });

    const response = await client.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are a task analyzer. Extract the following details from the user's input:

                1. Operation (Add/Delete/Update)  
                2. Task description  
                3. Urgency (High/Medium/Low)  
                4. Date and Time (if mentioned)  
                
                Respond in JSON format like:  
                
                {
                  "operation": "...",
                  "task": "...",
                  "urgency": "...",
                  "datetime": "..." (or null if not specified)
                }
                
                Keep the task field case-insensitive for comparison purposes.`
            },
            {
                role: "user",
                content: userCommand
            }
        ],
        model: "gpt-4o",
        temperature: 0.7,
        max_tokens: 4096,
        top_p: 1
    });

    console.log(response.choices[0].message.content); // Corrected response structure
    const content = response.choices[0].message.content.trim();  // Add this line
    const cleanedContent = content.replace(/```json|```/g, '').trim();  // Add this line
    return JSON.parse(cleanedContent);
}