/*const fs = require('fs');
const readline = require('readline');
const HuntSystem = require('../src/hunt_system');
const fileName = "tests/outputFile.txt"
const drawFile = "tests/drawFile.txt"
*/
import fs from 'fs';
import readline from 'readline';
import HuntSystem from '../src/hunt_system';
const fileName = "tests/outputFile.txt"
const drawFile = "tests/drawFile.txt"


async function checkOutputFile() {

    const fileStream = fs.createReadStream(fileName);
    var i = 0;
    var array = new Array();
    while (i < 10) {
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
    
        var array = new Array();
        for await (const line of rl) {
            array.push(line);
        }
        if (array.length != 0)
            return array;
        i++;
    }
    return array;
    }
    async function checkDrawFile() {
    
    const fileStream = fs.createReadStream(drawFile);
    var i = 0;
    var array = new Array();
    while (i < 10) {
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
    
        var array = new Array();
        for await (const line of rl) {
            array.push(line);
        }
        if (array.length != 0)
            return array;
        i++;
    }
    return array;
    }
    

describe('Parsing', () => {

    it('Should parse only_map', async () => {
        const obj = new HuntSystem();
        var bStatus = await obj.parse("tests/files/only_map.txt");
        
        expect(bStatus).toBe(true);
    });
    
    it('Should parse simple_map', async () => {
        const obj = new HuntSystem();
        var bStatus = await obj.parse("tests/files/simple_map.txt");

        expect(bStatus).toBe(true);
    });
    
    it('Should parse big_map', async () => {
        const obj = new HuntSystem();
        var bStatus = await obj.parse("tests/files/big_map.txt");
        
        expect(bStatus).toBe(true);
    });
    
    it('Should not parse bad_file', async () => {
        const obj = new HuntSystem();
        var bStatus = await obj.parse("tests/files/bad_file.txt");
        
        expect(bStatus).toBe(false);
    });
    
    it('Should not parse bad_file2', async () => {
        const obj = new HuntSystem();
        var bStatus = await obj.parse("tests/files/bad_file2.txt");
        
        expect(bStatus).toBe(false);
    });
    
    
    it('Should not parse no_map', async () => {
        const obj = new HuntSystem();
        var bStatus = await obj.parse("tests/files/no_map.txt");
        
        expect(bStatus).toBe(false);
    });

});
describe('Output', () => {

    afterAll(() =>{
        fs.unlinkSync(fileName);
        fs.unlinkSync(drawFile);
    });

    it('Should write itself correctly in a variable', async () => {
        const obj = new HuntSystem();
        var bStatus = await obj.parse("tests/files/simple_map.txt");
    
        expect(bStatus).toBe(true);
        
        var str = obj.write();
        
        expect(str).toMatch("C - 5 - 5")
    })

    it("Should write correctly the resultat of the simulation in the simple_map file", async () => {
        const obj = new HuntSystem();
        const exempleArray =[
            "C - 5 - 5", "M - 3 - 3",
            "M - 2 - 2",
            "T - 1 - 1 - 0",
            "A - Lara - 0 - 1 - O - 2"
        ];
        var bStatus = await obj.parse("tests/files/simple_map.txt");

        expect(bStatus).toBe(true);
        obj.simulate();
        obj.outputMap(fileName);
    
        

        var outputArray = await checkOutputFile();

        for (var i = 0; i < outputArray.length; i++) {
            expect(outputArray[i]).toMatch(exempleArray[i]);
        }
        expect(outputArray.length).toBe(exempleArray.length);
    }, 10000)

    it("Should draw correctly the map in a file", async () => {
        const obj = new HuntSystem();
        var  exempleArray = [
            ".        .        .        .        .",
            "A(Lara)  T(0)     .        .        .",
            ".        .        M        .        .",
            ".        .        .        M        .",
            ".        .        .        .        ."
        ];
        var bStatus = await obj.parse("tests/files/simple_map.txt");
      
        expect(bStatus).toBe(true);
        obj.simulate();
        obj.drawMap(drawFile);
    
       
        var outputArray = await checkDrawFile();
    
        for (var i = 0; i < outputArray.length; i++) {
            expect(outputArray[i]).toMatch(exempleArray[i]);
        }
        expect(outputArray.length).toBe(exempleArray.length);
    
    }, 10000)
    
});
