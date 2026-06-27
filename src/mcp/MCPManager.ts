import { MCPClient } from "./MCPClient.js";

export class MCPManager {

    private readonly client = new MCPClient();

    public getClient(): MCPClient {

        return this.client;

    }

}