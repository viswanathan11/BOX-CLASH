import { useState } from "react";
import "./App.css";
import GameScreen from "./Components/GameScreen";
function App() {
  const [screen, setScreen] = useState("home");
  const [mode, setMode] = useState(null); // "2p" or "ai"
  const [gridSize, setGridSize] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  return (
    <div className="app">

      {screen === "home" && (
        <div className="card">
          <h1>BOX CLASH</h1>
          <button onClick={() => {
            setMode("2p");
            setScreen("twoPlayer");
          }}>
            2 PLAYER
          </button>

          <button onClick={() => {
            setMode("ai");
            setScreen("aiSetup");
          }}>
            AI MODE
          </button>
        </div>
      )}

      {screen === "twoPlayer" && (
        <div className="card">
          <h2>2 PLAYER MODE</h2>
          <button onClick={() => {
            setGridSize(4);
            setScreen("game");
          }}>4x4</button>

          <button onClick={() => {
            setGridSize(5);
            setScreen("game");
          }}>5x5</button>

          <button onClick={() => {
            setGridSize(6);
            setScreen("game");
          }}>6x6</button>
        </div>
      )}

      {screen === "aiSetup" && (
        <div className="card">
          <h2>AI MODE</h2>

          <button onClick={() => {
            setDifficulty("easy");
            setGridSize(6);
            setScreen("game");
          }}>EASY</button>

          <button onClick={() => {
            setDifficulty("medium");
            setGridSize(5);
            setScreen("game");
          }}>MEDIUM</button>

          <button onClick={() => {
            setDifficulty("impossible");
            setGridSize(4);
            setScreen("game");
          }}>IMPOSSIBLE</button>
        </div>
      )}

      {screen === "game" && (
        <GameScreen
          gridSize={gridSize}
          mode={mode}
          difficulty={difficulty}
          goHome={() => setScreen("home")}
        />
      )}

    </div>
  );
}

export default App;