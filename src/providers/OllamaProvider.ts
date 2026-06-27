import axios from "axios";
import { AIProvider } from "../ai/AIProvider.js";


export class OllamaProvider implements AIProvider {


    constructor(
        private baseUrl:string,
        private model:string
    ){}


    async chat(messages:any[]):Promise<any>{


        const response = await axios.post(

            this.baseUrl,

            {
                model:this.model,
                messages,
                stream:false
            }

        );


        return response.data.message;

    }

}