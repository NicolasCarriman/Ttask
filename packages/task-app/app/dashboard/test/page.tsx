import RoundedBox from '@app/components/common/box';
import React from 'react';
import './page.css';


async function getLocations(query: string) {
  const input = query;
  const inputType = 'textquery';

  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=${inputType}&key=${"AIzaSyD0_ge9d2Ee5X4p2Bq7DIACs6rUMHGsmUE"}`;
  const request = new Request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    body: null
  });

  const response = fetch(request).then(r => r.json());
  return response;
}

async function Test() {
  const myData = await getLocations('argentina');
  console.log(myData);
  return (
    <section className='test-section'>
      {JSON.stringify(myData)}
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
