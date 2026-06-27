import inquirer from "inquirer";

import { ConfigManager } from "../config/ConfigManager.js";
import { UserConfig } from "../config/UserConfig.js";


export async function runSetupWizard() {

    console.log(`
╔══════════════════════════════╗
║     Automation Agent       ║
║     AI Automation Assistant   ║
║     Setup Wizard              ║
╚══════════════════════════════╝
`);


    const { provider } = await inquirer.prompt([
        {
            type: "select",
            name: "provider",
            message: "Select AI Provider:",
            choices: [
                {
                    name: "Ollama (Local)",
                    value: "ollama"
                },
                {
                    name: "Groq (Cloud)",
                    value: "groq"
                },
                {
                    name: "NVIDIA (Cloud)",
                    value: "nvidia"
                }
            ]
        }
    ]);


    let config: UserConfig;


    switch (provider) {


        case "ollama": {

            const answers = await inquirer.prompt([
                {
                    type: "input",
                    name: "baseUrl",
                    message: "Ollama URL:",
                    default:
                        "http://localhost:11434/v1/chat/completions"
                },
                {
                    type: "input",
                    name: "model",
                    message: "Ollama Model:",
                    default:
                        "qwen2.5:14b"
                }
            ]);


            config = {

                provider: "ollama",

                baseUrl: answers.baseUrl,

                model: answers.model

            };

            break;
        }



        case "groq": {

            const answers = await inquirer.prompt([
                {
                    type: "input",
                    name: "baseUrl",
                    message: "Groq API URL:",
                    default:
                        "https://api.groq.com/openai/v1/chat/completions"
                },
                {
                    type: "password",
                    name: "apiKey",
                    message: "Groq API Key:"
                },
                {
                    type: "input",
                    name: "model",
                    message: "Groq Model:",
                    default:
                        "llama-3.3-70b-versatile"
                }
            ]);


            config = {

                provider: "groq",

                baseUrl: answers.baseUrl,

                model: answers.model,

                apiKey: answers.apiKey

            };

            break;
        }



        case "nvidia": {

            const answers = await inquirer.prompt([
                {
                    type: "password",
                    name: "apiKey",
                    message: "NVIDIA API Key:"
                },
                {
                    type: "input",
                    name: "model",
                    message: "NVIDIA Model:",
                    default: "qwen/qwen3.5-122b-a10b"
                }
            ]);

            config = {
                provider: "nvidia",
                baseUrl: "https://integrate.api.nvidia.com/v1",
                model: answers.model,
                apiKey: answers.apiKey
            };

            break;
        }


        default:
            throw new Error("Invalid provider selected");
    }


    ConfigManager.save(config);


    console.log("\n✅ Configuration saved successfully\n");

}