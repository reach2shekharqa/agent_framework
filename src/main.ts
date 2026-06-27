import inquirer from "inquirer";
import { Cli } from "./cli/Cli.js";
import { runSetupWizard } from "./cli/SetupWizard.js";
import { ConfigManager } from "./config/ConfigManager.js";


async function bootstrap(){


    if(ConfigManager.exists()){


        const answer = await inquirer.prompt([
            {
                type:"select",
                name:"action",
                message:"Configuration found. What do you want to do?",
                choices:[
                    {
                        name:"Continue with existing configuration",
                        value:"continue"
                    },
                    {
                        name:"Change AI configuration",
                        value:"change"
                    },
                    {
                        name:"Exit",
                        value:"exit"
                    }
                ]
            }
        ]);



        if(answer.action==="change"){

            await runSetupWizard();

        }


        if(answer.action==="exit"){

            process.exit(0);

        }


    }
    else{


        await runSetupWizard();

    }



    const cli = new Cli();

    cli.start();

}


bootstrap();