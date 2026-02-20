import React,{useState} from 'react';

function GameScreen({gridSize,mode,difficulty,goHome}){
  //Horizontal Edges
  const[horizontalEdges,setHorixontalEdges]=useState(
    //this creates array from any objects (Arrays.from(object,map,thisValue))
    Array.from({length:gridSize},()=>{
      //this creates an arrya of dize gridSize-1 in each row
      Array(gridSize-1).fill(null);
    })
  );

  //vertical Edges
  const[verticalEdges,setVerticalEdges]=useState(
    Array.from({length:gridSize-1},()=>{
      // this create an array of size grideSie in each column
      Array(gridSize).fill(null);
    })
  );

  //boxes
  const[boxes,setBoxes]=useState(
    Array.form({length:gridSize-1},()=>{
      Array(gridSize-1).fill(null);
    })
  )

  const[currentPlayer,setCurrentPlayer]=useState("P1");
  const[score,setScore]=useState({P1:0,P2:0});

  return (
    <div className="game-container">
      <div className='score-board'>
        <div>Player 1:{score.P1}</div>
        <div>Player 2:{score.p2}</div>
      </div>

      <div className='board'>
        {
          horizontalEdges.map((row,r)=>(
            <div key={r}>
              {/*Dot Row*/}
              <div className="dot-row">
                
              </div>
            </div>
          ))
        }
      </div>
      <button onClick={goHome}>Back</button>
    </div>
  )
}

export default GameScreen;