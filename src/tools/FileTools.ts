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

            path: {
                type: "string"
            }

        }

    },



    async execute(args) {

        try {

            const files =
                await fs.readdir(
                    args.path || "."
                );


            return {
                path: args.path || ".",
                files
            };


        }
        catch (error) {

            return {

                error:
                    `Directory not found: ${args.path}`

            };

        }

    }

};





export const readFileTool: Tool = {


    name: "readFile",


    description:
        "Read contents of a file",


    parameters: {

        type: "object",

        properties: {

            path: {
                type: "string",
                description: "Path of the file to read"
            }

        },

        required: [
            "path"
        ]

    },



    async execute(args) {


        try {


            const content =
                await fs.readFile(
                    args.path,
                    "utf-8"
                );


            return {

                file: args.path,

                content

            };


        }
        catch (error) {


            return {

                error:
                    `File not found or cannot read: ${args.path}`

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