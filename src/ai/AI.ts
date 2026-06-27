import { tools } from "../tools/tools.js";
import { ProviderFactory } from "./ProviderFactory.js";
import { ConfigManager } from "../config/ConfigManager.js";


const messages: any[] = [];


export async function askAI(
    systemPrompt: string,
    userMessage: string
): Promise<any> {


    // Load user selected configuration
    const config = ConfigManager.getConfig();


    // Create selected AI provider
    const provider = ProviderFactory.create(config);



    // Add system prompt once
    if (messages.length === 0) {

        messages.push({
            role: "system",
            content: systemPrompt
        });

    }



    // Add user message
    messages.push({
        role: "user",
        content: userMessage
    });



    console.log(
        `🤖 Using provider: ${config.provider}`
    );



    const message = await provider.chat(messages);



    console.log("Assistant Message:");
    console.log(JSON.stringify(message, null, 2));



    // IMPORTANT for tool calling history
    messages.push(message);



    return message;

}