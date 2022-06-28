//const Mountain = require('../src/mountain');
//const Treasure = require('../src/treasure');
import Mountain from '../src/mountain';
import Treasure from '../src/treasure';

    describe("isOffLimit tests", () => {
        
        it('isOffLimit(2, 5, 3 ,4) == false',() =>{
            const mountain = new Mountain(4,4);
            
            expect(mountain.isOffLimit(2, 3, 4 ,5)).toBe(false);
        });

        it('isOffLimit(0, 0, 1 ,1) == false',() =>{
            const mountain = new Mountain(4,4);
            
            expect(mountain.isOffLimit(0, 1, 0, 1)).toBe(false);
        });
        
        it('isOffLimit(2, 3, 3 ,4) == false',() =>{
            const mountain = new Mountain(4,4);
            
            expect(mountain.isOffLimit(2, 3, 3 ,4)).toBe(false);
        });

        it('isOffLimit(3, 3, 3 ,4) == true',() =>{
            const mountain = new Mountain(4,4);
            
            expect(mountain.isOffLimit(3, 3, 3 ,4)).toBe(true);
        });

        it('isOffLimit(-1, 2, 3 ,4) == true',() =>{
            const mountain = new Mountain(4,4);
            
            expect(mountain.isOffLimit(-1, 2, 3 ,4)).toBe(true);
        });

        it('isOffLimit(2, -5, 3 , 4) == true',() =>{
            const mountain = new Mountain(4,4);
            
            expect(mountain.isOffLimit(2, 3, -5, 4)).toBe(true);
        });
    });

    describe("canMove tests", () => {
        
        if('canMove([".", null] == true with index = 1)', () => {
            const mountain = new Mountain(4,4);

            expect(mountain.canMove([".", null], 1)).toBe(true);
        });

        if('canMove([".", null] == true with index = 0)', () => {
            const mountain = new Mountain(4,4);

            expect(mountain.canMove([".", null], 0)).toBe(true);
        });

        if('canMove([Treasure object, null] == true with index = 1)', () => {
            const mountain = new Mountain(4,4);

            expect(mountain.canMove([ new Treasure(3,2), null], 1)).toBe(true);
        });

        if('canMove([Treasure object, null] == false with index = 0)', () => {
            const mountain = new Mountain(4,4);

            expect(mountain.canMove([ new Treasure(3,2), null], 0)).toBe(false);
        });

        if('canMove([".", Mountain object ] == false with index = 1)', () => {
            const mountain = new Mountain(4,4);

            expect(mountain.canMove([".", null], 1)).toBe(true);
        });

    });