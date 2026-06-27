// import fs from "fs/promises";
// import path from "path";


// export const toolDefinitions = [

//     {
//         type: "function",

//         function: {

//             name: "listDirectory",

//             description:
//                 "List files and folders in a directory",

//             parameters: {

//                 type: "object",

//                 properties: {

//                     path: {
//                         type: "string"
//                     }

//                 }

//             }

//         }

//     },


//     {
//         type: "function",

//         function: {

//             name: "readFile",

//             description:
//                 "Read the contents of a file",

//             parameters: {

//                 type: "object",

//                 properties: {

//                     path: {
//                         type: "string",
//                         description:
//                             "File path to read"
//                     }

//                 },

//                 required: [
//                     "path"
//                 ]

//             }

//         }

//     },


//     {
//         type: "function",

//         function: {

//             name: "searchCode",

//             description:
//                 "Search text inside project files",

//             parameters: {

//                 type: "object",

//                 properties: {

//                     query: {
//                         type: "string",
//                         description:
//                             "Text to search"
//                     },

//                     directory: {
//                         type: "string",
//                         description:
//                             "Directory to search"
//                     }

//                 },

//                 required: [
//                     "query"
//                 ]

//             }

//         }

//     }

// ];



// export async function executeTool(
//     name: string,
//     args: any
// ) {


//     switch (name) {


//         case "listDirectory":

//             return await listDirectory(args);


//         case "readFile":

//             return await readFile(args);


//         case "searchCode":

//             return await searchCode(args);


//         default:

//             throw new Error(
//                 `Unknown tool ${name}`
//             );

//     }

// }





// async function listDirectory(
//     args: any
// ) {


//     const dir =
//         args.path || ".";


//     const files =
//         await fs.readdir(dir);


//     return {
//         files
//     };

// }





// async function readFile(
//     args: any
// ) {


//     const content =
//         await fs.readFile(
//             args.path,
//             "utf-8"
//         );


//     return {

//         file: args.path,

//         content

//     };

// }





// async function searchCode(
//     args: any
// ) {


//     const results: string[] = [];


//     const root =
//         args.directory || ".";



//     async function scan(dir: string) {


//         const entries =
//             await fs.readdir(
//                 dir,
//                 {
//                     withFileTypes: true
//                 }
//             );


//         for (const entry of entries) {


//             const fullPath =
//                 path.join(
//                     dir,
//                     entry.name
//                 );


//             if (entry.isDirectory()) {

//                 if (
//                     entry.name !== "node_modules" &&
//                     entry.name !== ".git"
//                 ) {

//                     await scan(fullPath);

//                 }

//             }
//             else {


//                 try {


//                     const content =
//                         await fs.readFile(
//                             fullPath,
//                             "utf-8"
//                         );


//                     if (
//                         content.includes(
//                             args.query
//                         )
//                     ) {

//                         results.push(
//                             fullPath
//                         );

//                     }


//                 }
//                 catch {

//                     // ignore binary files

//                 }


//             }


//         }


//     }



//     await scan(root);



//     return {

//         query: args.query,

//         matches: results

//     };


// }