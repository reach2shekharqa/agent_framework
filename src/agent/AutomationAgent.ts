import { AI } from "../ai/AI.js";
import { ProjectTools } from "../tools/ProjectTools.js";
import { ToolRegistry } from "../tools/ToolRegistry.js";
import { MCPClient } from "../mcp/MCPClient.js";
import { MCPToolLoader } from "../tools/MCPToolLoader.js";

import { MCPManager } from "../mcp/MCPManager.js";


export class AutomationAgent {


    private ai = new AI();


    private toolRegistry = new ToolRegistry();


    private mcpInitialized = false;



async initialize() {


    if (this.mcpInitialized) {
        return;
    }



    const mcpManager =
        new MCPManager(
            this.toolRegistry
        );



    await mcpManager.initialize();



    this.mcpInitialized = true;

}





    async run(input: string) {


        const messages: any[] = [


            {
                role: "system",

                content: `
You are an AI automation engineer.

Rules:
- Always trust tool results over assumptions.
- Never claim a framework unless it appears in tool output.
- Summarize only information returned by tools.
- Keep answers concise.

Memory Rules:
- Use existing project knowledge when available.
- Do not call analyzeProject again if required information already exists.
- Do not repeat information already available in memory.
- Answer only what the user asked.
`
            }

        ];





        const memory =
            ProjectTools.loadProjectMemory();



        if (memory) {


            messages.push({

                role: "system",

                content: `

Existing Project Memory:

Project:
${memory.path}

Analyzed At:
${memory.analyzedAt}

Files:
${memory.files
                    .slice(0, 100)
                    .join("\n")}

Package:
${JSON.stringify(
                    memory.package,
                    null,
                    2
                )}

Use this information before using project analysis tools.

`

            });

        }





        messages.push({

            role: "user",

            content: input

        });





        while (true) {


            const response =

                await this.ai.chat(

                    messages,

                    this.toolRegistry.getToolDefinitions()

                );



            if (response.tool_calls) {


                messages.push(response);



                for (const call of response.tool_calls) {


                    const result =

                        await this.toolRegistry.executeTool(

                            call.function.name,

                            JSON.parse(
                                call.function.arguments
                            )

                        );



                    messages.push({

                        role: "tool",

                        tool_call_id:
                            call.id,

                        content:
                            JSON.stringify(result)

                    });


                }


                continue;

            }



            return response.content;


        }


    }


}