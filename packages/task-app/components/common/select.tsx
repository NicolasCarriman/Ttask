/* eslint-disable no-unused-vars */
'use client';
import { forwardRef, useEffect, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { InputComponent, InputProps } from './inputComponent';
import { ListComponent } from './list';
import { Control, FieldValues, useController } from 'react-hook-form';

interface ItemType {
  name: string;
  id: string;
}

interface  ISelectBaseProps extends InputProps {
  data:  ItemType[];
  onselect?: (selectedItem: ItemType) => void;
  selectedIndex?: number;
}

const SliderSelectorComponent = forwardRef<HTMLInputElement, ISelectBaseProps>(
  (props, ref) => {
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
            ref={ref}
            onClick={() => handleClick()}
            style={{ cursor: 'pointer' }}
            value={selected ? data[selected].name : ''}
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

const Select = forwardRef<HTMLInputElement, ISelectBaseProps>(
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
      setSelected(currentIndex);
      setShowList(false);
      onselect && onselect(data[currentIndex]);
    }

    return (
      <>
        <div className={`${showList ? 'background' : 'hidden'}`} onClick={() => setShowList(false)}></div>
        <div className='selector-container'>
          <InputComponent
            ref={ref}
            onClick={handleClick}
            value={selected !== null ? data[selected].name : ''}
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

interface IControlledComponent extends ISelectBaseProps {
  control: Control<FieldValues>;
  name: string;
}

function WithControlledComponent(Wrapped: React.ComponentType<ISelectBaseProps>) {

  const EnchantedComponent = ({ onselect, name, control, ...rest }: IControlledComponent) => {
    const { field } = useController({ name: name, control: control });

    function handleSelect(item: ItemType) {
      onselect && onselect(item);
      console.log(item.name);
      field.onChange(item.name);
    }

    return (
      <Wrapped onselect={handleSelect} { ...field } {...rest} ></Wrapped>
    );
  }

  return EnchantedComponent;
}

export default WithControlledComponent;

export const ControlledSelect = WithControlledComponent(SelectComponent);
export const ControlledSliderSelect = WithControlledComponent(SliderSelector);
