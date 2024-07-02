'use-client';
import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
import './inputComponent.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {

    return (
      <fieldset className='tt_input-field'>
        {props.icon && props.icon}
        <input ref={ref} className="tt_input" {...props} />
      </fieldset>
    );
  }
);

Input.displayName = 'Input';
export const InputComponent = Input;

interface FloatInputProps extends Omit<InputProps, 'icon'> {
  label: string;
  icon?: React.ReactNode;
}

const FloatInputComponent = forwardRef<HTMLInputElement, FloatInputProps>(
  (props, ref) => {
    const { ...rest } = props;

    return (
      <fieldset className='tt_input-field-float'>
        {props.icon && props.icon}
        <input ref={ref} className="tt_input" {...rest} />
        <label className='tt_input_label'>{props.label}</label>
      </fieldset>
    );
  });

FloatInputComponent.displayName = 'FloatInput';
export const FloatInput = FloatInputComponent;

interface CheckboxProps extends Omit<InputProps, 'icon' | 'type'> {
  id: string;
  label: string;
  isChecked: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const [checked, setChecked] = useState<boolean>(props.isChecked);

    function handleChange() {
      setChecked((checked) => !checked);
    }

    return (
      <fieldset className='tt_checkbox-field'>
        <input ref={ref} className='tt_input' onChange={() => handleChange()} checked={checked} type='checkbox' {...props} />
        <label htmlFor={props.id} className='tt_inp_label txt-gray-5'>{props.label}</label>
      </fieldset>
    );
  }  
);

Checkbox.displayName = 'Checkbox';
export const CheckboxInput = Checkbox;
