function HeroPage({ onSelectMode }) {
  return (
    <div className="card">
      <h1>BOX CLASH</h1>
      <button onClick={() => onSelectMode("2p")}>2 PLAYER</button>
      <button onClick={() => onSelectMode("ai")}>AI MODE</button>
    </div>
  );
}

export default HeroPage;
