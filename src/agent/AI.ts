import "dotenv/config";
import axios from "axios";
import { tools } from "../tools/tools.js";

const messages: any[] = [];

export async function askAI(
    systemPrompt: string,
    userMessage: string
): Promise<any> {

    if (messages.length === 0) {
        messages.push({
            role: "system",
            content: systemPrompt
        });
    }


    messages.push({
        role: "user",
        content: userMessage
    });


    const response = await axios.post(
        "https://integrate.api.nvidia.com/v1/chat/completions",
        {
            model: "qwen/qwen3.5-122b-a10b",
            messages,
            tools,
            tool_choice: "auto",
            temperature:0,
            max_tokens:500,
            stream:false
        },
        {
            headers:{
                Authorization:`Bearer ${process.env.NVIDIA_API_KEY}`,
                "Content-Type":"application/json",
                Accept:"application/json"
            }
        }
    );


    const message = response.data.choices[0].message;


    console.log("Assistant Message:");
    console.log(JSON.stringify(message,null,2));


    // IMPORTANT
    messages.push(message);


    return message;
}