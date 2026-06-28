import fs from "fs/promises";
import path from "path";
import { Tool } from "./ToolTypes.js";


export const listDirectoryTool: Tool = {

    name: "listDirectory",

    description:
        "List files and folders in a directory",

    parameters: {

        type: "object",

        properties: {

            directoryPath: {

                type: "string",

                description: "Directory path to list"

            }

        }

    },

    async execute(args) {

        const directoryPath =
            args.directoryPath ?? args.path ?? ".";

        try {

            const files =
                await fs.readdir(directoryPath);

            return {

                success: true,

                directoryPath,

                files

            };

        }
        catch {

            return {

                success: false,

                error: `Directory not found: ${directoryPath}`

            };

        }

    }

};



export const readFileTool: Tool = {

    name: "readFile",

    description:
        "Read the contents of a file",

    parameters: {

        type: "object",

        properties: {

            filePath: {

                type: "string",

                description: "Absolute or relative path of the file"

            }

        },

        required: [

            "filePath"

        ]

    },

    async execute(args) {

        const filePath =
            args.filePath ?? args.path;

        if (!filePath) {

            return {

                success: false,

                error: "Missing required parameter: filePath"

            };

        }

        try {

            const content =
                await fs.readFile(
                    filePath,
                    "utf-8"
                );

            return {

                success: true,

                filePath,

                content

            };

        }
        catch {

            return {

                success: false,

                error: `File not found or cannot read: ${filePath}`

            };

        }

    }

};



export const searchCodeTool: Tool = {


    name: "searchCode",


    description:
        "Search text inside project files",


    parameters: {

        type: "object",

        properties: {

            query: {
                type: "string"
            },

            directory: {
                type: "string"
            }

        },

        required: [
            "query"
        ]

    },



    async execute(args) {


        const results: string[] = [];


        async function scan(dir: string) {


            const entries =
                await fs.readdir(
                    dir,
                    {
                        withFileTypes: true
                    }
                );



            for (const entry of entries) {


                const full =
                    path.join(
                        dir,
                        entry.name
                    );



                if (entry.isDirectory()) {


                    if (
                        entry.name !== "node_modules" &&
                        entry.name !== ".git"
                    ) {

                        await scan(full);

                    }


                }
                else {


                    try {


                        const content =
                            await fs.readFile(
                                full,
                                "utf-8"
                            );



                        if (
                            content.includes(args.query)
                        ) {

                            results.push(full);

                        }


                    }
                    catch { }

                }


            }


        }



        await scan(
            args.directory || "."
        );



        return {

            query: args.query,

            matches: results

        };


    }

};