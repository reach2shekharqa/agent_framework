import fs from "fs";
import path from "path";
import os from "os";


export class ProjectMemory {


    private static memoryDir =
        path.join(
            os.homedir(),
            ".automation-agent",
            "memory"
        );



    private static projectFile =
        path.join(
            this.memoryDir,
            "project.json"
        );



    static save(
        data: any
    ) {


        if (!fs.existsSync(this.memoryDir)) {

            fs.mkdirSync(
                this.memoryDir,
                {
                    recursive: true
                }
            );

        }



        fs.writeFileSync(
            this.projectFile,
            JSON.stringify(
                data,
                null,
                2
            )
        );


    }



    static exists() {

        return fs.existsSync(
            this.projectFile
        );

    }



    static load() {


        if (!this.exists()) {

            return null;

        }


        return JSON.parse(
            fs.readFileSync(
                this.projectFile,
                "utf-8"
            )
        );


    }


}