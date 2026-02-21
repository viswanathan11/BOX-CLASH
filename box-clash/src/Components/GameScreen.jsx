import React, { useState } from 'react';

function GameScreen({ gridSize, mode, difficulty, goHome }) {
  //Horizontal Edges
  const [horizontalEdges, setHorixontalEdges] = useState(
    //this creates array from any objects (Arrays.from(object,map,thisValue))
    Array.from({ length: gridSize }, () => {
      //this creates an array of dize gridSize-1 in each row
      Array(gridSize - 1).fill(null);
    }),
  );

  //vertical Edges
  const [verticalEdges, setVerticalEdges] = useState(
    Array.from({ length: gridSize - 1 }, () => {
      // this create an array of size grideSie in each column
      Array(gridSize).fill(null);
    }),
  );

  //boxes
  const [boxes, setBoxes] = useState(
    Array.form({ length: gridSize - 1 }, () => {
      Array(gridSize - 1).fill(null);
    }),
  );

  const [currentPlayer, setCurrentPlayer] = useState('P1');
  const [score, setScore] = useState({ P1: 0, P2: 0 });

  const handleHorizontalClick = (r, c) => {
    if (horizontalEdges[r][c]) return;

    //map return an array always
    //here the callbacks returns an array to an array itself
    const newEdges = horizontalEdges.map((row) => [...row]);

    newEdges[r][c] = currentPlayer;
    /* */
    checkBoxes(r, c, 'h');
  };

  const handleVerticalClick = (r, c) => {
    if (verticalEdges[r][c]) return;

    const newEdges = verticalEdges.map((row) => [...row]);

    checkBoxes(r, c, 'h');
  };

  const checkBoxes = (r, c, type) => {
    let scored = false;
    const newBoxes = boxes.map((row) => [...row]);

    if (type === 'h') {
      //above box
      if (r > 0) {
        if (horizontalEdges[r - 1][c] 
          && verticalEdges[r - 1][c] 
          && verticalEdges[r - 1][c + 1] 
        &&!newBoxes[r-1][c]) {
          newBoxes[r-1]=currentPlayer;
          scored=true;
        }
      }

      //check box below

      if(r<boxes.length){
        if(horizontalEdges[r][c] &&
          verticalEdges[r][c] &&
          verticalEdges[r][c+1] && !newBoxes[r][c]
        ){
          newBoxes[r][c]=currentPlayer;
          scored=true;
        }
      }
    }
      if(type==="v"){
        //check left box

        if(c>0){
          if(verticalEdges[r][c-1] &&
            horizontalEdges[r][c-1] &&
            horizontalEdges[r][c-1] &&
            !newBoxes[r][c-1]
          ){
            newBoxes[r][c-1]=currentPlayer;
            scored=true;
          }
        }
        //check right box
        if(c<boxes[0].length){
          if(verticalEdges[r][c] &&
            horizontalEdges[r][c] &&
            horizontalEdges[r+1][c]&&
            !newBoxes[r][c]
          ){
            newBoxes[r][c]=currentPlayer;
            scored=true;
          }
        }
      }
      setBoxes(newBoxes);
      if(scored){
        //adding score to the prev score
        setScore(prev =>({
          ...prev,[currentPlayer]:prev[currentPlayer]+1
        }))
      }else{
        setCurrentPlayer((prev)=>(prev==="P1"?"P2":"P1"));
      }
    
  };
  return (
    <div className="game-container">
      <div className="score-board">
        <div>Player 1:{score.P1}</div>
        <div>Player 2:{score.P2}</div>
      </div>

      <div className="board">
        {horizontalEdges.map((row, r) => (
          <div key={r}>
            {/*Dot Row*/}
            <div className="dot-row">
              {row.map((_, c) => (
                <React.Fragment key={c}>
                  {/* creating Dots */}
                  <div className="dot"></div>
                  <div className="h-edge" onClick={() => handleHorizontalClick(r, c)}>
                    {/* Horizontal Edges */}
                    {horizontalEdges[r][c] && <div className="edge-filled"></div>}
                  </div>
                </React.Fragment>
              ))}
              {/* This is used Because the horizontal[4][3] 
                so we would need and extra dot at the end*/}
              <div className="dot"></div>
            </div>

            {r < verticalEdges.length && (
              <div className="middle-row">
                {verticalEdges[r].map((_, c) => (
                  <React.Fragment>
                    <div className="v-edge" onClick={() => handleVerticalClick(r, c)}>
                      {verticalEdge[r][c] && <div className="edge-filled-vertical"></div>}
                    </div>
                    {c < boxes[r].length && (
                      <div className="box">
                        {boxes[r][c]} {/*boxes[r][c]= p1|p2*/}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={goHome}>Back</button>
    </div>
  );
}

export default GameScreen;
