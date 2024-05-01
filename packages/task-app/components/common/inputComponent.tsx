'use-client';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import React, { ChangeEvent, InputHTMLAttributes, useEffect, useState } from 'react';
import './inputComponent.css';
import List, { ListComponent } from "./list";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const InputComponent: React.FC<InputProps> = (props) => {
  return (
    <fieldset className='tt_input-field'>
      {
        props.icon && props.icon
      }
      <input className="tt_input" {...props} />
    </fieldset>
  );
};

interface FloatInputProps extends Omit<InputProps, 'icon'> {
  label: string;
}

export const FloatInput: React.FC<FloatInputProps> = (props) => {
  const [value, setValue] = useState<string>(props.value && props.type === 'text' ? props.value as string : '');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  }

  return (
    <fieldset className='tt_input-field-float'>
      <input className="tt_input" onChange={handleChange} value={value} {...props} />
      <label className='tt_input_label'>{props.label}</label>
    </fieldset>
  );
}

interface CheckboxProps extends Omit<InputProps, 'icon' | 'type'> {
  id: string;
  label: string;
  isChecked: boolean;
}

export const CheckboxInput: React.FC<CheckboxProps> = (props) => {
  const [checked, setChecked] = useState<boolean>(props.isChecked);

  function handleChange() {
    setChecked((checked) => !checked);
  }

  return (
    <fieldset className='tt_checkbox-field'>
      <input className='tt_input' onChange={() => handleChange()} checked={checked} type='checkbox' {...props} />
      <label htmlFor={props.id} className='tt_inp_label txt-gray-5'>{props.label}</label>
    </fieldset>
  );
}

interface ItemType {
  name: string;
  id: string;
}

interface SliderProps extends Omit<InputProps, 'onChange' | 'onClick'> {
  data: ItemType[];
  selectedIndex?: number;
  onClick?: (e: React.MouseEvent<HTMLLIElement>, selectedItem: ItemType) => void;
  onChange?: (nmber: number) => void;
}

export const SliderSelector: React.FC<SliderProps> = (props) => {
  const { data, selectedIndex, onClick, onChange, ...rest } = props;
  const [selected, setSelected] = useState<number>(selectedIndex ? selectedIndex : 0)
  const [showList, setShowList] = useState<boolean>(false);

  function prev() {
    if (data.length <= 0) return;
    const indexOfCurrentSelected = Number(selected);
    let prevIndex = indexOfCurrentSelected - 1;
    if (prevIndex < 0) {
      prevIndex = data.length - 1;
    };
    onChange && onChange(prevIndex);
    setSelected(prevIndex);
  }

  function next() {
    if (data.length <= 0) return;
    const indexOfCurrentSelected = Number(selected);
    let nextIndex = indexOfCurrentSelected + 1;
    if (nextIndex > data.length - 1) {
      nextIndex = 0;
    };
    onChange && onChange(nextIndex);
    setSelected(nextIndex);
  }

  function handleClick() {
    setShowList((show) => !show);
  }

  function handleSelect(e: React.MouseEvent<HTMLLIElement>, selectedItem: ItemType) {
    const currentIndex = data.findIndex(item => selectedItem.id === item.id);
    if (currentIndex === -1) return;
    setSelected(currentIndex);
    setShowList(false);
    onClick && onClick(e, selectedItem);
  }

  return (
    <>
      <div className={`${showList ? 'background' : 'hidden'}`} onClick={() => setShowList(false)} ></div>
      <div className='selector-container'>
        <SlArrowLeft height={'2vh'} onClick={prev} />
        <InputComponent
          value={data[selected].name}
          onClick={() => handleClick()}
          onChange={() => { }}
          style={{ cursor: 'pointer' }}
          {...rest}
          readOnly
        />
        <SlArrowRight height={'2vh'} onClick={next} />
        <ListComponent active={showList} data={data} selectitem={handleSelect} />
      </div>
    </>
  );
};

