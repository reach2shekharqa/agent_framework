import { readFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

import { MCPClient } from "./MCPClient.js";
import { MCPToolLoader } from "../tools/MCPToolLoader.js";
import { ToolRegistry } from "../tools/ToolRegistry.js";


interface MCPServerConfig {
    command: string;
    args: string[];
}


interface MCPConfig {
    servers: Record<string, MCPServerConfig>;
}



export class MCPManager {


    private clients: MCPClient[] = [];



    constructor(
        private readonly toolRegistry: ToolRegistry
    ) {}



    async initialize() {


        const config =
            await this.loadConfig();



        for (const serverName of Object.keys(config.servers)) {


            const server =
                config.servers[serverName];



            console.log(
                `Starting MCP server: ${serverName}`
            );



            const client =
                new MCPClient();



            await client.connect(
                server.command,
                server.args
            );



            const loader =
                new MCPToolLoader(
                    client,
                    this.toolRegistry
                );



            await loader.load();



            this.clients.push(client);

        }


        console.log(
            "All MCP tools loaded"
        );

    }





    private async loadConfig(): Promise<MCPConfig> {


        const configPath =
            path.join(
                os.homedir(),
                ".automation-agent",
                "mcp.json"
            );



        const content =
            await readFile(
                configPath,
                "utf-8"
            );



        return JSON.parse(content);

    }


}