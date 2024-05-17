'use-client';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import React, { ChangeEvent, InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import './inputComponent.scss';
import { format } from 'numerable';
import List, { ListComponent } from "./list";
import { useController } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const InputComponent: React.FC<InputProps> = (props) => {

  return (
    <fieldset className='tt_input-field'>
      {props.icon && props.icon}
      <input className="tt_input" {...props} />
    </fieldset>
  );
};

interface FloatInputProps extends Omit<InputProps, 'icon'> {
  label: string;
  icon?: React.ReactNode;
}

export const FloatInput = forwardRef<HTMLInputElement, FloatInputProps>(
  (props, ref) => {
    const { ...rest } = props;

    return (
      <fieldset className='tt_input-field-float'>
        {props.icon && props.icon}
        <input ref={ref} className="tt_input" {...rest} />
        <label className='tt_input_label'>{props.label}</label>
      </fieldset>
    );
  })

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
  name: string;
}

export const SliderSelector: React.FC<SliderProps> = (props) => {
  const { data, selectedIndex, onClick, ...rest } = props;
  const [selected, setSelected] = useState<number | null>(selectedIndex ? selectedIndex : null)
  const [showList, setShowList] = useState<boolean>(false);
  const { field } = useController({name: props.name});

  function prev() {
    if (data.length <= 0) return;
    const indexOfCurrentSelected = Number(selected);
    let prevIndex = indexOfCurrentSelected - 1;
    if (prevIndex < 0) {
      prevIndex = data.length - 1;
    };
    field.onChange(data[prevIndex].name);
    setSelected(prevIndex);
  }

  function next() {
    if (data.length <= 0) return;
    const indexOfCurrentSelected = Number(selected);
    let nextIndex = indexOfCurrentSelected + 1;
    if (nextIndex > data.length - 1) {
      nextIndex = 0;
    };
    field.onChange(data[nextIndex].name);
    setSelected(nextIndex);
  }

  function handleClick() {
    setShowList((show) => !show);
  }

  function handleSelect(selectedItem: ItemType) {
    const currentIndex = data.findIndex(item => selectedItem.id === item.id);
    if (currentIndex === -1) return;
    field.onChange(data[currentIndex].name);
    setSelected(currentIndex);
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
          {...field}
          readOnly
        />
        <SlArrowRight height={'2vh'} onClick={next} />
        <ListComponent active={showList} data={data} selectitem={handleSelect} />
      </div>
    </>
  );
};

interface SelectProps extends React.ComponentProps<'input'> {
  data: { id: string, name: string }[];
}

export function SelectComponent(props: SelectProps) {

  const { data, onClick, onChange, ...rest } = props;
  const [selected, setSelected] = useState<number | null>(null)
  const [showList, setShowList] = useState<boolean>(false);

  function handleClick() {
    setShowList((show) => !show);
  }

  function handleSelect(selectedItem: ItemType) {
    const currentIndex = data.findIndex(item => selectedItem.id === item.id);
    if (currentIndex === -1) return;
    setSelected(currentIndex);
    setShowList(false);
  }

  return (
    <>
      <div className={`${showList ? 'background' : 'hidden'}`} onClick={() => setShowList(false)}></div>
      <div className='selector-container'>
        <InputComponent
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
