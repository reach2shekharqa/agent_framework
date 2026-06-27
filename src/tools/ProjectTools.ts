import fs from "fs";
import path from "path";
import os from "os";

const MEMORY_DIR = path.join(
    os.homedir(),
    ".automation-agent",
    "memory"
);

const MEMORY_FILE = path.join(
    MEMORY_DIR,
    "project.json"
);


export class ProjectTools {

    static async analyzeProject(projectPath: string) {

        const absolutePath = path.resolve(projectPath);


        if (!fs.existsSync(absolutePath)) {
            throw new Error(
                `Project path not found: ${absolutePath}`
            );
        }


        const projectInfo = {
            path: absolutePath,
            analyzedAt: new Date().toISOString(),
            files: this.getFiles(absolutePath),
            package: this.readPackage(absolutePath)
        };


        this.saveMemory(projectInfo);


        return projectInfo;
    }



    private static getFiles(
        dir:string,
        files:string[]=[]
    ):string[] {

        for(const item of fs.readdirSync(dir)){

            if(
                item==="node_modules" ||
                item===".git"
            ){
                continue;
            }


            const fullPath = path.join(
                dir,
                item
            );


            if(fs.statSync(fullPath).isDirectory()){

                this.getFiles(
                    fullPath,
                    files
                );

            }else{

                files.push(
                    path.relative(
                        dir,
                        fullPath
                    )
                );
            }
        }


        return files;
    }



    private static readPackage(
        projectPath:string
    ){

        const pkg = path.join(
            projectPath,
            "package.json"
        );


        if(!fs.existsSync(pkg)){
            return null;
        }


        return JSON.parse(
            fs.readFileSync(
                pkg,
                "utf-8"
            )
        );
    }



    private static saveMemory(data:any){

        if(!fs.existsSync(MEMORY_DIR)){
            fs.mkdirSync(
                MEMORY_DIR,
                {
                    recursive:true
                }
            );
        }


        fs.writeFileSync(
            MEMORY_FILE,
            JSON.stringify(
                data,
                null,
                2
            )
        );
    }



    static loadProjectMemory(){

        if(!fs.existsSync(MEMORY_FILE)){
            return null;
        }


        return JSON.parse(
            fs.readFileSync(
                MEMORY_FILE,
                "utf-8"
            )
        );
    }

}



// IMPORTANT:
// Tool wrapper used by Agent executeTool()
export const analyzeProjectTool = {

    name:"analyzeProject",

    description:
        "Analyze an automation project and store project knowledge in memory",

    parameters:{
        type:"object",
        properties:{
            projectPath:{
                type:"string",
                description:
                "Absolute path of the project"
            }
        },
        required:[
            "projectPath"
        ]
    },


    execute: async(args:any)=>{

        return await ProjectTools.analyzeProject(
            args.projectPath
        );

    }

    
};

export const getProjectMemoryTool = {

    name: "getProjectMemory",

    description:
        "Returns previously analyzed project information from memory",

    parameters:{
        type:"object",
        properties:{}
    },


    execute: async()=>{

        const memory = ProjectTools.loadProjectMemory();

        if(!memory){
            return {
                message:"No project memory found"
            };
        }


        return memory;
    }
};