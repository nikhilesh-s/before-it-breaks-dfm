import styles from './GameShell.module.css';

export default function GameShell({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {children}
      </div>
    </div>
  );
}
