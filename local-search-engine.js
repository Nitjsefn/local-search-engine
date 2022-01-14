//wantDirectory -> true if the func has to return list of directories
//fullSearch -> if false it will search for dir only directly inside of pathToLibrary, or for files directly inside of this directories
const fs = require('fs');
const { log } = console;
function search(pathToLibrary, requestedFIle, wantDirectory = false, fullSearch = false)
{
    let listToOrder = new Array();
    if(!pathToLibrary.endsWith('/')) pathToLibrary += '/';
    if(!fullSearch)
    {
        let directories = fs.readdirSync(pathToLibrary);
        if(wantDirectory)
        {
            for(let i = 0; i < directories.length; i++)
            {
                let pathToDir = pathToLibrary + directories[i];
                if(fs.lstatSync(pathToDir).isDirectory()) listToOrder.push(directories[i]);
            }
        }
        else
        {
            for(let i = 0; i < directories.length; i++)
            {
                let pathToDir = pathToLibrary + directories[i];
                if(fs.lstatSync(pathToDir).isDirectory())
                {
                
                }
                else if(directories[i].isFile()) listToOrder.push(directories[i]);
            }   
        }
    }
    else
    {
        log("Not implemented");
    }
    return listToOrder;
}

//Code only for testing purposes
log(search(process.argv[2], '', true));