import { MCPToolAdapter } from "../tools/MCPToolAdapter.js";
import { MCPManager } from "./MCPManager.js";
import { MCPClient } from "./MCPClient.js";


export class MCPToolLoader {


    constructor(
        private mcpManager: MCPManager
    ) {

    }



    async loadTools() {


        const tools = [];



        const servers =
            await this.mcpManager.getServers();




        for (const server of servers) {


            const sdkClient =
                await this.mcpManager.connectServer(
                    server.name
                );



            if (!sdkClient) {

                continue;

            }




            const mcpClient =
                new MCPClient();



            mcpClient.setClient(
                sdkClient
            );





            const response =
                await mcpClient.listTools();





            for (const tool of response.tools) {



                const adapter =
                    new MCPToolAdapter(
                        mcpClient,
                        tool
                    );



                tools.push(adapter);

            }


        }




        return tools;

    }


}