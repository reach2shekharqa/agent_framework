import fs from "fs";
import os from "os";
import path from "path";

export interface MCPServerConfig {
    command: string;
    args: string[];
}

export interface MCPConfiguration {
    servers: Record<string, MCPServerConfig>;
}

export class MCPConfig {

    private static readonly CONFIG_PATH = path.join(
        os.homedir(),
        ".automation-agent",
        "mcp.json"
    );

    public static load(): MCPConfiguration {

        if (!fs.existsSync(this.CONFIG_PATH)) {
            return {
                servers: {}
            };
        }

        try {

            const content = fs.readFileSync(
                this.CONFIG_PATH,
                "utf-8"
            );

            return JSON.parse(content) as MCPConfiguration;

        } catch (error) {

            throw new Error(
                `Failed to load MCP configuration: ${
                    error instanceof Error ? error.message : error
                }`
            );

        }

    }

}