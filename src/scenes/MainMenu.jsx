import { useState } from 'react';
import { useGame } from '../context/GameContext';
import HealthBar from '../components/game/HealthBar';
import titleGraphic from '../assets/icons/title-before-it-breaks.png';
import styles from './MainMenu.module.css';

const PREVIEW_STATS = { social: 5, mental: 5, physical: 5 };

export default function MainMenu() {
  const { startGame } = useGame();
  const [titleFailed, setTitleFailed] = useState(false);
  const [phase, setPhase] = useState('splash');

  const titleImg = titleFailed ? (
    <h1 className={styles.titleFallback}>Before It Breaks</h1>
  ) : (
    <img
      src={titleGraphic}
      alt="Before It Breaks"
      className={styles.titleImg}
      style={{ transform: 'translate(-210px, 0px)' }}
      onError={() => setTitleFailed(true)}
    />
  );

  if (phase === 'splash') {
    return (
      <div className={styles.splash}>
        {titleImg}
        <button className={styles.enterBtn} onClick={() => setPhase('main')}>
          click to enter
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.preview}>
        <HealthBar stats={PREVIEW_STATS} />
      </div>

      <p className={styles.description}>
        Navigate a simulated semester where every choice affects your stress,
        energy, relationships, and sense of self.{' '}
        <em>This isn't a game about winning. It's a mirror.</em>
      </p>

      <button className={styles.startBtn} onClick={startGame}>
        Enter the Semester
      </button>

      <p className={styles.note}>~ 10 minutes · 8 decisions · no right answers ~</p>
    </div>
  );
}
