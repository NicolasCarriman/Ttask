import React from 'react';
import './style.css';
import RoundedBox from '@app/components/common/box';
import { SlArrowDown } from 'react-icons/sl';

interface Props {
  label: string;
  children: React.ReactNode;
  showContent: boolean;
  // eslint-disable-next-line no-unused-vars
  handleShow(id:string): void;
  id: string;
}

function Accordion(props: Props) {
  const { label, children, id, handleShow, showContent } = props;

  return (
    <RoundedBox className='accordion-container'>
      <header className='accordion-header' onClick={() => handleShow(id)}>
        <SlArrowDown className={ showContent ? 'accordion-active' : 'accordion-desactive'} />
        <h3>{label}</h3>
      </header>
      <div className={showContent ? 'accordion-visible' : 'accordion-hide'}>
        {
          children
        }
      </div>
    </RoundedBox>
  );
}

export default Accordion;
