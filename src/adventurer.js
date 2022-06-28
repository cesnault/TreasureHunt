
import MapElement from './map_element.js';
import MovementSystem from './movement_system.js'
import Treasure from './treasure.js';

export default class Adventurer extends MapElement{
  
    #name;
    #sequence;
    #seqIndex;
    #treasureCount;
    #movSystem;
   
    constructor(name, posX, posY, orientation, sequence){
        super();
        this.#name = name;
        this.posX = posX;
        this.posY = posY;
        this.#sequence = sequence;
        this.#seqIndex = 0;
        this.#treasureCount = 0;
        this.#movSystem = new MovementSystem(orientation);
    }
   
     write(){
        return "A" + " - " + this.#name + " - " + this.posX.toString() + " - " + this.posY.toString()+" - " + this.#movSystem.getSymb() + " - " + this.#treasureCount.toString() +"\n"; 
    }

    draw(){
        return "A("+this.#name+")";
    }

    #getNextSymb(){
        var newSymb = this.#sequence.charAt(this.#seqIndex);

        this.#seqIndex += 1;
        return newSymb;
    }
    #takeTreasure(item){
            if(!(item instanceof Treasure))
                return;
                
            this.#treasureCount += item.takeTreasure(); // 0 or 1
            
    }

    #updatePos(map, newPos){
            map[this.posX][this.posY][1] = null;
            map[newPos[0]][newPos[1]][1] = this;

            this.posX = newPos[0];
            this.posY  = newPos[1];
    }
        
    #shouldPlay(){
            if(this.#seqIndex >= this.#sequence.length)
                return false;
            return true;
    }

    #moveForward(map, newPos){
        newPos = this.#movSystem.getNewPos(this.posX, this.posY);
               
        if(this.isOffLimit(newPos[0], map.length, newPos[1], map[0].length))
            return;       
        if(!this.canMove(map[newPos[0]][newPos[1]],1))
            return;
        this.#updatePos(map, newPos);
        this.#takeTreasure(map[this.posX][this.posY][0]);
    }

    nextAction(map){
            var symb;
            var newPos;

            if(!this.#shouldPlay())
                return;
            
            symb = this.#getNextSymb();
            
            if(symb === "G")
                this.#movSystem.leftTurn();
            else if(symb === "D")
                this.#movSystem.rightTurn();
            else
                this.#moveForward(map, newPos)
        
    }
}