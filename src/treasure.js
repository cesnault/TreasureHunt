import MapElement from "./map_element.js";

class Treasure extends MapElement{

    #count;

    constructor(posX, posY, count){
        super();
        this.posX = posX;
        this.posY = posY;
        this.#count = count;
    }

    get count(){
        return this.#count;
    }

    /**
     * Called when an adventurer try to take it 
     */
    takeTreasure(){
        if(this.#count > 0){
            this.#count -= 1;
            return 1;
        }
        else 
            return 0;
    }

    write(){
        return "T" + " - " + this.posX.toString() + " - " + this.posY.toString()+ " - " + this.#count.toString() +"\n"; 
    }

    draw(){
        return "T("+this.#count+")";
    }
}
export default Treasure