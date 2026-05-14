import { useState } from 'react';
import HealthBar from '../components/game/HealthBar';
import styles from './SandboxPage.module.css';

const STATS = ['social', 'mental', 'physical'];

const STAT_COLORS = {
  social:   '#B7E3FF',
  mental:   '#FFD1BD',
  physical: '#FEE188',
};

const INITIAL = { social: 5, mental: 5, physical: 5 };
const INITIAL_OFFSET = { x: 0, y: 0 };

export default function SandboxPage() {
  const [stats, setStats]   = useState(INITIAL);
  const [debug, setDebug]   = useState(false);

  const [arcRotations, setArcRotations] = useState({ social: 0, mental: 0, physical: 0 });
  const [showRotationControls, setShowRotationControls] = useState(false);

  const [centerOffset, setCenterOffset] = useState(INITIAL_OFFSET);
  const [showIconControls, setShowIconControls] = useState(false);

  const adjust = (stat, delta) => {
    setStats(prev => ({
      ...prev,
      [stat]: Math.max(0, Math.min(5, prev[stat] + delta)),
    }));
  };

  const setOffset = (axis, value) => {
    setCenterOffset(prev => ({ ...prev, [axis]: Number(value) }));
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Health Bar Test</h1>

      <HealthBar
        stats={stats}
        debug={debug}
        arcRotations={arcRotations}
        centerOffset={centerOffset}
      />

      {/* ── Stat controls ─────────────────────────────── */}
      <div className={styles.grid}>
        {STATS.map((stat) => (
          <div key={stat} className={styles.row}>
            <button
              className={styles.btn}
              style={{ '--accent': STAT_COLORS[stat] }}
              onClick={() => adjust(stat, -1)}
              disabled={stats[stat] === 0}
            >
              {stat.charAt(0).toUpperCase() + stat.slice(1)} −
            </button>
            <button
              className={styles.btn}
              style={{ '--accent': STAT_COLORS[stat] }}
              onClick={() => adjust(stat, 1)}
              disabled={stats[stat] === 5}
            >
              {stat.charAt(0).toUpperCase() + stat.slice(1)} +
            </button>
          </div>
        ))}
      </div>

      {/* ── Debug toolbar ─────────────────────────────── */}
      <div className={styles.debugBar}>
        <button
          className={`${styles.btn} ${debug ? styles.btnActive : ''}`}
          onClick={() => setDebug(d => !d)}
        >
          {debug ? 'Hide' : 'Show'} Debug Outline
        </button>

        <button
          className={`${styles.btn} ${showIconControls ? styles.btnActive : ''}`}
          onClick={() => setShowIconControls(v => !v)}
        >
          {showIconControls ? 'Hide' : 'Show'} Icon Position
        </button>

        <button
          className={`${styles.btn} ${showRotationControls ? styles.btnActive : ''}`}
          onClick={() => setShowRotationControls(r => !r)}
        >
          {showRotationControls ? 'Hide' : 'Show'} Arc Rotation
        </button>

        <button
          className={styles.btn}
          onClick={() => { setStats(INITIAL); setCenterOffset(INITIAL_OFFSET); }}
        >
          Reset All
        </button>
      </div>

      {/* ── Center icon position controls ─────────────── */}
      {showIconControls && (
        <div className={styles.rotationPanel}>
          <p className={styles.rotationNote}>
            Offset the center icon from the ring midpoint (px)
          </p>

          {[
            { axis: 'x', label: 'X', hint: '← left / right →' },
            { axis: 'y', label: 'Y', hint: '↑ up / down ↓' },
          ].map(({ axis, label, hint }) => (
            <label key={axis} className={styles.rotationRow}>
              <span style={{ color: '#5D8E67', minWidth: 16 }}>{label}</span>
              <span className={styles.rotationNote} style={{ flex: 'none' }}>{hint}</span>
              <input
                type="range"
                min="-80"
                max="80"
                step="1"
                value={centerOffset[axis]}
                onChange={(e) => setOffset(axis, e.target.value)}
              />
              <span className={styles.rotationValue}>{centerOffset[axis]}px</span>
              <button
                className={styles.btnSmall}
                onClick={() => setOffset(axis, 0)}
              >
                0
              </button>
            </label>
          ))}

          <button
            className={styles.btnSmall}
            style={{ alignSelf: 'center', marginTop: 4 }}
            onClick={() => setCenterOffset(INITIAL_OFFSET)}
          >
            Reset to center
          </button>
        </div>
      )}

      {/* ── Per-arc rotation fine-tune ─────────────────── */}
      {showRotationControls && (
        <div className={styles.rotationPanel}>
          <p className={styles.rotationNote}>
            Adjust arc rotation (°) if PNGs don't align at 0°
          </p>
          {STATS.map((stat) => (
            <label key={stat} className={styles.rotationRow}>
              <span style={{ color: STAT_COLORS[stat] }}>
                {stat.charAt(0).toUpperCase() + stat.slice(1)}
              </span>
              <input
                type="range"
                min="-180"
                max="180"
                step="1"
                value={arcRotations[stat]}
                onChange={(e) =>
                  setArcRotations(prev => ({
                    ...prev,
                    [stat]: Number(e.target.value),
                  }))
                }
              />
              <span className={styles.rotationValue}>{arcRotations[stat]}°</span>
              <button
                className={styles.btnSmall}
                onClick={() =>
                  setArcRotations(prev => ({ ...prev, [stat]: 0 }))
                }
              >
                0°
              </button>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
