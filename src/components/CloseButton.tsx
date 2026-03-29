import React from 'react';
import styles from './CloseButton.module.css';

interface CloseButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  ariaLabel?: string;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className = '', ariaLabel = 'Close' }) => (
  <button className={`${styles.btn} ${className}`.trim()} onClick={onClick} aria-label={ariaLabel}>
    ✕
  </button>
);
