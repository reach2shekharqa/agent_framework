import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const tools = [
  {
    type: "function",
    function: {
      name: "list_directory",
      description: "List all files and folders in a directory.",
      parameters: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Directory path"
          }
        },
        required: ["path"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "read_file",
      description: "Read the contents of a file.",
      parameters: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "File path"
          }
        },
        required: ["path"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "run_command",
      description: "Execute a terminal command.",
      parameters: {
        type: "object",
        properties: {
          command: {
            type: "string",
            description: "Command to execute"
          }
        },
        required: ["command"]
      }
    }
  }
];
export async function executeTool(
    name: string,
    args: any
) {

    switch(name) {


        case "list_directory":
            return await listDirectory(args.path);



        case "read_file":
            return await readFile(args.path);



        case "run_command":
            return await runCommand(args.command);



        default:
            throw new Error(
                `Unknown tool: ${name}`
            );
    }
}



async function listDirectory(path:string) {

    const files = fs.readdirSync(path);

    return JSON.stringify(files);

}



async function readFile(path:string) {

    const content = fs.readFileSync(
        path,
        "utf-8"
    );

    return content;

}



async function runCommand(command:string) {

    const {stdout, stderr} =
        await execAsync(command);


    if(stderr){
        return stderr;
    }


    return stdout;

}