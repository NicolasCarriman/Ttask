import React, { useState } from 'react';
import './style.css';
import RoundedBox from '@app/components/common/box';
import { SlArrowDown } from "react-icons/sl";

interface Props {
  label: string;
  children: React.ReactNode;
  showContent: boolean;
  handleShow(id:string): void;
  id: string;
}

function Accordion(props: Props) {
  const { label, children, id, handleShow, showContent } = props;
  console.log(showContent)

  return (
    <RoundedBox className='accordion-container'>
      <header className='accordion-header'>
        <SlArrowDown className={ showContent ? 'accordion-active' : 'accordion-desactive'} onClick={() => handleShow(id)} />
        <h3>{label}</h3>
      </header>
      <div className={showContent ? 'accordion-visible' : 'accordion-hide'}>
        {
          children
        }
      </div>
    </RoundedBox>
  )
}

export default Accordion;
