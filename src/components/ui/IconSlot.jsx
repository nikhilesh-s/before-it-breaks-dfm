import { useState } from 'react';
import logoMain    from '../../assets/icons/logo-dfm-main.png';
import logoScissors from '../../assets/icons/logo-scissors.png';
import logoGlue    from '../../assets/icons/logo-glue.png';
import logoPencil  from '../../assets/icons/logo-pencil.png';
import logoNotebook from '../../assets/icons/logo-notebook.png';
import titleGraphic from '../../assets/icons/title-before-it-breaks.png';
import styles from './IconSlot.module.css';

const iconMap = {
  logo:     logoMain,
  scissors: logoScissors,
  glue:     logoGlue,
  pencil:   logoPencil,
  notebook: logoNotebook,
  title:    titleGraphic,
};

const emojiHint = {
  pencil:   '✏️',
  notebook: '📓',
  scissors: '✂️',
  glue:     '🧴',
  logo:     '🌱',
  title:    '📖',
};

export default function IconSlot({ name, size = 44, onImageError }) {
  const [failed, setFailed] = useState(false);
  const src = iconMap[name];

  if (!src || failed) {
    return (
      <div
        className={styles.placeholder}
        style={{ width: size, height: size }}
        aria-label={name}
      >
        <span>{emojiHint[name] ?? '?'}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className={styles.icon}
      style={{ width: size, height: size }}
      onError={() => { setFailed(true); onImageError?.(); }}
    />
  );
}
