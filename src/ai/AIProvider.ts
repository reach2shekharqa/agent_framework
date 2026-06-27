export interface AIProvider {

    chat(messages: any[]): Promise<any>;

}