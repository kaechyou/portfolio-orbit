import React from 'react';

interface CloseButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  ariaLabel?: string;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick, className = '', ariaLabel = 'Close' }) => {
  const baseClasses = `btn-base ${className}`.trim();

  return (
    <button className={baseClasses} onClick={onClick} aria-label={ariaLabel}>
      ✕
    </button>
  );
};
