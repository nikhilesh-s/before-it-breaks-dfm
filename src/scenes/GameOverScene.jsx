import { useGame } from '../context/GameContext';
import HealthBar from '../components/game/HealthBar';
import styles from './GameOverScene.module.css';

export default function GameOverScene() {
  const { stats, restartGame } = useGame();

  return (
    <div className={styles.page}>
      <HealthBar stats={stats} />

      <h2 className={styles.heading}>You were running on empty.</h2>

      <p className={styles.body}>
        Something ran out before the semester did.
        That happens to more people than you know.
        It doesn't mean you failed — it means you were carrying too much.
      </p>

      <button className={styles.btn} onClick={restartGame}>
        Try Again
      </button>

      <p className={styles.note}>What would you do differently?</p>
    </div>
  );
}
