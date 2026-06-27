import { AI } from "../ai/AI.js";
import {
    executeTool,
    toolDefinitions
} from "../tools/index.js";


export class AutomationAgent {


    private ai =
        new AI();



    async run(input: string) {


        const messages: any[] = [

            {
                role: "system",
                content:
                    `
You are an AI automation engineer.

Rules:
- Use tools only when required.
- Do not recursively explore folders unless the user asks.
- For "list files" only inspect the requested directory.
- Keep tool calls minimal.
`
            },

            {
                role: "user",
                content: input
            }

        ];



        while (true) {


            const response =
                await this.ai.chat(messages, toolDefinitions);


            // console.log(
            //     "AI RESPONSE:",
            //     JSON.stringify(response, null, 2)
            // );



            if (response.tool_calls) {



                messages.push(response);



                for (const call of response.tool_calls) {


                    const result =
                        await executeTool(
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