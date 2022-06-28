import process from 'process';
import HuntSystem from './src/hunt_system.js';
import {checkArgv, checkExtension} from './src/utils.js';

const outputFile = "outputFile.txt"

function showResult(system, bshouldDraw){
    
    system.simulate();
    
    if(!bshouldDraw)
        system.outputMap(outputFile)
    else
        system.drawMap(outputFile);
}

var file = { name : ""};
var output = { bshouldDraw : false};
const argv = process.argv.slice(2);

if(!checkArgv(argv, file, output) || !checkExtension(file.name))
    process.exit(1);

const system = new HuntSystem();

system.parse(file.name).then( bStatus => {
    
    if(!bStatus)
        console.info("File has not the correct format");
    else
        showResult(system, output.bshouldDraw)
})

export {checkExtension, checkArgv}