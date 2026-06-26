export class Agent {

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
                return `You said: ${input}`;
        }

    }

}