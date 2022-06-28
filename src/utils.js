
function checkOption(option){
    if(option !== "-d" && option !=="--draw"){
        console.info("Error : Incorrect option, did you mean -d or --draw ?")
        return false;
    }
    return true;
}

function checkFile(fileName,file){
    if(fileName === ""){
        console.info("Error : file name cannot be empty")
        return false;
    }
    file.name = fileName.toString();
    return true
}

export function checkArgv(argv, file, output){
    if(argv.length < 1){
        console.info("Error : This script need at least 1 argument (map) to be able to run")
        return false;
    }

    if(argv.length == 1){
        if(!checkFile(argv[0], file))
            return false;
        return true;
    }

    if(!checkOption(argv[0]))
        return false;

    if(!checkFile(argv[1], file))
        return false;
    
        output.bshouldDraw = true;
    return true;
}

export function checkExtension(fileName){
    var arr = fileName.split(".");
    
    if(arr == null || arr[0] === "")
        return false;
    
    if(arr[arr.length-1] !== "txt"){
        console.info("Error : Need to be a txt file")
        return false;
    }
    
    return true;
}