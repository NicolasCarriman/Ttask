import RoundedBox from '@app/components/common/box';
import React from 'react';
import './page.css';

function Test() {
  return (
    <section className='test-section'>
      <RoundedBox>
        <header className='step-displayer'>
          <ul className='step-ul'>
            <li className='li-active' id='step-1'>
              
            </li>
            <li id='step-2'>

            </li>
            <li id='step-3'>

            </li>
          </ul>
        </header>
        <span className='tt-divider'></span>
        <main></main>
      </RoundedBox>
    </section>
  );
}

export default Test;
