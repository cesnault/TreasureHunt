import {checkExtension, checkArgv} from '../src/utils';

describe('Argv tests', () => {
    it('checkArgv([]) == false',() => {
        var file = { name : ""};
        var output= { bShouldDraw : false};
        expect(checkArgv([], file, output)).toBe(false);
    });

    it('checkArgv(["-d"]) == true',() => {
        var file = { name : ""};
        var output= { bShouldDraw : false};
        expect(checkArgv(["-d"], file, output)).toBe(true); // true because considered as a filename and not an option 
    });
    it('checkArgv([""]) == false',() => {
        var file = { name : ""};
        var output= { bShouldDraw : false};
        expect(checkArgv([""], file, output)).toBe(false);
    });
    it('checkArgv(["fe",""]) == false',() => {
        var file = { name : ""};
        var output= { bShouldDraw : false};
        expect(checkArgv(["fe",""], file, output)).toBe(false);
    });

    it('checkArgv(["tetete"]) == true',() => {
        var file = { name : ""};
        var output= { bShouldDraw : false};
        expect(checkArgv(["tetete"], file, output)).toBe(true);
    });

    it('checkArgv(["-d", "tete"]) == true',() => {
        var file = { name : ""};
        var output= { bShouldDraw : false};
        expect(checkArgv(["-d", "tete"], file, output)).toBe(true);
    });

    it('checkArgv(["--draw", "erere"]) == true',() => {
        var file = { name : ""};
        var output= { bShouldDraw : false};
        expect(checkArgv(["--draw", "erere"], file, output)).toBe(true);
    });

    it('checkArgv(["--draw","erere","rerer","rererer"]) == true',() => {
        var file = { name : ""};
        var output= { bShouldDraw : false};
        expect(checkArgv(["--draw","erere","rerer","rererer"], file, output)).toBe(true);
    });
});

describe('Extensions tests', () =>{

    it('checkExtension("") == false',() => {
            expect(checkExtension("")).toBe(false);
    });

    it('checkExtension(".txt") == false',() => {
        expect(checkExtension(".txt")).toBe(false);
    });

    it('checkExtension("file.tst") == false',() => {
        expect(checkExtension("file.tst")).toBe(false);
    });

    it('checkExtension("file.txt.") == false',() => {
        expect(checkExtension("file.txt.")).toBe(false);
    });

    it('checkExtension("file.txt.ts") == false',() => {
        expect(checkExtension("file.txt.ts")).toBe(false);
    });

    it('checkExtension("file.txt") == true',() => {
        expect(checkExtension("file.txt")).toBe(true);
    });

});