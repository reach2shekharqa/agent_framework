import { tools } from "./index.js";
import { Tool } from "./ToolTypes.js";

export class ToolRegistry {


    private tools:Tool[] = [
        ...tools
    ];



    registerTool(tool:Tool){

        this.tools.push(tool);

    }



    public getToolDefinitions() {


        return this.tools.map(tool => ({

            type:"function",

            function:{
                name:tool.name,

                description:
                tool.description,

                parameters:
                tool.parameters
            }

        }));

    }




    public async executeTool(
        name:string,
        args:any
    ){


        const tool =
            this.tools.find(
                t=>t.name===name
            );


        if(!tool){

            throw new Error(
                `Tool ${name} not found`
            );

        }


        return await tool.execute(args);


    }

}

