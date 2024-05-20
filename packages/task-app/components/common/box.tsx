import React from 'react';

interface RoundedBoxProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

function RoundedBox({ children, className, id }: RoundedBoxProps) {
  return (
    <div
      id={id}
      className={`tt-box shadow-m ${className && className}`}
    >
      { children }
    </div>
  );
}

export default RoundedBox;
