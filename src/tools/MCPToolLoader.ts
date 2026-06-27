import { MCPClient } from "../mcp/MCPClient.js";
import { ToolRegistry } from "../tools/ToolRegistry.js";
import { MCPToolAdapter } from "../tools/MCPToolAdapter.js";


export class MCPToolLoader {


constructor(
    private client:MCPClient,
    private registry:ToolRegistry
){}



async load(){


    const response =
        await this.client.listTools();



    for(
      const tool of response.tools
    ){

        this.registry.registerTool(

            new MCPToolAdapter(
                this.client,
                tool
            )

        );

    }


}


}