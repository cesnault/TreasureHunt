
export default class MapElement{

    #posX;
    #posY;

    constructor(){
        if(this.constructor === MapElement)
            throw new Error("Abstract Class - cannot be created");
    }

    get posX(){
        return this.#posX;
    }
    set posX(newX){
        this.#posX = newX;
    }
    get posY(){
        return this.#posY;
    }
    set posY(newY){
        this.#posY = newY;
    }

    isOffLimit(posX, lengthX , posY, lengthY){
        if(posX < 0 || posY < 0 || posX >= lengthX || posY >= lengthY)
            return true
        return false;
    }

    canMove(field, index, bCheckAll){
        if(bCheckAll) // treasure cannot be on a mountain
            {
                if(field[1] !== null || field[0] !== ".")
                    return false;
                return true;
            }
        if(field[index] != null && index == 1)
            return false

        if(field[index] !== "." && index == 0)
            return false 
        return true;
    }

    write(){
        throw new Error("Abstract method - need to be override");
    }

    draw(){
        throw new Error("Abstract method - need to be override");
    }

    placeOnMap(map,index, bCheckAll){
        if(this.isOffLimit(this.#posX, map.length, this.#posY, map[0].length))
            return [false, "This element is off limit"]
        if(!this.canMove(map[this.#posX][this.#posY], index, bCheckAll))
            return [false, "Cannot place this element, there is already another one here"]
        map[this.#posX][this.#posY][index] = this;
        return [true, ""]
    }

}



//module.exports = MapElement;