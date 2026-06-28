import { Tool } from "./types.js";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);


const ALLOWED_COMMANDS = [
    /^npm run /,
    /^npx playwright /,
    /^git /
];


const BLOCKED_COMMANDS = [
    /^del /,
    /^rm /,
    /^format /,
    /^shutdown /
];


export const runCommand: Tool = {

    name: "runCommand",

    description:
        "Execute approved terminal commands in a project directory",

    parameters: {

        type: "object",

        properties: {

            command: {
                type: "string"
            },

            cwd: {
                type: "string"
            }

        },

        required:[
            "command",
            "cwd"
        ]

    },


    async execute(args:any){

        const command =
            args.command.trim();


        // Block dangerous commands first
        const blocked =
            BLOCKED_COMMANDS.some(
                pattern => pattern.test(command)
            );


        if(blocked){

            return {
                error:
                "Command blocked by security policy"
            };

        }


        // Allow only approved commands
        const allowed =
            ALLOWED_COMMANDS.some(
                pattern => pattern.test(command)
            );


        if(!allowed){

            return {
                error:
                "Command not allowed. Allowed commands: npm run, npx playwright, git"
            };

        }


        const result =
            await execAsync(
                command,
                {
                    cwd: args.cwd,
                    timeout:120000
                }
            );


        return {

            stdout:
                result.stdout,

            stderr:
                result.stderr

        };

    }

};