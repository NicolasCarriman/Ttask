'use-client';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { InputHTMLAttributes, useState } from 'react';
import './inputComponent.css';
import { ListComponent, ListComponentProps } from "./list";

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
  ischecked: boolean;
}

export const CheckboxInput: React.FC<CheckboxProps> = (props) => {
  const [checked, setChecked] = useState<boolean>(props.ischecked);

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
  onClick?: (nmber: number) => void;
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

  function handleClick(selectedIndex: number) {
    onClick && onClick(selectedIndex);
    onChange && onChange(selectedIndex);
    setShowList((show) => !show);
  }

  function handleSelect(selectedItem: ItemType) {
    const currentIndex = data.findIndex(item => selectedItem.id === item.id);
    if (currentIndex === -1) return;
    setSelected(currentIndex);
    setShowList(false);
  }

  return (
    <div className='selector-container'>
      <SlArrowLeft onClick={prev} />
      <InputComponent
        value={data[selected].name}
        onClick={() => handleClick(selected)}
        onChange={() => { }}
        style={{ cursor: 'pointer' }}
        {...rest}
        readOnly
      />
      <SlArrowRight onClick={next} />
      <div
        className={`${showList ? 'fixed inset-0 z-[100]  backdrop-brightness-[0.9] transition-all' : 'hidden'}`}
        onClick={() => setShowList(false)}
      />
      <ListComponent onselect={handleSelect} active={showList} data={data} />
    </div>
  )
}

interface TextAreaProps extends React.ComponentProps<'textarea'> {

}

export const TextArea: React.FC<TextAreaProps> = (props) => {

  return (
    <fieldset className="flex-col tt_textarea-container">
      <legend id='textarea_legend' className="txt-gray-4">Description</legend>
      <textarea rows={5} placeholder="Write a description for this purpose..." className="tt_textarea" {...props}></textarea>
    </fieldset>
  );
}

type InputSelectorProps = FloatInputProps & Pick<ListComponentProps, 'onselect' | 'data'>;

export const DropdownInput = (props: InputSelectorProps) => {
  const [ value, setValue ] = useState<string>('');
  const [ showMenu, setShowMenu ] = useState<boolean>(false);

  const handleShow = () => { setShowMenu((prevState) => (!prevState)); };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setValue(currentValue);
  }

  const inputSetup = {
    label: props.label,
    onClick: handleShow,
    onChange: handleChange,
    value: value,
  }

  function handleSelect (item: {id: string, name: string} ) {
    setValue(item.name);

    props.onselect(item);
    setShowMenu(false);
  }

  const menuConfig = {
    data: props.data,
    active: showMenu,
    onselect: handleSelect
  }

  return (
    <fieldset className="tt_input-selec">
      <FloatInput {...inputSetup} {...props}/>
      <ListComponent {...menuConfig} />
    </fieldset>
  );
}
