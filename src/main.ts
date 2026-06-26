import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🤖 Automation Agent v0.1");
console.log("Type 'help' to see available commands.");
console.log("Type 'exit' to quit.\n");

function prompt() {
  rl.question("> ", (input) => {
    const command = input.trim().toLowerCase();

    switch (command) {
      case "help":
        console.log(`
Available Commands

help   - Show available commands
clear  - Clear the terminal
exit   - Exit the application
`);
        break;

      case "clear":
        console.clear();
        console.log("🤖 Automation Agent v0.1\n");
        break;

      case "exit":
        console.log("Goodbye 👋");
        rl.close();
        return;

      default:
        console.log("🚧 Feature coming soon...");
    }

    prompt();
  });
}

prompt();