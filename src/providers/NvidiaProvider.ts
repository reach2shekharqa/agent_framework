import axios, { AxiosInstance } from "axios";
import { AIProvider } from "../ai/AIProvider.js";


export class NvidiaProvider implements AIProvider {


    private client: AxiosInstance;



    constructor(
        private apiKey: string,
        private model: string
    ) {


        this.client = axios.create({

            baseURL:
                "https://integrate.api.nvidia.com/v1",


            headers: {

                Authorization:
                    `Bearer ${this.apiKey}`,


                "Content-Type":
                    "application/json"

            }

        });

    }





    async chat(
    messages:any[],
    tools?:any[]
) {

    try {

        const payload:any = {

            model: this.model,

            messages,

            temperature:0.2

        };


        if(tools && tools.length > 0){

            payload.tools = tools;

        }


        // console.log(
        //     "NVIDIA PAYLOAD:",
        //     JSON.stringify(
        //         payload,
        //         null,
        //         2
        //     )
        // );


        const response =
            await this.client.post(
                "/chat/completions",
                payload
            );


        return response.data
            .choices[0]
            .message;


    }
    catch(error:any){

        console.log(
            "NVIDIA ERROR:",
            error.response?.data ||
            error.message
        );

        throw error;

    }

}


}