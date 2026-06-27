import axios from "axios";
import { AIProvider } from "../ai/AIProvider.js";


export class NvidiaProvider implements AIProvider {


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

                "https://integrate.api.nvidia.com/v1/chat/completions",

                {

                    model: this.model,

                    messages,

                    tools,

                    temperature: 0.2

                },

                {

                    headers: {
                        Authorization:
                            `Bearer ${this.apiKey}`,

                        "Content-Type":
                            "application/json"
                    }

                }

            );



        return response.data
            .choices[0]
            .message;


    }



}