import axios from "axios";
import { AIProvider } from "../ai/AIProvider.js";


export class GroqProvider implements AIProvider {


    constructor(
        private apiKey: string,
        private model: string
    ) { }



    async chat(
        messages: any[],
        tools?: any[]
    ) {


        const response =
            await axios.post(

                "https://api.groq.com/openai/v1/chat/completions",

                {

                    model: this.model,

                    messages,

                    tools,

                    temperature: 0.2

                },

                {

                    headers: {
                        Authorization:
                            `Bearer ${this.apiKey}`
                    }

                }

            );


        return response.data
            .choices[0]
            .message;


    }


}