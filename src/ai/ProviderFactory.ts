import { UserConfig } from "../config/UserConfig.js";
import { NvidiaProvider } from "../providers/NvidiaProvider.js";
import { GroqProvider } from "../providers/GroqProvider.js";
import { OllamaProvider } from "../providers/OllamaProvider.js";


export class ProviderFactory {


    static create(
        config: UserConfig
    ) {


        switch (config.provider) {


            case "nvidia":

                return new NvidiaProvider(
                    config.apiKey!,
                    config.model!
                );


            case "groq":

                return new GroqProvider(
                    config.apiKey!,
                    config.model!
                );


            case "ollama":

                return new OllamaProvider(
                    config.model!
                );


            default:

                throw new Error(
                    `Unsupported provider ${config.provider}`
                );


        }



    }


}