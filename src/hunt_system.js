import fs from 'fs';
import Adventurer from './adventurer.js'
import Treasure from './treasure.js';
import Mountain from './mountain.js';
import readline from 'readline';

/**
 *  Principal class that will handle the execution of the treasure hunting as well as the output of the final map
 */
export default class HuntSystem{

    #map
    #treasureList
    #mountainList
    #adventurerList
    #padding;
    #maxTurn;

    constructor(){
        this.#map = null;
        this.#treasureList = new Array();
        this.#mountainList = new Array();
        this.#adventurerList = new Array();
        this.#padding = 0;
        this.#maxTurn = 0;
    };

    #handleAdventurer(array){   
        
        if(this.#map == null)
            return false;
        if(array.length != 6)
        return false;

        var   advName = array[1].toString();
        var   posX = parseInt(array[2], 10);
        var   posY = parseInt(array[3], 10);
        var   orient = array[4].toString();
        var  sequence = array[5].toString();
        var char;

        if(isNaN(posX) || isNaN(posY) || posX < 0 || posY < 0)
            return false;

        if(posX >= this.#map.length || posY >= this.#map.length)
            return false;

        if(orient != "S" && orient != "N" && orient != "E" && orient != "O")
            return false;

        for(var i = 0; i < sequence.length; i++){
            char = sequence.charAt(i)
            if( !(char.match(/(A|G|D)$/)) )
                return false;
        }
        
            this.#adventurerList.push(new Adventurer(advName, posX, posY, orient, sequence));
            if(advName.length > this.#padding)
                this.#padding = advName.length;
            if(this.#maxTurn < sequence.length)
                this.#maxTurn = sequence.length;
            return true;
    }
    #handleTreasure(array){   
        if(this.#map == null)
            return false;
        if(array.length != 4)
        return false;

      var  posX = parseInt(array[1], 10);
      var  posY = parseInt(array[2], 10);
      var  count = parseInt(array[3], 10);

        if(isNaN(posX) || isNaN(posY) || posX < 0 || posY < 0 || count < 0)
        return false;

        if(posX >= this.#map.length || posY >= this.#map.length)
            return false;

            this.#treasureList.push( new Treasure(posX, posY, count));
            const ctStr = count.toString()
            if(ctStr.length > this.#padding)
               this.#padding = ctStr.length;

            return true;
    }
    #handleMountain(array){   
        if(this.#map == null)
            return false;
        if(array.length != 3)
        return false;

      var  posX = parseInt(array[1], 10);
      var  posY = parseInt(array[2], 10);

        if(isNaN(posX) || isNaN(posY) || posX < 0 || posY < 0)
        return false;

        if(posX >= this.#map.length || posY >= this.#map.length)
            return false;
        
        this.#mountainList.push(new Mountain(posX, posY));
        return true;
    }
    #handleMap(array){ 
        if(array.length != 3)
            return false;
      
        var  sizeX = parseInt(array[1], 10);
        var  sizeY = parseInt(array[2], 10);
      
        if(isNaN(sizeX) || isNaN(sizeY) || sizeX <= 0 || sizeY <= 0)
            return false;
      
        this.#map = new Array(sizeX);
        
        for(var i = 0; i < this.#map.length; i++){
            this.#map[i] = new Array(sizeY);
            
            for(var j = 0; j < this.#map[i].length; j++){
                this.#map[i][j] = [".", null];
            }
        }
        return true;
    }
    #placeElements(mapElementList,index, bCheckAll){
        var i = 0;
        var status;

        while(i < mapElementList.length){
            var status = mapElementList[i].placeOnMap(this.#map, index, bCheckAll);
            if(!status[0]){
                console.info(status[1])
                return false;
            }
            i++;
        }
        return true;
    }
    #checkData(array){
        const type = array[0];

        switch (type) {
            case "A":
                if(!this.#handleAdventurer(array))
                    return false;
                break;
            case "T":
                if(!this.#handleTreasure(array))
                    return false;
                break;
            case "M":
                if(!this.#handleMountain(array))
                    return false;
                break;
            case "C":
                if(!this.#handleMap(array))
                return false;
            break;
            default:
                return false;
            
        }
    }
    /**
     *   Make sure that everything in the entry file is valid
     * 
     * @param {string} fileName
     * @return {bool} if parsing succeeded or not
     */ 
    async parse(fileName){

        const fileStream = fs.createReadStream(fileName);
    
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay : Infinity});
    
        var bStatus = false;
        var type;
        for await( const line of rl) {
            if(line.charAt(0) === "#")
                continue;
            
            var array = line.split("-").map(str => str.trim());
            
            if(array == null)
                return false;

            this.#checkData(array);
            bStatus = true;
        }
        
        return bStatus;
    }

    /**
     *  Prepare the map by putting everything in place then replicate adventurer's moves
     * @returns bool
     */
    simulate(){
        var i = 0;
        if(!this.#placeElements(this.#mountainList, 1, true))
            return false;
        if(!this.#placeElements(this.#treasureList, 0, true))
            return false;
        if(!this.#placeElements(this.#adventurerList, 1, false))
            return false;

        while(this.#maxTurn > 0){
            this.#adventurerList.forEach( adventurer => adventurer.nextAction(this.#map));
            this.#maxTurn -= 1;
        }
        return true;
    }


    write(){
        return "C" + " - " + this.#map.length.toString() +" - "+ this.#map[0].length.toString() + "\n"; 
    }

    outputMap(fileName){
        var res = this.write();
        
        this.#mountainList.forEach( mountain => res += mountain.write());
        this.#treasureList.forEach( treasure => res += treasure.write());
        this.#adventurerList.forEach( adventurer => res += adventurer.write());
        fs.writeFileSync(fileName, res, err => {
            if(err){
                throw new Error("Can't write")
            }
       
        })
       
    }

   
    drawMap(fileName){
        
        var res = "";
        var field;
        var obstacle;
        var space = ""; //between each element
    
        for(var i = 0; i < this.#padding+5; i++)
            space += " ";

        for(var i = 0; i < this.#map[0].length; i++){
            
            for(var j = 0; j < this.#map.length; j++){
            
                field = this.#map[j][i][0];
                obstacle = this.#map[j][i][1];
            
                if( obstacle != null){
                    var str = obstacle.draw();
                    res += str + space.substring(str.length);
                }
                else{
                    if (field instanceof Treasure){
                        var str = field.draw();
                        res += field.draw() + space.substring(str.length);
                    }
                    else
                        res += "." + space.substring(1);
                }
            }
            res +="\n"
        }

        fs.writeFileSync(fileName, res,err => {
            if(err){
                throw new Error("impossible d'ecrire")
            }
       
        });
      
    }
}