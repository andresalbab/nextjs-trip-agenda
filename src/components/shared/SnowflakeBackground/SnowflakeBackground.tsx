'use client';

import { useEffect } from 'react';
import styles from './SnowflakeBackground.module.css';

export function SnowflakeBackground(): JSX.Element {
  useEffect(() => {
    const container = document.getElementById('snowContainer');
    if (!container) return;

    // Create 30 snowflakes
    for (let i = 0; i < 30; i++) {
      const div = document.createElement('div');
      div.className = styles.snowflake;
      div.innerText = '❄';
      div.style.left = Math.random() * 100 + '%';
      div.style.fontSize = Math.random() * 10 + 10 + 'px';
      div.style.animationDuration = Math.random() * 5 + 5 + 's';
      div.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(div);
    }

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div id="snowContainer" className={styles.snowContainer} />;
}

