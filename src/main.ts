import inquirer from "inquirer";

import { Cli } from "./cli/Cli.js";
import { ConfigManager } from "./config/ConfigManager.js";
import { runSetupWizard } from "./cli/SetupWizard.js";
import { AutomationAgent } from "./agent/AutomationAgent.js";
import { EnvironmentChecker } from "./system/EnvironmentChecker.js";



async function bootstrap() {


    // 1. Check system requirements first
    const environmentChecker =
        new EnvironmentChecker();


    await environmentChecker.check();




    // 2. Check configuration
    if (ConfigManager.exists()) {


        const { action } =
            await inquirer.prompt([

                {
                    type: "select",

                    name: "action",

                    message:
                        "Configuration found. What do you want to do?",

                    choices: [

                        {
                            name:
                                "Continue with existing configuration",

                            value: "continue"
                        },

                        {
                            name:
                                "Change AI configuration",

                            value: "change"
                        },

                        {
                            name:
                                "Exit",

                            value: "exit"
                        }

                    ]

                }

            ]);



        if (action === "change") {

            await runSetupWizard();

        }



        if (action === "exit") {

            process.exit(0);

        }


    }
    else {


        await runSetupWizard();


    }





    // 3. Create agent once
    const agent =
        new AutomationAgent();




    // 4. Initialize MCP once
    await agent.initialize();





    // 5. Start CLI
    const cli =
        new Cli(agent);


    cli.start();

}





bootstrap()
    .catch((error) => {


        console.error(
            "❌ Automation Agent failed:",
            error.message
        );


        process.exit(1);

    });