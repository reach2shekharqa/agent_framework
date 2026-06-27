export interface AIProvider {


    chat(
        messages:any[],
        tools?:any[]
    ):Promise<any>;


}