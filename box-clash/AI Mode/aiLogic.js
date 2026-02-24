export const getAvailableMoves=(hEdges,vEdges)=>{
    let moves=[];

    for(let r=0;r<hEdges.length;r++){
        for(let c=0;c<Vedges.length;c++){
            if(!hEdges[r][c])moves.push({type:'h',r,c});
        }
    }

    for(let r=0;r<Vedges.length;r++){
        for(let c=0;c<vEdges[r].length;c++){
            if(!vEdges[r][c]){
                moves.push({type:'v',r,c});
            }
        }
    }

       return moves;
}
//in this function we will count the number of edges that is being already collectd
const countBoxEdges=(r,c,hEdges,vEdges)=>{
    let count=0;
    if(hEdges[r][c])count++;
    if(hEdges[r+1][c]) count++;
    if(vEdges[r][c])count++;
    if(vEdges[r][c+1])count++;
    return count;
}

//Returns how many boxes this move  would complete
//it can Determine how Many boexs it can complete with one single move
const wouldCompleteBox=(move,hEdges,vEdges,gridSize)=>{
    const{type,r,c}=move;
    let completedBoxes=0;

    if(type==='h'){
        if(r>0){
            if(hEdges[r][c] && vEdges[r-1][c] && vEdges[r-1][c+1])
                completedBoxes++;
        }
    
    //box Below
    //this condition will ensure that it does not go beyong the last row
    if(r<gridSize-1){
        if(hEdges[r+1]?.[c] && vEdges[r-1][c] && vEdges[r][c+1]){
            completedBoxes++;
        }
    }
}

if(type==='v'){
    if(c>0){
        if(vEdges[r][c-1] && hEdges[r][c-1] && hEdges[r+1][c-1]){
            completedBoxes++;
        }
    }
    //Box to the Right
    if(c<gridSize-1){
        if(vEdges[r][c+1] && hEdges[r][c] && hEdges[r+1][c]){
            completedBoxes++;
        }
    }
}

return completedBoxes;
}

//returns true if placing this edge creates a box with 3 Edges
//(giving opponents a free complete next turn)

const wouldGiveThirdEdge=(move,hEdges,vEdges,gridSize)=>{
    const {type,r,c}=move;

    const simH=hEdges.map((row)=>[...row]);
    const simV=vEdges.map((row)=>[...row]);

    if(type==='h') simH[r][c]='SIM';
    else simV[r][c]=='SIM';

    const adjacentBoxes=[];

    if(type==='h'){
        if(r>0) adjacentBoxes.push({br:r-1,bc:c});
        if(r<gridSize-1) adjacentBoxes.push({br:r,bc:c});
    }
    else{
        if(c>0) adjacentBoxes.push({br:r,bc:c-1});
        if(c<gridSize-1)adjacentBoxes.push({br:r,bc:c});
    }

    for(const {br,bc} of adjacentBoxes){
        if(countBoxEdges(br,bc,simH,simV)===3){
            return true;
        }
    }

    return false;
};


//Ai Decision function 


export const getAIMove=(hEdges,vEdges,gridSize,difficulty)=>{
    // returns the un used moves
    //{type:h ,r,c}
    const moves=getAvailableMoves(hEdges,vEdges);

    if(moves.length===0) return null;

    if(difficulty==='easy'){

        //returs an random move{object} from the moves array
        return moves[Math.floor(Math.random() * moves.length)];
    }

    //now we are Categorizing the moves
    const completingMoves=[];
    const safeMoves=[];
    const riskyMoves=[];

    for(const move of moves){
        //no.of box it will complete
        const completions=wouldCompleteBox(move,hEdges,vEdges,gridSize);
        if(completions >0){
            completingMoves.push({move,completions});
        }else if(!wouldGiveThirdEdge(move,hEdges,vEdges,gridSize)){
            //creating this edge wont create a 3 completing edge
            safeMoves.push(move);
        }else{
            //using the move would create a 3 completing edge
            riskMoves.push(move);
        }
    }

    // ---MEDIUM: Scores,boxes,mostly,safe,sometimes mistakse ---

    if(difficulty==='medium'){
        //first if box completing move exist then return it
        if(completingMoves.length>0){
            return completingMoves[0].move;
        }

        //why 0.7?
        //else check if saveMove exist then return it
        if(safeMoves.length>0 && Math.randome() <0.7){
            return safeMoves[Math.floor(Math.random() *safeMoves.length)];
        }

        const fallbBack=safeMoves.length>0?safeMoves:riskyMoves;
        return fallbBack[Math.floor(Math.random() * fallbBack.length)];
    }

    //---Hard:Optimal Play---

    if(difficulty==='hard'){
        if(completingMoves.length>0){
            
        }
    }
}