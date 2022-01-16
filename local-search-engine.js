//wantDirectory -> true if the func has to return list of directories
//fullSearch -> if false it will search for dir only directly inside of pathToLibrary, or for files directly inside of this directories
const fs = require('fs');
const { log } = console;
var listToOrder = new Array();
function search(pathToLibrary = '', requestedFIle = '', wantDirectory = false, suffix = '', fullSearch = false)
{
    if(!pathToLibrary.endsWith('/')) pathToLibrary += '/';
    if(!fullSearch)
    {
        let directories = fs.readdirSync(pathToLibrary);
        if(wantDirectory)
        {
            for(let i = 0; i < directories.length; i++)
            {
                let pathToDir = pathToLibrary + directories[i];
                if(fs.lstatSync(pathToDir).isDirectory()) listToOrder.push(pathToDir);
            }
        }
        else //wantDirectory == false
        {
            for(let i = 0; i < directories.length; i++)
            {
                let pathToDir = pathToLibrary + directories[i];
                if(fs.lstatSync(pathToDir).isFile()) listToOrder.push(pathToDir);
            }   
        }
    }
    else //Fullsearch
    {
        if(wantDirectory)
        {
            searchForDir_recursion(pathToLibrary);
        }
        else //wantDirectory == false
        {
            searchForFiles_recursion(pathToLibrary);
        }
    }
    return listToOrder;
}

//Code only for testing purposes
log(search(process.argv[2], '', false, '', true));

//Functions
function searchForDir_recursion(dir)
{
    let directories = fs.readdirSync(dir);
    for(let i = 0; i < directories.length; i++)
    {
        let pathToDir = dir + directories[i];
        if(fs.lstatSync(pathToDir).isDirectory())
        {
            listToOrder.push(pathToDir);
            if(!pathToDir.endsWith('/')) pathToDir += '/';
            searchForDir_recursion(pathToDir);
        }
    }
    return;
}

function searchForFiles_recursion(dir)
{
    let directories = fs.readdirSync(dir);
    for(let i = 0; i < directories.length; i++)
    {
        let pathToDir = dir + directories[i];
        if(fs.lstatSync(pathToDir).isFile())
        {
            listToOrder.push(pathToDir);
        }
        else if(fs.lstatSync(pathToDir).isDirectory())
        {
            if(!pathToDir.endsWith('/')) pathToDir += '/';
            searchForFiles_recursion(pathToDir);
        }
    }
    return;
}