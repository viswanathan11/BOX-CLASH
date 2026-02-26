import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import GameScreen from "./Components/GameScreen";
import GridSelectionPage from "./Components/GridSelectionPage";
import HeroPage from "./Components/HeroPage";

function App() {
  const APP_STORAGE_KEY = "boxCLashAPpState";

  const loadAppState = () => {
    const saved = localStorage.getItem(APP_STORAGE_KEY);
    if (!saved) {
      return null;
    }

    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem(APP_STORAGE_KEY);
      return null;
    }
  };

  const savedAppState = loadAppState();
  const [mode, setMode] = useState(savedAppState?.mode || null);
  const [gridSize, setGridSize] = useState(savedAppState?.gridSize || null);
  const [difficulty, setDifficulty] = useState(savedAppState?.difficulty || null);
  const navigate = useNavigate();

  useEffect(() => {
    const appState = {
      mode,
      gridSize,
      difficulty,
    };

    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(appState));
  }, [mode, gridSize, difficulty]);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    setGridSize(null);
    setDifficulty(null);
    navigate("/select-grid");
  };

  const handleGridSelect = (selectedGridSize) => {
    setDifficulty(null);
    setGridSize(selectedGridSize);
    navigate("/game");
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    const aiGridMap = {
      easy: 6,
      medium: 5,
      impossible: 4,
    };

    setDifficulty(selectedDifficulty);
    setGridSize(aiGridMap[selectedDifficulty]);
    navigate("/game");
  };

  const handleBackToHero = () => {
    setMode(null);
    setGridSize(null);
    setDifficulty(null);
    navigate("/");
  };

  const goHome = () => {
    localStorage.removeItem(APP_STORAGE_KEY);
    setMode(null);
    setGridSize(null);
    setDifficulty(null);
    navigate("/");
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HeroPage onSelectMode={handleModeSelect} />} />

        <Route
          path="/select-grid"
          element={
            mode ? (
              <GridSelectionPage
                mode={mode}
                onSelectGrid={handleGridSelect}
                onSelectDifficulty={handleDifficultySelect}
                onBack={handleBackToHero}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/game"
          element={
            mode && gridSize ? (
              <GameScreen
                gridSize={gridSize}
                mode={mode}
                difficulty={difficulty}
                goHome={goHome}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
