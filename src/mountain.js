
import MapElement from "./map_element.js";

export default class Mountain extends MapElement{
    
    constructor(posX, posY){
        super();
        this.posX = posX;
        this.posY = posY;
    }

    write(){
        return "M" + " - " + this.posX.toString() + " - " + this.posY.toString()+"\n"; 
    }

    draw(){
        return "M";
    }
}


//module.exports = Mountain