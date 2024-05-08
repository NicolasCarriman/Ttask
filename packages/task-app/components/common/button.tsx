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
  ...rest
}: Props) {

  const variantStyle: Record<Required<Props>['variant'], string> = {
    'primary': `btn btn-primary btn-${size}`,
    'secondary': `btn btn-secondary btn-${size}`
  }

  return (
    <button
    className={variantStyle[variant]}
    {...rest}
  >
    {label && label}
  </button>
  );
}

export default ButtonComponent;
