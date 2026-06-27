import { exec } from "node:child_process";
import { promisify } from "node:util";


const execAsync = promisify(exec);



export class EnvironmentChecker {


    async check(): Promise<void> {


        console.log("\n🔍 Checking system environment...\n");



        await this.checkCommand(
            "node",
            "Node.js"
        );


        await this.checkCommand(
            "npm",
            "npm"
        );


        await this.checkCommand(
            "npx",
            "npx"
        );



        console.log(
            "\n✅ Environment check completed\n"
        );

    }





    private async checkCommand(
        command: string,
        name: string
    ): Promise<void> {


        try {


            const { stdout } =
                await execAsync(
                    `${command} --version`
                );



            console.log(
                `✔ ${name}: ${stdout.trim()}`
            );


        }
        catch(error) {


            console.error(
                `❌ ${name} is not installed`
            );


            console.error(
                `Please install ${name} and restart Automation Agent`
            );


            process.exit(1);

        }

    }


}