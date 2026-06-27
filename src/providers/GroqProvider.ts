import axios from "axios";
import { AIProvider } from "../ai/AIProvider.js";


export class GroqProvider implements AIProvider {


    constructor(
        private baseUrl: string,
        private apiKey: string,
        private model: string
    ) {}


    async chat(messages: any[]): Promise<any> {


        const response = await axios.post(

            this.baseUrl,

            {
                model: this.model,
                messages,
                temperature: 0,
                max_tokens: 500,
                stream: false
            },

            {
                headers: {

                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json"

                }
            }

        );


        return response.data.choices[0].message;

    }

}