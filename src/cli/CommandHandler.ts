export class CommandHandler {


    static handle(
        input: string,
        onExit: () => void
    ): boolean {


        const command =
            input.trim().toLowerCase();



        switch(command){


            case "help":

                console.log(`
Available Commands:

help
    Show available commands

clear
    Clear terminal

exit
    Exit Automation Agent

For AI assistance, type your question directly.
`);

                return true;



            case "clear":

                console.clear();

                return true;



            case "exit":

                onExit();

                return true;



            default:

                return false;

        }

    }

}