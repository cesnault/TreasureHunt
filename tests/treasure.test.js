
//const Treasure = require('../src/treasure');
import Treasure from '../src/treasure'
import Mountain from '../src/mountain'
import Adventurer from '../src/adventurer'

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

    test('Should decrease the number of treasure present ( min_val == 0 ) ', () => {
        const obj = new Treasure(3, 2, 3);
        var res = obj.takeTreasure();
        
        expect(res).toBe(1);
        res = obj.takeTreasure();
        expect(res).toBe(1);
        res = obj.takeTreasure();
        expect(res).toBe(1);
        res = obj.takeTreasure();
        expect(res).toBe(0);
        res = obj.takeTreasure();
        expect(res).toBe(0);
        res = obj.takeTreasure();
        expect(res).toBe(0);
    
    });
    
    describe('Placement', () => {

        it("Should be placed", () =>{
            const map = createArrayTest(10, 10);
            var treasure = new Treasure(2, 2);
            var res = treasure.placeOnMap(map, 0, true);

            expect(res[0]).toBe(true);
        });

        it("Should  be placed - T vs A", () =>{
            const map = createArrayTest(10, 10);
            var treasure = new Treasure(2, 2);
            var adv = new Adventurer("Lara", 3, 2, "N", "AAAA");
           
            adv.placeOnMap(map, 1, false);
            var res = treasure.placeOnMap(map, 0, true);
            
            expect(res[0]).toBe(true);
        });

        it("Should not be placed - T vs T", () =>{
            const map = createArrayTest(10, 10);
            var treasure = new Treasure(2, 2);
            var treasure2 = new Treasure(2, 2);
           
            treasure2.placeOnMap(map,0,true);
            var res = treasure.placeOnMap(map, 0, true);
            
            expect(res[0]).toBe(false);
        });

        it("Should not be placed T - M", () =>{
            const map = createArrayTest(10, 10);
            var treasure = new Treasure(2, 2);
            var mountain = new Mountain(2,2);
           
            mountain.placeOnMap(map,1,true);
            var res = treasure.placeOnMap(map, 0, true);
            
            expect(res[0]).toBe(false);
        });
    });
    describe("Output", () =>{
        
        it('Should write itself correctly in the output file', async () => {
            const obj = new Treasure(3, 2, 3);

            expect(obj.write()).toMatch("T - 3 - 2 - 3\n");
        })
});