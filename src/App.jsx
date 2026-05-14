import { Routes, Route } from 'react-router-dom';
import { GameProvider, useGame } from './context/GameContext';
import ParticleCanvas from './components/ui/ParticleCanvas';
import GameShell from './components/layout/GameShell';
import MainMenu from './scenes/MainMenu';
import GameScene from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';
import FinalScene from './scenes/FinalScene';
import SandboxPage from './scenes/SandboxPage';

function GameContent() {
  const { currentSceneId, isGameOver, isFinalScene } = useGame();

  let content;
  if (currentSceneId === null) {
    content = <MainMenu />;
  } else if (isFinalScene) {
    content = <FinalScene />;
  } else if (isGameOver) {
    content = <GameOverScene />;
  } else {
    content = <GameScene />;
  }

  return (
    <>
      <ParticleCanvas />
      <GameShell>{content}</GameShell>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <GameProvider>
            <GameContent />
          </GameProvider>
        }
      />
      <Route path="/sandbox" element={<SandboxPage />} />
    </Routes>
  );
}
