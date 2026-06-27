import { AIProvider } from "./AIProvider.js";

import { GroqProvider } from "../providers/GroqProvider.js";
import { NvidiaProvider } from "../providers/NvidiaProvider.js";
import { OllamaProvider } from "../providers/OllamaProvider.js";

import { UserConfig } from "../config/UserConfig.js";


export class ProviderFactory {


    static create(config: UserConfig): AIProvider {


        switch(config.provider) {


            case "groq":

                return new GroqProvider(
                    config.baseUrl,
                    config.apiKey!,
                    config.model
                );


            case "nvidia":

                return new NvidiaProvider(
                    config.baseUrl,
                    config.apiKey!,
                    config.model
                );


            case "ollama":

                return new OllamaProvider(
                    config.baseUrl,
                    config.model
                );


            default:

                throw new Error(
                    `Unsupported AI provider: ${config.provider}`
                );

        }

    }

}