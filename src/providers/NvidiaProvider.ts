import axios, { AxiosInstance } from "axios";
import { AIProvider } from "../ai/AIProvider.js";

export class NvidiaProvider implements AIProvider {

    private client: AxiosInstance;

    constructor(
        private apiKey: string,
        private model: string
    ) {
        this.client = axios.create({
            baseURL: "https://integrate.api.nvidia.com/v1",
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                "Content-Type": "application/json"
            }
        });
    }

    async chat(
        messages: any[],
        tools?: any[]
    ) {

        const response = await this.client.post(
            "/chat/completions",
            {
                model: this.model,
                messages,
                tools,
                temperature: 0.2
            }
        );

        return response.data.choices[0].message;
    }
}