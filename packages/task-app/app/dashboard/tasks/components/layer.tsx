import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import './style.css';
//hacer componente layer box

interface BoxComponentProps extends ComponentProps<'div'> {

}

export const BoxComponent: React.FC<BoxComponentProps> = ( { className, children, ...rest } ) => {
  return (
    <div
      className={twMerge(`
        bg-white 
        shadow-custom 
        rounded-2xl
      `, className)}
      { ...rest }
    >
      { children }
    </div>
  );
};

function Layer(
  props : ComponentProps<'div'>
  ){

  return (
    <div
      className='task-layer'
    >
      { props.children }
    </div>
  );
}

export default Layer;
