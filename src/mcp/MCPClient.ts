import { MCPTool } from "./MCPTypes.js";

export class MCPClient {

    public async connect(): Promise<void> {

        console.log("MCP Client Connected");

    }

    public async disconnect(): Promise<void> {

        console.log("MCP Client Disconnected");

    }

    public async listTools(): Promise<MCPTool[]> {

        return [];

    }

}