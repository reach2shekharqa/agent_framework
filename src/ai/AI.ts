import { ProviderFactory } from "./ProviderFactory.js";
import { ConfigManager } from "../config/ConfigManager.js";


export class AI {


    private provider;


    constructor() {

        const config =
            ConfigManager.load();


        this.provider =
            ProviderFactory.create(config);

    }



    async chat(
        messages: any[],
        tools?: any[]
    ) {

        return await this.provider.chat(
            messages,
            tools
        );

    }


}