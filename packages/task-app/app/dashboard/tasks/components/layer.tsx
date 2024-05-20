import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import './style.css';
import ContextProvider from '../../context/provider';
//hacer componente layer box

interface BoxComponentProps extends ComponentProps<'div'> {

}

export const BoxComponent: React.FC<BoxComponentProps> = ({ className, children, ...rest }) => {
  return (
    <div
      className={twMerge(`
        bg-white 
        shadow-custom 
        rounded-2xl
      `, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

function Layer(
  props: ComponentProps<'div'>
) {

  return (
    <ContextProvider>
      <div
        className='container tt-grid-column tt-box shadow-m gray-6'
      >
        {props.children}
      </div>
    </ContextProvider>
  );
}

export default Layer;
