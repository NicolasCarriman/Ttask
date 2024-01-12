'use client'
import React, { useState, useRef, useEffect } from 'react';
import List from '@app/components/common/list';
import FloatingLabelInput from '@app/components/common/inputLabel';
import { InputComponent } from '@app/components/common';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import './inputSearch.css';

// eslint-disable-next-line no-unused-vars
export type onClickCallBack = (name: string, id?: string) => void;

interface Props {
  data: ItemType[];
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  render: (item: any, arg: onClickCallBack) => React.ReactNode;
  placeHolder: string;
  name?: string;
  type?: 'default' | 'userPicker';
  style?: 'default' | 'slider'
}

function InputSelector({
  data,
  disabled = false,
  render,
  placeHolder,
  style = 'default',
  type = 'default'
}: Props) {
  const [value, setValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(style === "slider" ? 0 : null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDefaultType = type === 'default';
  const handleShow = () => setShowList((state) => !state);
  const selectorConfig: SliderSelector | null = selectedIndex !== null ? {
    selected: data[selectedIndex].name,
    handleClick: () => { setShowList(true) },
    next: () => {
      const nextIndex = selectedIndex + 1;
      const hasNextItem = nextIndex < data.length;
      if(!hasNextItem) return;

      setSelectedIndex(nextIndex);
    },
    prev: () => {
      const prevIndex = selectedIndex - 1;
      const hasPrevItems = prevIndex >= 0;
      if(!hasPrevItems) return;

      setSelectedIndex(prevIndex);
    }
  } : null;

const handleClick = (name: string, id?: string) => {
  if (isDefaultType) {
    setValue(name);
  };
  if (selectorConfig && id) {
    const selectedIndex = data.findIndex((item) => item.id === id);
    if (!data[selectedIndex].name) return;
    setSelectedIndex(selectedIndex);
  };
  setShowList(false);
};

useEffect(() => {
  function handleClickOutside(event: { target: any; }) {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowList(false);
    }
  }

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

return (
  <div className="flex flex-col relative w-full" ref={containerRef}>
    {
      selectorConfig ?
        <SliderSelector config={selectorConfig} />
        :
        <FloatingLabelInput
          placeholder={placeHolder}
          onClick={handleShow}
          value={value}
          onChange={(v) => setValue(v.currentTarget.value)}
          disabled={disabled}
        />
    }
    {showList && (
      <>
        {/* Este div actúa como el overlay. Al hacer clic, se cierra el menú */}
        <div
          className="fixed inset-0 z-[100]  backdrop-brightness-[0.9] transition-all "
          onClick={() => setShowList(false)}
        />
        <List
          key={showList.toString()}
          className={`custom-list-item-spacing ${showList ? 'absolute z-[101] mt-[5.7rem] p-1' : 'hidden'} bg-white w-full`}
          data={data}
          renderedItem={(item) => render(item, handleClick)}
        />
      </>
    )}
    <style jsx>{`
        .custom-list-item-spacing :global(div) {
            margin: 0.05rem 0;
        }
      `}</style>
  </div>
);
}

export default InputSelector;


type ItemType = {
  name: string,
  id: string
}

export interface SliderSelector {
  selected: string;
  index?: number;
  handleClick: (e: React.MouseEvent) => void;
  next(): void;
  prev(): void;
}

interface SlideSelectorProps {
  config: SliderSelector;
}

function SliderSelector({ config }: SlideSelectorProps) {
  const { prev, next, handleClick, selected } = config;
  return (
    <div className='selector-container'>
      <SlArrowLeft onClick={prev} />
      <InputComponent
        value={selected}
        onClick={handleClick}
        onChange={() => { }}
        style={{ cursor: 'pointer' }}
        readOnly
      />
      <SlArrowRight onClick={next} />
    </div>
  );
}