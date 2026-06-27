import fs from "fs";
import path from "path";
import os from "os";

import { UserConfig } from "./UserConfig.js";


export class ConfigManager {


    private static configDir =
        path.join(
            os.homedir(),
            ".automation-agent"
        );


    private static configFile =
        path.join(
            this.configDir,
            "config.json"
        );



    static exists(): boolean {

        return fs.existsSync(
            this.configFile
        );

    }



    static save(
        config: UserConfig
    ): void {


        if(!fs.existsSync(this.configDir)){

            fs.mkdirSync(
                this.configDir,
                {
                    recursive:true
                }
            );

        }


        fs.writeFileSync(
            this.configFile,
            JSON.stringify(
                config,
                null,
                2
            )
        );


    }



    static load(): UserConfig {


        if(!this.exists()){

            throw new Error(
                "Configuration not found"
            );

        }


        const data =
            fs.readFileSync(
                this.configFile,
                "utf-8"
            );


        return JSON.parse(data);

    }
    static getConfig(): UserConfig {

    return this.load();

}

}