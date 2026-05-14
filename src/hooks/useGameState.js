import { useState, useCallback, useRef } from 'react';
import { SCENES } from '../data/gameScript';

const INITIAL_STATS = { social: 5, mental: 5, physical: 5 };

export function useGameState() {
  const [currentSceneId, setCurrentSceneId] = useState(null);
  const [stats, setStats]               = useState({ ...INITIAL_STATS });
  const [history, setHistory]           = useState([]);
  const [showReflection, setShowReflection] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const currentScene = SCENES.find(s => s.id === currentSceneId) ?? null;

  const isGameOver = !isTransitioning
    && currentSceneId !== null
    && (stats.social === 0 || stats.mental === 0 || stats.physical === 0);

  const isFinalScene = currentScene !== null && currentScene.choices.length === 0;

  const startGame = useCallback(() => {
    clearTimers();
    setCurrentSceneId('course_registration');
    setStats({ ...INITIAL_STATS });
    setHistory([]);
    setShowReflection(null);
    setIsTransitioning(false);
  }, []);

  const makeChoice = useCallback((choice) => {
    clearTimers();
    setIsTransitioning(true);

    const t1 = setTimeout(() => {
      setStats(prev => ({
        social:   Math.max(0, Math.min(5, prev.social   + (choice.effects.social   ?? 0))),
        mental:   Math.max(0, Math.min(5, prev.mental   + (choice.effects.mental   ?? 0))),
        physical: Math.max(0, Math.min(5, prev.physical + (choice.effects.physical ?? 0))),
      }));
      setHistory(prev => [...prev, {
        sceneId:     choice._fromSceneId,
        choiceLabel: choice.label,
        effects:     choice.effects,
        reflection:  choice.reflection,
      }]);
      setShowReflection(choice.reflection);
    }, 300);

    const t2 = setTimeout(() => {
      setShowReflection(null);
      setCurrentSceneId(choice.nextScene);
      setIsTransitioning(false);
    }, 2800);

    timers.current = [t1, t2];
  }, []);

  const restartGame = useCallback(() => {
    clearTimers();
    setCurrentSceneId(null);
    setStats({ ...INITIAL_STATS });
    setHistory([]);
    setShowReflection(null);
    setIsTransitioning(false);
  }, []);

  return {
    currentSceneId,
    currentScene,
    stats,
    history,
    showReflection,
    isTransitioning,
    isGameOver,
    isFinalScene,
    startGame,
    makeChoice,
    restartGame,
  };
}
