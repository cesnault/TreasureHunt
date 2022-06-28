
//const Adventurer = require('../src/adventurer');
//const Mountain = require('../src/mountain');
import Adventurer from '../src/adventurer';
import Mountain from '../src/mountain';
import Treasure from '../src/treasure';


function createArrayTest(x, y) {
var arr = new Array(x);

for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(y);

    for (var j = 0; j < arr[i].length; j++) {
        arr[i][j] = new Array(2)
        arr[i][j][0] = ".";
        arr[i][j][1] = null;
    }
}
return arr;
}

describe('Placement', () => {

    it('Should be place on map', () => {
        var adv = new Adventurer("Lara", 3, 2, "N", "AAAA");
        var map = createArrayTest(5, 5);

        var res = adv.placeOnMap(map, 1, false);
        
        expect(res[0]).toBe(true);
    });

    it('Should be place on map - A vs T', () => {
        var adv = new Adventurer("Lara", 3, 2, "N", "AAAA");
        var treasure = new Treasure(3, 2);
        var map = createArrayTest(5, 5);

        treasure.placeOnMap(map,0, true);
        var res = adv.placeOnMap(map, 1, false);
        
        expect(res[0]).toBe(true);
    });

    it('Should not be place on map - A vs A', () => {
        var adv = new Adventurer("Lara", 3, 2, "N", "AAAA");
        var adv2 = new Adventurer("Croft", 3, 2, "N", "AAAA");
        var map = createArrayTest(5, 5);

        adv.placeOnMap(map, 1, false);
        var res = adv2.placeOnMap(map, 1, false);
        
        expect(res[0]).toBe(false);
    });

    it('Should not be place on map - A vs M', () => {
        var adv = new Adventurer("Lara", 3, 2, "N", "AAAA");
        var mountain = new Mountain(3, 2);
        var map = createArrayTest(5, 5);

        mountain.placeOnMap(map, 1, true);
        var res = adv.placeOnMap(map, 1, false);
        
        expect(res[0]).toBe(false);
    });
});

describe('Output', () =>{
    
    it('Should write itself correctly in a variable', async () => {
        const obj = new Adventurer("Lara", 3, 2, "S", "AADADAGGA");
        var str = obj.write();
        expect(str).toMatch("A - Lara - 3 - 2 - S - 0\n")
    })

    it('Should draw itself correctly in a variable', async () => {
        const obj = new Adventurer("Lara", 3, 2, "S", "AADADAGGA");
        
        var str = obj.draw();
        
        expect(str).toMatch("A(Lara)");
    })
});

describe('Collision', () => {

it("Should not pass throught others adventurers", () => {
    const adv = new Adventurer("Lara", 1, 1, 'S', "AAAA");
    const adv2 = new Adventurer("Croft", 1, 2, 'E', "DD");
    const arr = createArrayTest(5, 5);

    const b1 = adv.placeOnMap(arr, 1);
    const b2 = adv2.placeOnMap(arr, 1);

    expect(b2[0]).toBe(true);
    expect(b1[0]).toBe(true);

    for (var i = 0; i < 5; i++) {
        adv.nextAction(arr);
        adv2.nextAction(arr);
    }
    expect(adv2.write()).toMatch("A - Croft - 1 - 2 - O - 0\n");
    expect(adv.write()).toMatch("A - Lara - 1 - 1 - S - 0\n");


});

it("Should not pass throught mountains", () => {
    const adv = new Adventurer("Jones", 1, 1, 'S', "AAAADA");

    var arr = createArrayTest(5, 5);
    arr[1][2][1] = new Mountain(1, 2);

    for (var i = 0; i < 15; i++) {
        adv.nextAction(arr);
    }

    expect(adv.write()).toMatch("A - Jones - 0 - 1 - O - 0\n");

});

});


