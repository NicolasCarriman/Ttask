import React from 'react';

interface RoundedBoxProps {
  children: React.ReactNode;
  className?: string;
}

function RoundedBox({ children, className }: RoundedBoxProps) {
  return (
    <div
      className={`tt-box ${className && className}`}
    >
      { children }
    </div>
  );
}

export default RoundedBox;
