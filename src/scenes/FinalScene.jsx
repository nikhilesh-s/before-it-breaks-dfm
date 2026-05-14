import { useGame } from '../context/GameContext';
import HealthBar from '../components/game/HealthBar';
import styles from './FinalScene.module.css';

const STAT_COLORS = {
  social:   '#B7E3FF',
  mental:   '#FFD1BD',
  physical: '#FEE188',
};

export default function FinalScene() {
  const { currentScene, stats, restartGame } = useGame();

  return (
    <div className={styles.page}>
      <p className={styles.weekLabel}>End of Semester</p>

      <HealthBar stats={stats} />

      <p className={styles.prompt}>{currentScene.prompt}</p>

      <hr className={styles.rule} />

      <div className={styles.statRow}>
        {['social', 'mental', 'physical'].map(stat => (
          <span
            key={stat}
            className={styles.statBadge}
            style={{ background: STAT_COLORS[stat] }}
          >
            {stat.charAt(0).toUpperCase() + stat.slice(1)}: {stats[stat]}/5
          </span>
        ))}
      </div>

      <p className={styles.reflectionPrompt}>
        What would you carry differently next time?
      </p>

      <button className={styles.btn} onClick={restartGame}>
        Begin Again
      </button>

      <p className={styles.footer}>Dear Future Me · Before It Breaks</p>
    </div>
  );
}
