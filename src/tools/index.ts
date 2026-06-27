import {
    listDirectoryTool,
    readFileTool,
    searchCodeTool
} from "./FileTools.js";


export const tools = [

    listDirectoryTool,

    readFileTool,

    searchCodeTool

];



export const toolDefinitions =
    tools.map(tool => ({

        type: "function",

        function: {

            name: tool.name,

            description: tool.description,

            parameters: tool.parameters

        }

    }));




export async function executeTool(
    name: string,
    args: any
) {


    const tool =
        tools.find(
            t => t.name === name
        );



    if (!tool) {

        throw new Error(
            `Tool ${name} not found`
        );

    }


    return await tool.execute(args);


}