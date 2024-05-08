'use client';
import { HTMLAttributes, useEffect, useRef } from 'react';
import './style.scss';
import { twMerge } from 'tailwind-merge';

export const TextBox: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={textRef}
      className={twMerge(`
      p-2 
      text-white 
      z-10 
      rounded-lg 
      transition-all 
      text-sm duration-500 
      bg-blue-200
      max-w-[100%]
      outline-none 
      `, className)
      }
      autoFocus
      contentEditable={true} {...rest} />
  );
};

interface TextBoxProps extends HTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const FloatTextBox: React.FC<TextBoxProps> = (props) => {

  return (
    <section className='tt-flex-col g-m'>
      <label className='txt-gray-6'>{props.label}</label>
      <textarea className='tt-text-box' {...props}></textarea>
    </section>
  );
};