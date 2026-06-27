import fs from "fs/promises";


export const toolDefinitions = [

    {
        type: "function",

        function: {

            name: "listDirectory",

            description:
                "List files and folders in a directory",

            parameters: {

                type: "object",

                properties: {

                    path: {
                        type: "string",
                        description:
                            "Directory path"
                    }

                },

                required: []

            }

        }

    }

];



const toolFunctions = {


    async listDirectory(args: any) {

        const path =
            args.path || ".";


        const files =
            await fs.readdir(path);


        return {

            files

        };

    }


};



export async function executeTool(
    name: string,
    args: any
) {


    const tool =
        toolFunctions[
        name as keyof typeof toolFunctions
        ];


    if (!tool) {

        throw new Error(
            `Unknown tool ${name}`
        );

    }


    return await tool(args);

}