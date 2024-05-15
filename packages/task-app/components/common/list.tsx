import React, { ComponentProps, HTMLAttributes, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import './list.scss';
import { InputComponent } from './inputComponent';
import { HiChevronDown } from "react-icons/hi2";
import {  IUseCheckList } from '@app/hooks/useList';

interface ListProps extends HTMLAttributes<HTMLDivElement> {
  data: { id: string, name: string }[];
  renderedItem: (item: any) => React.ReactNode;
  className?: string;
}

function List({
  data,
  renderedItem,
  className,
  ...rest
}: ListProps) {

  return (
    <div
      {...rest}
      className={twMerge(`
      rounded-lg 
      shadow-md  
      border 
      border-gray-300 
      w-70
      overflow-y-hidden
      bg-white  
      `, className && className)}>
      {
        data.map((item, index) => (
          <div key={index} className="py-2 mt-1 border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
            {renderedItem(item)}
          </div>
        ))
      }
    </div>
  );
}

export default List;

interface Props extends ComponentProps<'li'> {
  data: { id: string; name: string; }[];
  active: boolean;
  selectitem?: (item: { id: string; name: string; }) => void;
  textsize?: 'small' | 'medium' | 'large';
}

export const ListComponent: React.FC<Props> = (props) => {
  const { data, active, selectitem, textsize = 'medium' } = props;

  const textSizes = {
    'small': 'txt-s',
    'medium': 'txt-m',
    'large': 'txt-l'
  }

  return (
    <ul className={`tt-ul ${active ? 'dis-active' : 'dis-none'} p-s shadow-m tt-box`} >
      {
        data.map((item) => (
          <li className='tt-li ' key={item.id} onClick={(e) => selectitem && selectitem(item)}  {...props}>
            <p className={`txt-gray-500 ${textSizes[textsize]}`}>
              {item.name}
            </p>
          </li>
        ))
      }
    </ul>
  );
}

type CheckListBase = React.ComponentProps<'li'> & IUseCheckList;

export interface CheckableListProps extends CheckListBase {
  label: string;
}

export const CheckableList = (props: CheckableListProps) => {
  const { checkList, selectItem, label } = props;
  const [ inputValue, setInputValue ] = React.useState("");
  const [active, setActive] = React.useState(false);

  function onclick(e: React.MouseEvent<HTMLLIElement>, item: { id: string, name: string, selected: boolean }) {
    selectItem && selectItem(item);
    props.onClick && props.onClick(e);
  }

  useEffect(() => {
    function fillInputValue(list: IUseCheckList['checkList']) {
      if (!list) return;
      const onlySelected = list.filter((item) => item.selected === true);

      if (onlySelected.length < 1) {
        setInputValue('');
        return;
      };

      setInputValue(onlySelected[onlySelected.length - 1].name);
    }

    fillInputValue(checkList);
  }, [checkList])

  return (
    <>
      <div className={`${active ? 'background' : 'hidden'}`} onClick={() => setActive(false)} ></div>
      <div className='check-list-container'>
        <InputComponent icon={<HiChevronDown />} className='txt-gray-5 tt_input pointer' placeholder={label} value={inputValue} onClick={() => setActive(true)} readOnly />
        <ul className={`tt-ul ${active ? 'dis-active' : 'dis-none'} p-s shadow-m tt-box`} >
          {
            checkList &&
            checkList.map((item) => (
              <li className='tt-li-check' key={item.id} onClick={(e) => onclick(e, item)}  {...props}>
                <input id={item.id} type='checkbox' checked={item.selected} readOnly></input>
                <p className='txt-gray-6 unselectable'>
                  {item.name}
                </p>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  );
}