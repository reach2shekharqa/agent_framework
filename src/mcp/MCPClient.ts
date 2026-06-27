import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";


export class MCPClient {

    private client!: Client;


    async connect(
        command:string,
        args:string[]
    ){

        const transport =
            new StdioClientTransport({
                command,
                args
            });


        this.client = new Client(
            {
                name:"automation-agent",
                version:"1.0.0"
            },
            {
                capabilities:{}
            }
        );


        await this.client.connect(
            transport
        );


        console.log(
          "Connected MCP server"
        );

    }



    async listTools(){

        return await this.client.listTools();

    }



    async callTool(
        name:string,
        args:any
    ){

        return await this.client.callTool({
            name,
            arguments:args
        });

    }

}