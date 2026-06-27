import { askAI } from "../agent/AI.js";
import { executeTool } from "../tools/tools.js";


export class Agent {

    private readonly systemPrompt = `
You are an AI Automation Agent.

You help users understand repositories, execute automation tasks,
and use tools whenever required.

Always use the available tools instead of guessing.
`;


    public async handle(input: string): Promise<string> {


        const command = input.trim().toLowerCase();


        switch (command) {


            case "help":

                return `
Available Commands

help
clear
exit
`;



            default:

                return await this.runAgent(input);

        }

    }



    private async runAgent(
        input:string
    ):Promise<string>{


        let response:any =
            await askAI(
                this.systemPrompt,
                input
            );



        while(response.tool_calls){


            for(const toolCall of response.tool_calls){


                const toolName =
                    toolCall.function.name;



                const args =
                    JSON.parse(
                        toolCall.function.arguments
                    );



                console.log(
                    `🔧 Executing tool: ${toolName}`
                );



                const result =
                    await executeTool(
                        toolName,
                        args
                    );



                response =
    await askAI(
        this.systemPrompt,
        `The tool execution result is:

${result}

Explain this result to the user.`
    );

            }

        }


        return response.content || "";

    }

}