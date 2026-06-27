export interface UserConfig {

    provider: "nvidia" | "groq" | "ollama";

    baseUrl: string;

    model: string;

    apiKey?: string;

}