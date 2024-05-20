/* eslint-disable no-unused-vars */
'use client';
import { forwardRef, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { InputComponent, InputProps } from './inputComponent';
import { ListComponent } from './list';

interface ItemType {
  name: string;
  id: string;
}

interface  ISelectBaseProps extends InputProps {
  data:  ItemType[];
  onselect?: (selectedItem: ItemType) => void
}

interface SliderProps extends ISelectBaseProps {
  selectedIndex?: number;
}

const SliderSelectorComponent = forwardRef<HTMLInputElement, SliderProps>(
  (props) => {
    const { data, selectedIndex, onClick, onselect, ...rest } = props;
    const [selected, setSelected] = useState<number | null>(selectedIndex ? selectedIndex : null);
    const [showList, setShowList] = useState<boolean>(false);
  
    function prev() {
      if (data.length <= 0) return;
      const indexOfCurrentSelected = Number(selected);
      let prevIndex = indexOfCurrentSelected - 1;
      if (prevIndex < 0) {
        prevIndex = data.length - 1;
      };
      onselect && onselect(data[prevIndex]);
      setSelected(prevIndex);
    }
  
    function next() {
      if (data.length <= 0) return;
      const indexOfCurrentSelected = Number(selected);
      let nextIndex = indexOfCurrentSelected + 1;
      if (nextIndex > data.length - 1) {
        nextIndex = 0;
      };
      onselect && onselect(data[nextIndex]);

      setSelected(nextIndex);
    }
  
    function handleClick() {
      setShowList((show) => !show);
    }
  
    function handleSelect(selectedItem: ItemType) {
      const currentIndex = data.findIndex(item => selectedItem.id === item.id);
      if (currentIndex === -1) return;
      setSelected(currentIndex);
      onselect && onselect(data[currentIndex]);
      setShowList(false);
    }
  
    return (
      <>
        <div className={`${showList ? 'background' : 'hidden'}`} onClick={() => setShowList(false)} ></div>
        <div className='selector-container'>
          <SlArrowLeft height={'2vh'} onClick={prev} />
          <InputComponent
            onClick={() => handleClick()}
            style={{ cursor: 'pointer' }}
            {...rest}
            readOnly
          />
          <SlArrowRight height={'2vh'} onClick={next} />
          <ListComponent active={showList} data={data} selectitem={handleSelect} />
        </div>
      </>
    );
  }  
);
SliderSelectorComponent.displayName = 'SliderSelect';
export const SliderSelector = SliderSelectorComponent;

interface SelectProps extends ISelectBaseProps {
  data: { id: string, name: string }[];
}

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (props, ref) => {
    const { data, onselect, ...rest } = props;
    const [selected, setSelected] = useState<number | null>(null);
    const [showList, setShowList] = useState<boolean>(false);

    function handleClick() {
      setShowList((show) => !show);
    }

    function handleSelect(selectedItem: ItemType) {
      const currentIndex = data.findIndex(item => selectedItem.id === item.id);
      if (currentIndex === -1) return;
      onselect && onselect(data[currentIndex]);
      setSelected(currentIndex);
      setShowList(false);
    }

    return (
      <>
        <div className={`${showList ? 'background' : 'hidden'}`} onClick={() => setShowList(false)}></div>
        <div className='selector-container'>
          <InputComponent
            ref={ref}
            value={selected !== null ? data[selected].name : ''}
            onClick={() => handleClick()}
            onChange={() => { }}
            style={{ cursor: 'pointer' }}
            {...rest}
            readOnly
          />
          <ListComponent textsize="medium" active={showList} data={data} selectitem={handleSelect} />
        </div>
      </>
    );
  }
);

Select.displayName = 'Select';

export const SelectComponent = Select;
