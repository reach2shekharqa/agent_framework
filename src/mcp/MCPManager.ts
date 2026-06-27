import fs from "fs/promises";
import path from "path";
import os from "os";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";


interface MCPServerConfig {

    name: string;

    command: string;

    args?: string[];

    env?: Record<string, string>;

}



export class MCPManager {


    private configPath =
        path.join(
            os.homedir(),
            ".automation-agent",
            "mcp.json"
        );



    private servers: MCPServerConfig[] = [];



    private connectedServers =
        new Map<string, Client>();




    constructor(
        private toolRegistry?: any
    ) {

    }




    async initialize() {

        await this.loadConfig();

    }




    private async loadConfig() {


        const content =
            await fs.readFile(
                this.configPath,
                "utf-8"
            );


        const config =
            JSON.parse(content);



        this.servers =
            Object.entries(
                config.servers || {}
            )
            .map(
                ([name, value]: any) => ({

                    name,

                    command: value.command,

                    args: value.args || [],

                    env: value.env || {}

                })
            );

    }




    async getServers() {


        if(this.servers.length === 0){

            await this.loadConfig();

        }


        return this.servers;

    }





    async connectServer(
        serverName:string
    ){


        if(
            this.connectedServers.has(serverName)
        ){

            return this.connectedServers.get(
                serverName
            );

        }



        const server =
            this.servers.find(
                s => s.name === serverName
            );



        if(!server){

            throw new Error(
                `MCP server not found: ${serverName}`
            );

        }




        const transport =
            new StdioClientTransport({

                command: server.command,

                args: server.args,


                env: Object.fromEntries(
                    Object.entries({

                        ...process.env,

                        ...server.env

                    })
                    .filter(
                        ([,value]) =>
                            value !== undefined
                    )
                ) as Record<string,string>

            });





        const client =
            new Client({

                name:"automation-agent",

                version:"1.0.0"

            });





        await client.connect(
            transport
        );




        this.connectedServers.set(
            serverName,
            client
        );



        return client;

    }






    getStatus(){


        return {

            totalServers:
                this.servers.length,


            servers:
                this.servers.map(server => ({

                    name:server.name,

                    connected:
                        this.connectedServers.has(
                            server.name
                        )

                }))

        };

    }



}