import readline from "node:readline";
import { createRequire } from "node:module";

import { AutomationAgent } from "../agent/AutomationAgent.js";
import { CommandHandler } from "./CommandHandler.js";


const require = createRequire(import.meta.url);
const packageJson = require("../../package.json");



export class Cli {

    private readonly agent: AutomationAgent;
    private readonly rl: readline.Interface;



    constructor(agent: AutomationAgent) {

        // Reuse initialized agent
        this.agent = agent;


        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

    }



    public start(): void {

        this.showBanner();

        this.prompt();

    }



    private showBanner(): void {


        console.log(`
╔══════════════════════════════╗
║      🤖 Automation Agent      ║
║      AI Automation Assistant  ║
║      v${packageJson.version}              ║
╚══════════════════════════════╝
`);


        console.log("Type 'help' to see available commands.");
        console.log("Type 'exit' to quit.\n");

    }



    private prompt(): void {


        this.rl.question("> ", async (input: string) => {



            if (!input.trim()) {

                this.prompt();

                return;
            }




            const commandHandled =
                CommandHandler.handle(
                    input,
                    () => {

                        console.log("Goodbye 👋");

                        this.rl.close();

                        process.exit(0);

                    }
                );



            if (commandHandled) {


                if (
                    input.trim().toLowerCase() !== "exit"
                ) {

                    this.prompt();

                }


                return;

            }





            try {


                console.log("\n🤖 Thinking...\n");



                const response =
                    await this.agent.run(
                        input.trim()
                    );



                console.log(response);



            } catch (error: any) {


                console.log(
                    "❌ Error:",
                    error.message
                );


            }



            this.prompt();


        });


    }


}