
class DirectionNode{

    #_dirSymb 
    #_dirX;
    #_dirY;
    #_next;
    #_previous;

    constructor(dirSymb){
        this.#_dirSymb = dirSymb;
        this.#translateSymb();
    }

    get next(){
        return this.#_next;
    }

    set next(node){
        this.#_next = node;
    }

    get previous(){
        return this.#_previous;
    }

    set previous(node){
        this.#_previous = node;
    }

    get dirSymb(){
        return this.#_dirSymb;
    }

    get dirX(){
        return this.#_dirX
    }

    get dirY(){
        return this.#_dirY
    }

    #translateSymb(){
        if (this.#_dirSymb === "N"){
            this.#_dirX = 0;
            this.#_dirY = -1;    
        }
        else if (this.#_dirSymb === "E"){
            this.#_dirX = 1;
            this.#_dirY = 0;    
        }
        else if (this.#_dirSymb === "O"){
            this.#_dirX = -1;
            this.#_dirY = 0;    
        }
        else
        {
            this.#_dirX = 0;
            this.#_dirY = 1;    
        }
    }

}



/** 
 * Make the adventurer able to turn and move as he fit.
 * 
 * This use a double linked list with 4 node representing a direction(N, E, S, O) and their implementation in 2D (X,Y);
*/
export default class MovementSystem{

        #_actualDir;


        constructor(orientation){
            this.#CreateDirectionNodes(orientation);
        }

        #CreateDirectionNodes(orientation){
            const Nnode = new DirectionNode('N');
            const Enode = new DirectionNode('E');
            const Onode = new DirectionNode('O');
            const Snode = new DirectionNode('S');

            Nnode.next = Enode;
            Nnode.previous = Onode;

            Enode.next = Snode;
            Enode.previous = Nnode;

            Snode.next = Onode;
            Snode.previous = Enode;

            Onode.next = Nnode;
            Onode.previous = Snode;

            if(orientation == "N")
                this.#_actualDir = Nnode;
            else if(orientation == "E")
                this.#_actualDir = Enode;
            else if(orientation == "O")
                this.#_actualDir = Onode;
            else
                this.#_actualDir = Snode;

            
        }

        leftTurn(){
            this.#_actualDir = this.#_actualDir.previous;
        }

        rightTurn(){
            this.#_actualDir = this.#_actualDir.next;
        }

        getSymb(){
            return this.#_actualDir.dirSymb;
        }
        
        getNewPos(posX, posY){
            var newX = posX + this.#_actualDir.dirX;
            var newY = posY + this.#_actualDir.dirY;

            return [newX, newY];
        }
}