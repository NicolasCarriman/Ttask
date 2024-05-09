/* eslint-disable no-unused-vars */
'use client';
import React, { useRef } from 'react';
import './tab.scss';
import { getRandomId } from '@app/utils';

type ItemType = {
  content: string,
  id: string
}

interface Props extends React.ComponentProps<'li'> {
  labels: ItemType[];
  onselect: (e: React.MouseEvent<HTMLLIElement>, item: ItemType) => void;
  selectedId?: string;
}

function TabNavigator(props: Props) {
  const { onClick, selectedId = null, onselect, ...rest } = props;
  const [ selected,  setSelected ] = React.useState<string | null>(selectedId);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  function displayIndicator(e: React.MouseEvent<HTMLLIElement>) {
    if (!indicatorRef.current) return;
    const target = e.currentTarget;
    const moveX = target.offsetLeft;
    const width = target.offsetWidth;

    indicatorRef.current.style.transform = `translateX(${moveX}px)`;
    indicatorRef.current.style.width = width + 'px';
  }

  function handleClick(e: React.MouseEvent<HTMLLIElement>, item: ItemType) {
    displayIndicator(e);
    onselect(e, item);
    setSelected(item.id);
    onClick && onClick(e);
  }

  return (
    <header className='tab-container'>
      <ul className='tt-flex-row g-l relative'>
        <span ref={indicatorRef} className='indicator'></span>
        {
          props.labels.map((label) => (
            <li className='p-s' key={label.content + getRandomId()} onClick={(e) => handleClick(e, label)} {...rest}>
              <p className={`txt-bold unselectable ${selected === label.id ? '' : 'txt-gray-6'}`}>{label.content}</p>
            </li>
          ))
        }
      </ul>
    </header>
  );
}

export default TabNavigator;
