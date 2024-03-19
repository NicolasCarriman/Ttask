import React, { ReactNode } from 'react';
import '../../app/style/animate.module.css';
import { twMerge } from 'tailwind-merge';
interface StyledWrapperProps {
  children: ReactNode;
  className?: string;
}

//todo: turn this component into high order component

const StyledWrapper: React.FC<StyledWrapperProps> = ({ children, className }) => (
  <div
    className={twMerge(`flex 
    items-center
    w-full 
    gap-4 
    border
    rounded-lg 
    h-auto
    p-[8px]
    bg-gray-50 
    shadow-md
    hover:shadow-lg
    border-gray-300
    transition-all duration-200 
    transform
    hover:translate-y-1 
    z-20
    `, className && className)}
    >
    {children}
  </div>
);

export default StyledWrapper;
