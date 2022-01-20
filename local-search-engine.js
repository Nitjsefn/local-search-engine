//wantDirectory -> true if the func has to return list of directories
//fullSearch -> if false it will search for dir only directly inside of pathToLibrary, or for files directly inside of this directories
const fs = require('fs');
const { log } = console;
var listToOrder = new Array();
var firstMovableIndex = 0;
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
    //Sorting algorithm below
    let orderedList = listToOrder;
    for(let i = 0; i<listToOrder.length; i++)
    {
        let d = listToOrder[i].length -1;
        while(listToOrder[i][d] !== '/') d--;
        d++;
        listToOrder[i] = listToOrder[i].slice(d).toLowerCase();
    }
    requestedFIle = requestedFIle.toLowerCase();
    //Checking if there is file with name the same as reqested
    for(let i = 0; i < listToOrder.length; i++)
    {
        if(listToOrder[i].indexOf(requestedFIle) > 0)
        {
            let tmp = listToOrder[i];
            listToOrder.splice(i, 1);
            listToOrder.unshift(tmp);
            tmp = orderedList[i];
            orderedList.splice(i, 1);
            orderedList.unshift(tmp);
            break;
        }
    }
    splittedReq = requestedFIle.split(' ');
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