//const Mountain = require('../src/mountain');
import Mountain from '../src/mountain';
import Adventurer from '../src/adventurer'
import Treasure from '../src/treasure'

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
        var mountain = new Mountain(3, 2);
        var map = createArrayTest(5, 5);

        var res = mountain.placeOnMap(map, 1, true);
        
        expect(res[0]).toBe(true);
    });

    it('Should not be place on map - M vs T', () => {
        var mountain = new Mountain(3, 2);
        var treasure = new Treasure(3, 2);
        var map = createArrayTest(5, 5);
        
        treasure.placeOnMap(map, 0, true);
        var res = mountain.placeOnMap(map, 1, true);
        
        expect(res[0]).toBe(false);
    });

    it('Should not be place on map - M vs M', () => {
        var mountain = new Mountain(3, 2);
        var mountain2 = new Mountain(3, 2);
        var map = createArrayTest(5, 5);

        mountain.placeOnMap(map, 1, true);
        var res = mountain2.placeOnMap(map, 1, true);
        
        expect(res[0]).toBe(false);
    });

    it('Should not be place on map M vs A', () => {
        var adv = new Adventurer("Lara", 3, 2, "N", "AAAA");
        var mountain = new Mountain(3, 2);
        var map = createArrayTest(5, 5);

        adv.placeOnMap(map, 1, false);
        var res = mountain.placeOnMap(map, 1, true);
        
        expect(res[0]).toBe(false);
    });
});

describe('Output', () => {

    it('Should write itself correctly in a variable', async () => {
        const obj = new Mountain(4, 5);
        
        var str = obj.write();
        
        expect(str).toMatch("M - 4 - 5");
    })

    it('Should draw itself correctly in a variable', async () => {
        const obj = new Mountain(4, 5);
        
        var str = obj.draw();
        
        expect(str).toMatch("M");
    })
})