function GridSelectionPage({ mode, onSelectGrid, onSelectDifficulty, onBack }) {
  const isAiMode = mode === "ai";

  return (
    <div className="card">
      <h2>{isAiMode ? "AI MODE" : "2 PLAYER MODE"}</h2>

      {!isAiMode && (
        <>
          <button onClick={() => onSelectGrid(4)}>4x4</button>
          <button onClick={() => onSelectGrid(5)}>5x5</button>
          <button onClick={() => onSelectGrid(6)}>6x6</button>
        </>
      )}

      {isAiMode && (
        <>
          <button onClick={() => onSelectDifficulty("easy")}>EASY</button>
          <button onClick={() => onSelectDifficulty("medium")}>MEDIUM</button>
          <button onClick={() => onSelectDifficulty("impossible")}>IMPOSSIBLE</button>
        </>
      )}

      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default GridSelectionPage;
