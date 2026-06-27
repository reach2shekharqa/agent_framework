import { Tool } from "./ToolTypes.js";
import { MCPClient } from "../mcp/MCPClient.js";


export class MCPToolAdapter implements Tool {


    name:string;

    description:string;

    parameters:any;


    constructor(
        private client:MCPClient,
        private definition:any
    ){

        this.name =
            definition.name;


        this.description =
            definition.description || "";


        this.parameters =
            definition.inputSchema;

    }



    async execute(args:any){

        return await this.client.callTool(

            this.name,

            args

        );

    }


}