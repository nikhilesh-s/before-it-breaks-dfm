import styles from './HealthBar.module.css';

const ARC_ORDER = ['mental', 'social', 'physical'];

function getArcFile(stat, value) {
  if (value === 0) return `${stat}-arc-empty.PNG`;
  if (value === 5) return `${stat}-arc-full.PNG`;
  return `${stat}-arc-${value}.PNG`;
}

const STAT_COLORS = {
  social:   '#B7E3FF',
  mental:   '#FFD1BD',
  physical: '#FEE188',
};

const STAT_LABELS = {
  social:   'Social',
  mental:   'Mental',
  physical: 'Physical',
};

/**
 * Props:
 *   stats        — { social: 0–5, mental: 0–5, physical: 0–5 }
 *   debug        — boolean, adds red outline to ring + arc imgs
 *   arcRotations — optional { social, mental, physical } in degrees for fine-tuning
 *   centerOffset — optional { x, y } pixel offset from the ring center
 */
export default function HealthBar({ stats, debug = false, arcRotations = {}, centerOffset = { x: -5, y: -3 } }) {
  return (
    <div className={styles.wrapper}>
      {/* Ring */}
      <div className={`${styles.ring} ${debug ? styles.debug : ''}`}>
        {ARC_ORDER.map((stat) => {
          const file = getArcFile(stat, stats[stat]);
          const rotation = arcRotations[stat] ?? 0;
          return (
            <img
              key={stat}
              className={`${styles.arc} ${debug ? styles.debugArc : ''}`}
              src={`/assets/health-bar/${file}`}
              alt={`${STAT_LABELS[stat]} arc, level ${stats[stat]}`}
              style={rotation !== 0 ? { transform: `rotate(${rotation}deg)` } : undefined}
            />
          );
        })}

        {/* Center avatar slot */}
        <div
          className={styles.center}
          style={{
            transform: `translate(calc(-50% + ${centerOffset.x}px), calc(-50% + ${centerOffset.y}px))`,
          }}
        >
          <img
            src="/assets/icons/logo-dfm-main.png"
            alt="DFM logo"
            className={styles.centerLogo}
            onError={(e) => {
              // Try uppercase extension fallback
              if (!e.currentTarget.src.includes('.PNG')) {
                e.currentTarget.src = '/assets/icons/logo-dfm-main.PNG';
              }
            }}
          />
        </div>
      </div>

      {/* Stat labels */}
      <div className={styles.labels}>
        {['social', 'mental', 'physical'].map((stat) => (
          <span
            key={stat}
            className={styles.label}
            style={{ backgroundColor: STAT_COLORS[stat] }}
          >
            {STAT_LABELS[stat]} {stats[stat]}
          </span>
        ))}
      </div>
    </div>
  );
}
