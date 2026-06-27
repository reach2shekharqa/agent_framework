import { tools } from "./index.js";

export class ToolRegistry {

    public getToolDefinitions() {

        return tools.map(tool => ({
            type: "function",
            function: {
                name: tool.name,
                description: tool.description,
                parameters: tool.parameters
            }
        }));

    }

    public async executeTool(
        name: string,
        args: any
    ) {

        const tool =
            tools.find(t => t.name === name);

        if (!tool) {
            throw new Error(`Tool ${name} not found`);
        }

        return await tool.execute(args);

    }

}