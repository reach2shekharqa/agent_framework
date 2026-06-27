import { Tool } from "./types.js";
import { tools } from "./index.js";


export class ToolRegistry {


    private tools: Map<string, Tool> = new Map();



    constructor() {

        this.registerNativeTools();

    }




    private registerNativeTools() {


        for (const tool of tools) {


            this.register(tool);


        }

    }





    register(
        tool: Tool
    ) {


        this.tools.set(
            tool.name,
            tool
        );


    }





    getToolDefinitions() {


        return Array.from(
            this.tools.values()
        )
        .map(tool => ({


            type: "function",


            function: {


                name: tool.name,


                description:
                    tool.description,


                parameters:
                    tool.parameters


            }


        }));


    }





    async executeTool(
        name:string,
        args:any
    ) {


        const tool =
            this.tools.get(name);



        if(!tool){

            throw new Error(
                `Tool not found: ${name}`
            );

        }



        return await tool.execute(
            args
        );


    }





    listTools(){

        return Array.from(
            this.tools.keys()
        );

    }


}