import { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import HealthBar from '../components/game/HealthBar';
import IconSlot from '../components/ui/IconSlot';
import styles from './GameScene.module.css';

export default function GameScene() {
  const { currentScene, stats, showReflection, isTransitioning, makeChoice } = useGame();
  const [isPulsing, setIsPulsing] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    setIsPulsing(true);
    const t = setTimeout(() => setIsPulsing(false), 500);
    return () => clearTimeout(t);
  }, [stats]);

  if (!currentScene) return null;

  const handleChoice = (choice) => {
    if (isTransitioning) return;
    makeChoice({ ...choice, _fromSceneId: currentScene.id });
  };

  const fading = isTransitioning ? styles.fadingOut : '';

  return (
    <div className={styles.scene}>
      {/* Week label */}
      <p className={styles.weekLabel}>{currentScene.week}</p>

      {/* Health ring with pulse on stat change */}
      <div className={`${styles.ringWrapper} ${isPulsing ? styles.pulsing : ''}`}>
        <HealthBar stats={stats} />
      </div>

      {/* Prompt area — fades out on transition */}
      <div className={`${styles.promptArea} ${fading}`}>
        <div className={styles.iconAccent}>
          <IconSlot name={currentScene.icon} size={78} />
        </div>
        <p key={currentScene.id} className={styles.promptText}>
          {currentScene.prompt}
        </p>
      </div>

      {/* Choices — fades out on transition */}
      <div className={`${styles.choices} ${fading}`}>
        {currentScene.choices.map((choice, i) => (
          <button
            key={choice.label}
            className={styles.choiceBtn}
            style={{ animationDelay: `${i * 80}ms` }}
            onClick={() => handleChoice(choice)}
            disabled={isTransitioning}
          >
            {choice.label}
          </button>
        ))}
      </div>

      {/* Spinner: visible only during the brief window before reflection appears */}
      {isTransitioning && !showReflection && (
        <div className={styles.spinnerWrap}>
          <div className={styles.spinner} />
        </div>
      )}

      {/* Reflection toast */}
      {showReflection && (
        <div className={styles.reflection} role="status">
          ✦ {showReflection}
        </div>
      )}
    </div>
  );
}
