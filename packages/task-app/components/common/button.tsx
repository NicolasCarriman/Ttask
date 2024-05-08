import React, { MouseEventHandler } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  label?: string;
}

function ButtonComponent({
  size,
  variant = 'primary',
  label,
  children,
  ...rest
}: Props) {

  const variantStyle: Record<Required<Props>['variant'], string> = {
    'primary': `tt-btn-primary btn-${size}`,
    'secondary': `btn btn-secondary btn-${size}`
  }

  return (
    <button
    className={variantStyle[variant]}
    {...rest}
  >
    {label && label}
    {children && children}
  </button>
  );
}

export default ButtonComponent;
