import React, { ComponentProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import './list.css';

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
  selectitem?: (e: React.MouseEvent<HTMLLIElement>, item: { id: string; name: string; } ) => void;
}

export const ListComponent: React.FC<Props> = (props) => {
  const { data, active, selectitem } = props;

  return (
    <ul className={`tt-ul ${active ? 'dis-active' : 'dis-none'} p-s shadow-m tt-box`} >
      {
        data.map((item) => (
          <li className='tt-li ' key={item.id} onClick={(e) =>selectitem && selectitem(e, item)}  {...props}>
            <p className='txt-gray-500'>
              {item.name}
            </p>
          </li>
        ))
      }
    </ul>
  );
}
