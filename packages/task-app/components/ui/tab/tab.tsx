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
  const [selected, setSelected] = React.useState<string | null>(selectedId);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  function displayIndicator(element: HTMLLIElement) {
    if (!indicatorRef.current) return;
    const moveX = element.offsetLeft;
    const width = element.offsetWidth;

    indicatorRef.current.style.transform = `translateX(${moveX}px)`;
    indicatorRef.current.style.width = width + 'px';
  }

  function handleClick(e: React.MouseEvent<HTMLLIElement>, item: ItemType) {
    displayIndicator(e.currentTarget);
    onselect(e, item);
    setSelected(item.id);
    onClick && onClick(e);
  }

  React.useEffect(() => {
    if (ulRef.current) {
      const liElements = Array.from(ulRef.current.children) as Array<HTMLLIElement>;
      displayIndicator(liElements[1]);
    }
  }, []);

  return (
    <ul ref={ulRef} id='tabNavigator' className='tt-flex-row g-l relative'>
      <span ref={indicatorRef} className='indicator'></span>
      {
        props.labels.map((label) => (
          <li className='p-s' key={label.content + getRandomId()} onClick={(e) => handleClick(e, label)} {...rest}>
            <p className={`txt-bold txt-gray-6 unselectable ${selected === label.id ? 'tab-active' : 'tab-content'}`}>{label.content}</p>
          </li>
        ))
      }
    </ul>
  );
}

export default TabNavigator;
