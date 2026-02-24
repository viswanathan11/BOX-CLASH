import React, { use, useEffect, useState } from 'react';
import { getAIMove } from '../../AI Mode/aiLogic';
function GameScreen({ gridSize, mode, difficulty, goHome }) {
  //Horizontal Edges

  const STORAGE_KEY = 'boxClashGameState';

  const loadGameState = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);

      if (parsed.gridSize === gridSize) {
        return parsed;
      }

      //remove any invalid saved state
      localStorage.removeItem(STORAGE_KEY);
    }

    return null;
  };

  const savedState = loadGameState();

  const [currentPlayer, setCurrentPlayer] = useState(savedState?.currentPlayer || 'P1');
  const [score, setScore] = useState(savedState?.score || { P1: 0, P2: 0 });
  const [horizontalEdges, setHorizontalEdges] = useState(
    //this creates array from any objects (Arrays.from(object,map,thisValue))
    savedState?.horizontalEdges ||
      Array.from({ length: gridSize }, () =>
        //this creates an array of dize gridSize-1 in each row
        Array(gridSize - 1).fill(null),
      ),
  );

  //vertical Edges
  const [verticalEdges, setVerticalEdges] = useState(
    savedState?.verticalEdges ||
      Array.from({ length: gridSize - 1 }, () =>
        //this creates an array of dize gridSize in each column
        Array(gridSize).fill(null),
      ),
  );

  //boxes
  const [boxes, setBoxes] = useState(
    savedState?.boxes ||
      Array.from({ length: gridSize - 1 }, () => {
        return Array(gridSize - 1).fill(null);
      }),
  );

  useEffect(() => {
    console.log(score);
  }, [score]);
  const handleHorizontalClick = (r, c,isAI=false) => {

    //this blocks the user click when ai mode is on
    if(mode==='ai' && currentPlayer==='P2' && !isAI)return;
    if (horizontalEdges[r][c]) return;

    //map return an array always
    //here the callbacks returns an array to an array itself
    const newEdges = horizontalEdges.map((row) => [...row]);

    newEdges[r][c] = currentPlayer;

    setHorizontalEdges(newEdges);
    /* */
    checkBoxes(r, c, 'h', newEdges, verticalEdges);
  };

  const handleVerticalClick = (r, c,isAI=false) => {

    //this blocks the user click when ai mode is on
    if(mode === 'ai' && currentPlayer==='P2' && !isAI) return;
    if (verticalEdges[r][c]) return;

    const newEdges = verticalEdges.map((row) => [...row]);
    newEdges[r][c] = currentPlayer;
    setVerticalEdges(newEdges);
    checkBoxes(r, c, 'v', horizontalEdges, newEdges);
  };


  //AI Turn Trigger

  useEffect(()=>{
    //return void if the mode is not ai or the currentPlayer is not P2
    if(mode!=='ai' ||currentPlayer!=='P2')return;

    const delay=difficulty==='hard'?400:difficulty === 'medium'?700:1000;

    const timer=setTimeout(()=>{
      const move=getAIMove(horizontalEdges,verticalEdges,gridSize,difficulty);
      if(!move) return;

      if(move.type==='h'){
        handleHorizontalClick(move.r,move.c,true);//Set AI Move True
      }else{
        handleVerticalClick(move.r,move.c,true);//set AI Move Truel
      }
    },delay);

    return ()=> clearTimeout(timer);
  },[currentPlayer,mode,horizontalEdges,verticalEdges,gridSize,difficulty]);

  useEffect(() => {
    const Timer = setTimeout(() => {
      const gameState = {
        horizontalEdges,
        verticalEdges,
        boxes,
        currentPlayer,
        score,
        gridSize,
        mode,
        difficulty,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }, 3000);

    //If multiple Click occure in 5s it will be cancel and only
    //occurs one time
    return () => clearTimeout(Timer);
  }, [horizontalEdges, verticalEdges, boxes, currentPlayer, score, gridSize, mode, difficulty]);

  const checkBoxes = (r, c, type, hEdges, vEdges) => {
    let scored = false;
    const newBoxes = boxes.map((row) => [...row]);

    if (type === 'h') {
      //above box
      if (r > 0) {
        if (
          hEdges[r - 1][c] &&
          vEdges[r - 1][c] &&
          vEdges[r - 1][c + 1] &&
          hEdges[r][c] &&
          !newBoxes[r - 1][c]
        ) {
          newBoxes[r - 1][c] = currentPlayer;
          scored = true;
        }
      }

      //check box below

      if (r < boxes.length) {
        if (
          hEdges[r][c] &&
          vEdges[r][c] &&
          hEdges[r + 1][c] &&
          vEdges[r][c + 1] &&
          !newBoxes[r][c]
        ) {
          newBoxes[r][c] = currentPlayer;
          scored = true;
        }
      }
    }
    if (type === 'v') {
      //check left box

      if (c > 0) {
        if (
          vEdges[r][c - 1] &&
          hEdges[r + 1][c - 1] &&
          hEdges[r][c - 1] &&
          vEdges[r][c] &&
          !newBoxes[r][c - 1]
        ) {
          newBoxes[r][c - 1] = currentPlayer;
          scored = true;
        }
      }
      //check right box
      if (c < boxes[0].length) {
        if (
          vEdges[r][c] &&
          hEdges[r][c] &&
          hEdges[r + 1][c] &&
          vEdges[r][c + 1] &&
          !newBoxes[r][c]
        ) {
          newBoxes[r][c] = currentPlayer;
          scored = true;
        }
      }
    }
    setBoxes(newBoxes);
    if (scored) {
      //adding score to the prev score
      setScore((prev) => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1,
      }));
    } else {
      setCurrentPlayer((prev) => (prev === 'P1' ? 'P2' : 'P1'));
    }
  };

  const handleGoHome = () => {
    localStorage.removeItem(STORAGE_KEY);
    goHome();
  };

  return (
    <div className="game-container">
      <div className="score-board">
        <div>Player 1: {score.P1}</div>
        <div>
          {mode === 'ai' ? 'AI' : 'Player 2'}: {score.P2}
        </div>
      </div>

      <div className="board">
        {horizontalEdges.map((row, r) => (
          <div key={r}>
            {/*Dot Row*/}
            <div className="dot-row">
              {row.map((_, c) => (
                <React.Fragment key={`h-${r}-${c}`}>
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
                  <React.Fragment key={`v-${r}-${c}`}>
                    <div className="v-edge" onClick={() => handleVerticalClick(r, c)}>
                      {verticalEdges[r][c] && <div className="edge-filled-vertical"></div>}
                    </div>
                    {c < boxes[r].length && (
                      <div className="box">
                        {/*boxes[r][c]= p1|p2*/}
                        {console.log(`player :${boxes[r][c]} mode:${mode}`)}
                        {boxes[r][c] === 'P2' && mode === 'ai' ? 'AI' : boxes[r][c]}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <br />
      <button onClick={handleGoHome}>Back</button>
    </div>
  );
}

export default GameScreen;
