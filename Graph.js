
export class Graph{

    constructor(){
        this.chessBoard = new Array(8)
        this.paths = {}
        this.possibleMoves = [
            [2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2]
        ];
        this.visited = new Set();
    }

    knightMoves(current,destination){
        this.knightTraverse(current,destination,null)
    }

    storeMoves(pathId,move){
        if(this.paths[pathId]){
            this.paths[pathId].unshift(move);
        }else{
            this.paths[pathId] = [move];
        }
    }

    fetchPathId(){
        return crypto.randomUUID().substring(0,5);

    }

    isVisited(nextMove){
        const key = `${nextMove[0]}${nextMove[1]}`;
        if(this.visited.has(key))
            return true;
        else {
            this.visited.add(key);
            return false
        }
    }
    
    knightTraverse(current,destination,pathId){
        this.isVisited(current);
        const [xCurrent,yCurrent] = current;
        const [xdestination,ydestination] = destination;
        if(xCurrent == xdestination && yCurrent == ydestination){
            this.storeMoves(pathId,current);
            return true
        }

        for (let [i, j] of this.possibleMoves){
            let newX = xCurrent + i;
            let newY = yCurrent + j;
            if(newX >=0 && newX < 8 && newY >= 0 && newY < 8 && !this.isVisited([newX,newY])){
                const pathUniqueId = pathId ?? this.fetchPathId();
                const nextStep = [newX,newY]
                if(this.knightTraverse(nextStep,destination,pathUniqueId)){
                    this.storeMoves(pathUniqueId,current);
                    //return true;
                }
            }
        }
        

        return false;

    }


}
