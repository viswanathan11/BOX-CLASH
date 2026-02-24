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

