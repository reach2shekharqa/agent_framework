import { Tool } from "./types.js";
import { tools } from "./index.js";
import { CapabilityType } from "../capabilities/CapabilityType.js";

export class ToolRegistry {

    private tools: Map<string, Tool> = new Map();

    constructor() {

        this.registerNativeTools();

    }

    private registerNativeTools() {

        for (const tool of tools) {

            this.register(tool);

        }

    }

    register(
        tool: Tool
    ) {

        this.tools.set(
            tool.name,
            tool
        );

    }

    hasTool(
        name: string
    ) {

        return this.tools.has(name);

    }

    getToolsForCapability(
        capability: CapabilityType
    ): string[] {

        switch (capability) {

            case CapabilityType.PROJECT_ANALYSIS:
                return [
                    "analyzeProject",
                    "getProjectMemory"
                ];

            case CapabilityType.FILE_SYSTEM:
                return [
                    "listDirectory",
                    "readFile"
                ];

            case CapabilityType.CODE_SEARCH:
                return [
                    "searchCode"
                ];

            case CapabilityType.TERMINAL:
                return [
                    "runCommand"
                ];

            case CapabilityType.BROWSER:
                // Playwright MCP tools later
                return [];

            case CapabilityType.GITHUB:
                // GitHub MCP tools later
                return [];

            default:
                return [];

        }

    }

    getToolDefinitions(toolNames?: string[]) {

        const tools = toolNames
            ? toolNames
                .map(name => this.tools.get(name))
                .filter((tool): tool is Tool => tool !== undefined)
            : Array.from(this.tools.values());

        return tools.map(tool => ({

            type: "function",

            function: {

                name: tool.name,

                description: tool.description,

                parameters: tool.parameters

            }

        }));

    }

    async executeTool(
        name: string,
        args: any
    ) {

        console.log("\n==============================");
        console.log("Executing Tool:", name);
        console.log("Arguments:", JSON.stringify(args, null, 2));
        console.log("==============================\n");

        const tool =
            this.tools.get(name);

        if (!tool) {

            throw new Error(
                `Tool not found: ${name}`
            );

        }

        const result =
            await tool.execute(args);

        console.log("Tool Result:");
        console.log(JSON.stringify(result, null, 2));
        console.log();

        return result;

    }

    listTools() {

        return Array.from(
            this.tools.keys()
        );

    }

}