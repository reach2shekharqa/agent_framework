import axios from "axios";
import { AIProvider } from "../ai/AIProvider.js";


export class OllamaProvider implements AIProvider {


    constructor(
        private model: string
    ) { }



    async chat(
        messages: any[],
        tools?: any[]
    ) {


        const response =
            await axios.post(

                "http://localhost:11434/api/chat",

                {

                    model: this.model,

                    messages,

                    stream: false,

                    tools

                }

            );


        return response.data.message;


    }


}