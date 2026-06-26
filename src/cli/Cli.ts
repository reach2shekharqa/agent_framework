import readline from "node:readline";
import { Agent } from "../agent/Agent.js";

export class Cli {

    private readonly agent: Agent;
    private readonly rl: readline.Interface;

    constructor() {
        this.agent = new Agent();

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
        console.log("🤖 Automation Agent v0.1");
        console.log("Type 'help' to see available commands.");
        console.log("Type 'exit' to quit.\n");
    }

    private prompt(): void {

        this.rl.question("> ", async (input: string) => {

            if (input.trim().toLowerCase() === "exit") {
                console.log("Goodbye 👋");
                this.rl.close();
                return;
            }

            const response = await this.agent.handle(input);

            console.log(response);

            this.prompt();
        });

    }

}