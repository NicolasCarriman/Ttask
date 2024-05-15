/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './style.css';
import './settings.scss';
import RoundedBox from '@app/components/common/box';
import Accordion from './accordion';
import ButtonComponent from '@app/components/common/button';
import { Actions, Indicator, Unities, priorityType } from '@core/models';
import { CheckboxInput, FloatInput, InputComponent, SelectComponent, SliderSelector } from '@app/components/common';
import './carrousel.css';
import { MdInput, MdOutlineOutput, MdOutlineVerifiedUser } from 'react-icons/md';
import { FiTarget } from 'react-icons/fi';
import { FloatTextBox } from '@app/components/common/textBox';
import TabNavigator from '@app/components/ui/tab/tab';
import { useForm, SubmitHandler } from "react-hook-form";
import { Resolver } from 'react-hook-form';
import { CheckableList } from '@app/components/common/list';
import { useCheckList } from '@app/hooks/useList';

type statusType = 'done' | 'inProgress' | 'toDo' | 'toFix' | 'fixed' | 'verified' | 'aprobed';

interface HistoryTimeStamp {
  timeStamp: string;
  user: string;
  value: string;
}

interface IHistory {
  date: string;
  endLine?: string;
  timeStamp: HistoryTimeStamp;
  getCurrentDuration(): string;
}

interface RequerimentTypes {
  maxElements: number,
  endDate: Date,
}

interface RequirementConfig {
  functional: any;
  notFunctional: any;
  input: any;
  output: any;
  quality: any;
  resources: any;
  endDate: any,
  support: any;
}

interface ConfigBase {
  name: string;
  type: 'manual' | 'auto';
  status: statusType;
  users: string[];
  requeriments?: string[];
}

interface ListConfig extends ConfigBase {
  targetValue: number;
  host?: string;
  permissions?: string[];
  fields: any[]; //fields de la lista
  metadata: Record<string, string[]>
  relatedLists?: string[]; //id de las listas relacionadas
  template?: string[];
  requirements?: Partial<RequerimentTypes>[];
  isqueue?: boolean;
}

interface ItemType {
  name: string,
  id: string
}

type ReleastedType = {
  name: string;
  id: string;
}


type StepsSettings = {
  name: string,
  id: number
}

type FieldsTypes = 'date' | 'checkbox' | 'default' | 'number';

type FieldsData<T extends string> = Record<T, string | number | null> & {
  id: string;
  type: FieldsTypes;
}

type UsersPermissionsNames = 'read' | 'write' | 'validate' | 'verify';

interface TaskSettingsBase {
  users: {
    id: string,
    permission: UsersPermissionsNames,
  }[];
  time: (FieldsData<'from'> | FieldsData<'to'> | FieldsData<'duration'> | FieldsData<'frecuency'>)[] | (FieldsData<'from'> | FieldsData<'to'>)[]
  relested: ReleastedType[];
  requeriments: any;
  target: null | any;
  priority: null | priorityType;
  steps: StepsSettings[]
}

interface AutomaticSettings extends TaskSettingsBase {
  type: 'automatic';
  time: (FieldsData<'from'> | FieldsData<'to'> | FieldsData<'duration'> | FieldsData<'frecuency'>)[];
}

type ManualFields = {
  type: 'manual';
  taskType: 'upload' | 'analizer' | 'resolver';
  fields?: any[];
}

interface ConfigComponentBase {
  isAutomatic: boolean;
}

interface InputFieldProps {
  type: string;
  name: string;
}

const genderList = [
  { id: '1', name: 'Masculino' },
  { id: '2', name: 'Femenino' },
  { id: '3', name: 'Otro' }
];

const productPreferences = [
  { id: '1', name: 'Electronics', selected: false },
  { id: '2', name: 'Clothing', selected: false },
  { id: '3', name: 'Footwear', selected: false },
  { id: '4', name: 'Accessories', selected: false },
  { id: '5', name: 'Furniture', selected: false },
  { id: '6', name: 'Appliances', selected: false },
  { id: '7', name: 'Home Decor', selected: false },
  { id: '8', name: 'Gardening', selected: false },
  { id: '9', name: 'Sports Equipment', selected: false },
  { id: '10', name: 'Sportswear', selected: false },
  { id: '11', name: 'Fitness Gear', selected: false }
];

interface GoalsProps extends ConfigComponentBase { }

function GoalConfigComponent(props: GoalsProps) {
  const [currentTab, setCurrentTab] = useState('t-target');
  const { checkList, selectItem } = useCheckList(productPreferences);
  const { register, handleSubmit, formState } = useForm();
  const { isAutomatic } = props;
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  const tabs = [
    { content: 'Target', id: 't-target' },
    { content: 'Metrics', id: 't-metrics' },
  ];

  const ageData = [
    {
      name: '8-12 years',
      id: '1'
    },
    {
      name: '13-18 years',
      id: '2'
    },
    {
      name: '19-25 years',
      id: '3'
    },
    {
      name: '26-35 years',
      id: '4'
    },
    {
      name: '36-45 years',
      id: '5'
    },
    {
      name: '46-55 years',
      id: '6'
    },
    {
      name: '56-65 years',
      id: '7'
    },
    {
      name: '66+ years',
      id: '8'
    }
  ];

  function AutomaticSpecification() {


    const actionsData = Object.values(Actions).filter((u) => isNaN(Number(u))).map((indicator, index) => ({ name: indicator.toString(), id: (indicator + index.toString()) }));
    const indicatorData = Object.values(Indicator).filter((u) => isNaN(Number(u))).map((indicator, index) => ({ name: indicator.toString(), id: (indicator + index.toString()) }));
    const unitiesData = Object.values(Unities).filter((u) => isNaN(Number(u))).map((u, index) => ({ name: u.toString(), id: (u + index.toString()) }))

    return (<>

      <article className='tt-flex-row'>
        <SelectComponent placeholder='Action' data={actionsData} />
        <p className='tt-flex-col layer-centered'>the</p>
        <SelectComponent placeholder='Indicator' data={indicatorData} />
      </article>
      <article id='ammount' className='tt-flex-row'>
        <SelectComponent placeholder='Unit' data={unitiesData} />
        <FloatInput label={'ammount'} type='number' />
      </article>
    </>)
  }

  return (
    <form onSubmit={onSubmit} className='tt-flex-col g-xl'>
      {
        isAutomatic ?
          <AutomaticSpecification />
          :
          <FloatTextBox label={'Specifications'} />
      }
      <TabNavigator labels={tabs} selectedId='t-target' onselect={(_, item) => setCurrentTab(item.id)} />
      <section id='goalSection' className='tt-flex-col g-l p-s'>
        {
          currentTab === 't-target' &&
          <>
            <section className='tt-flex-col g-xl'>
              <FloatInput name='f-name' type='text' label='Country/Location' />
              <FloatInput icon={<p className='icon'>$</p>} formatType='ammount' type='number' label='Income' />
              {
                checkList !== null &&
                <fieldset className='tt-flex-col g-m p-0'>
                  <CheckableList selectItem={selectItem} label='Product Preferences' checkList={checkList} />
                </fieldset>
              }
              <fieldset className='tt-flex-col p-0'>
                <SliderSelector placeholder='Age' data={ageData} />
              </fieldset>
              <fieldset className='tt-flex-col p-0'>
                <SliderSelector placeholder='Gender' data={genderList} />
              </fieldset>
            </section>
          </>
        }
        {
          currentTab === 't-metrics' &&
          <>
            <div className='tt-flex-row'>
              <select className='tt_input-field'>
                <option value={0}>cm</option>
                <option value={1}>$</option>
                <option value={2}>$/hs</option>
                <option value={2}>%</option>
                <option value={2}>V</option>
              </select>
              <FloatInput name='f-name' type='text' label='Label' />
            </div>
            <ButtonComponent type='button' size={'medium'}>Add Metric</ButtonComponent>
          </>
        }
      </section>
      <ButtonComponent type='button' size={'large'} >Save Goal </ButtonComponent>
    </form>
  );
}

const UsersConfigComponent = (props: ConfigComponentBase) => {
  const [currentUsers, setCurrentUsers] = useState<string | null>(null);
  const [showUserPanel, setShowUserPanel] = useState<boolean>(false);
  const { isAutomatic } = props;

  const InputField = (data: InputFieldProps) => {
    return (
      <div className='input-field'>
        <span className='input-label'>{data.name}</span>
        <InputComponent type={data.type} />
      </div>
    );
  };

  function addUser(id: string) {
    setCurrentUsers(id);
  }

  return (
    <div className='users-container'>
      <>
        <InputField type={'default'} name={'user'} />
        <InputField type={'default'} name={'permission'} />
      </>
      <ButtonComponent size='medium' onClick={() => { setShowUserPanel((prev) => !prev); }}>add user</ButtonComponent>
    </div>
  );
};

const TimeConfigComponent = (props: ConfigComponentBase) => {
  const { isAutomatic } = props;

  const InputField = (data: InputFieldProps) => {
    return (
      <div className='input-field'>
        <span className='input-label'>{data.name}</span>
        <InputComponent type={data.type} />
      </div>
    );
  };

  return (
    <div className='time-container'>
      <InputField name='from' type='date' />
      <InputField name='to' type='date' />
      {
        isAutomatic &&
        <>
          <InputField name='duration' type='number' />
          <InputField name='frecuency' type='number' />
        </>
      }
    </div>
  );
};

function RequerimentConfig() {
  const [selectedId, setSelectedId] = useState<string>('');
  const requeriments = [{
    id: '1',
    name: 'inputs'
  },
  {
    id: '2',
    name: 'output'
  },
  {
    id: '3',
    name: 'verifications'
  }
  ];

  type TaskInputTypes = 'text' | 'check' | 'number' | 'file' | 'date'

  type Fields = {
    href?: string,
    isRequired: boolean,
    type: TaskInputTypes,
    value: string | boolean | number,
    attachments?: string[];
  };

  function addInputField(config: Omit<Fields, 'value'>) {

  }

  function VerificationForm() {

    return (
      <form className='verification-form'>

      </form>
    );
  }



  function InputForm() {
    const [fields, setFields] = useState<Fields[]>([]);

    const inputDataTypes = [
      {
        id: 'text-1',
        name: 'Text'
      },
      {
        id: 'check-2',
        name: 'Check'
      },
      {
        id: 'number-3',
        name: 'Number'
      },
      {
        id: 'file-4',
        name: 'File'
      },
      {
        id: 'date-5',
        name: 'Date'
      }
    ];

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const data = new FormData(e.target as HTMLFormElement);
    }

    return (
      <form className='tt-l-col-m' onSubmit={handleSubmit}>
        <ul className='tt-ul inp-gp-col'>
          <li>
            <FloatInput name='f-name' type='text' label='Field name' />
          </li>
          <li>
            <label className='txt-gray-4 '>Field type</label>
            <SliderSelector data={inputDataTypes} />
          </li>
          <li>
            <CheckboxInput id={'inp-required'} label={'Is required?'} isChecked={true} />
          </li>
        </ul>
        <ButtonComponent variant='primary' type='submit' size={'medium'} >Add Field</ButtonComponent>
      </form>
    );
  }

  function handleAccordion(id: string) {
    if (selectedId !== id) {
      setSelectedId(id);
      return;
    }
    setSelectedId('');
  }

  return (
    <div className='requeriment-contaien tt-l-col-m w-[100%]'>
      <RoundedBox>
        <header className='step-displayer'>
          <ul className='step-ul'>
            <li className='li-active' id='input-step'> <MdInput /> </li>
            <li id='target-step'> <FiTarget /> </li>
            <li id='output-step'> <MdOutlineOutput /></li>
            <li id='validation-step'> <MdOutlineVerifiedUser /> </li>
          </ul>
        </header>
        <h3 className='requeriment-section-name'>Inputs</h3>
        <span className='tt-divider'></span>
        <main>
          <InputForm />
        </main>
        <ButtonComponent type='button' size={'large'} >Save Config</ButtonComponent>
      </RoundedBox>
    </div>
  );
}

type ManualSettings = ManualFields & TaskSettingsBase;

function Settings() {
  const [selectedAccordion, setSelectedAccordion] = useState<string>('ac-s-1');
  const [steps, setSteps] = useState<number>(0);


  function addStep(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e);
    setSteps(steps + 1);
  }

  return (
    <RoundedBox className={'tt-flex-col g-m'}>
      <h3>settings</h3>
      <Accordion
        label={'Configuration'}
        showContent={selectedAccordion === 'ac-s-1'}
        handleShow={(id) => { setSelectedAccordion(id); }}
        id={'ac-s-1'}>
        {
          <>
            <StepperSettings steps={[]} setSteps={function (): void {
              throw new Error('Function not implemented.');
            }} />
          </>
        }
      </Accordion>
      <Accordion
        label={'Automatization'}
        showContent={selectedAccordion === 'ac-s-2'}
        handleShow={(id) => { setSelectedAccordion(id); }}
        id={'ac-s-2'}
        children={undefined}>
      </Accordion>
    </RoundedBox>
  );
}

export default Settings;

type ConfigNames = 'Time Config' | 'Users Config' | 'Requirements Config' | 'Releasted Config';

interface StepperProps {
  steps: StepsSettings[];
  // eslint-disable-next-line no-unused-vars
  setSteps: (args: StepsSettings[]) => void;
}

interface IConfig {
  auto: boolean;
}

type TimeFields = AutomaticSettings['time'];
type userFields = Pick<AutomaticSettings, 'users'>

interface ConfigSection {
  id: string;
  name: ConfigNames;
  getFields(): TaskSettingsBase['time'] | TaskSettingsBase['users'];
}

type DataConfig<T = unknown> = T extends ManualSettings ? ManualSettings : AutomaticSettings;

const defaultSettings: ManualSettings = {
  type: 'manual',
  taskType: 'upload',
  time: [{
    id: '1',
    from: null,
    type: 'date'
  },
  {
    id: '2',
    to: null,
    type: 'date'
  }],
  users: [],
  relested: [],
  requeriments: undefined,
  target: undefined,
  priority: null,
  steps: []
};

const StepperSettings = (props: StepperProps) => {
  const { steps, setSteps } = props;
  const [configType, setConfigType] = useState<'manual' | 'automatic'>('manual');
  const [selected, setSelected] = useState<number>(0);

  function setName(id: number, name: string) {
    const stepsCopy = [...steps];
    let modifiedStep = stepsCopy.find((step) => step.id === id);
    if (modifiedStep === undefined) throw new Error('step not found');
    modifiedStep.name = name;
    const result = stepsCopy.map((step) => {
      if (step.id === id && modifiedStep) {
        return modifiedStep;
      } else {
        return step;
      }
    });

    setSteps(result);
  }

  function deleteStep(id: number) {
    setSteps(steps.filter((s) => s.id === id));
  }

  function addStep() {
    const lastId = steps[steps.length - 1].id;
    const nextId = lastId + 1;
    const newStep: StepsSettings = {
      id: nextId,
      name: 'new step'
    };
    setSteps([...steps, newStep]);
  }

  function getSelectedStep(id: number) {
    const selectedStep = steps.find((step) => step.id === id);
    if (!selectedStep) return steps[0];
    return selectedStep;
  }


  function handleSwitch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.checked as boolean;
    const currentConfigType: 'automatic' | 'manual' = value ? 'automatic' : 'manual';
    setConfigType(currentConfigType);
  }

  return (
    <div className='step-settings'>
      <InputComponent placeholder='step name' />
      <div className="switch-container">
        <label className="switch"><input id='switchInput' type="checkbox" onChange={handleSwitch} />    <div></div>
        </label>
        <label htmlFor='switchInput' className='switch-name'></label>
      </div>
      <CarrouselComponent isAuto={configType === 'automatic'} >

      </CarrouselComponent>
      <ButtonComponent size={'large'} >Add Step</ButtonComponent>
    </div>);
};

interface CarrouselProps {
  isAuto: boolean;
}

function CarrouselComponent(props: CarrouselProps) {
  const [currentConfig, setCurrentConfig] = useState<string>('c-goal');
  const [fields, setFields] = useState<{ name: string, id: string, type: FieldsTypes }[]>([]);

  const data = [
    {
      id: 'c-goal',
      name: 'Goal Config'
    },
    {
      id: 'c-time',
      name: 'Time Config'
    },
    {
      id: 'c-user',
      name: 'Users Config'
    },
    {
      id: 'c-requeriments',
      name: 'Requeriments Config'
    }
  ];

  const mappedConfig: { [key: string]: React.ReactNode } = {
    'c-goal': <GoalConfigComponent2 isAutomatic={props.isAuto} />,
    'c-time': <TimeConfigComponent isAutomatic={props.isAuto} />,
    'c-user': <UsersConfigComponent isAutomatic={props.isAuto} />,
    'c-requeriments': <RequerimentConfig />
  };

  function handleClick(_: React.MouseEvent<HTMLLIElement>, item: ItemType) {
    setCurrentConfig(item.id);
  };

  function handleChange(index: number) {
    const currentItem = data[index];
    setCurrentConfig(currentItem.id);
  };

  return (
    <div className='tt-flex-col'>
      <SliderSelector data={data} placeholder={data[0].name} onChange={handleChange} onClick={handleClick} />
      {
        mappedConfig[currentConfig]
      }
    </div>
  );
}


function GoalConfigComponent2(props: GoalsProps) {

  const tabs = [
    { content: 'Target', id: 't-target' },
    { content: 'Metrics', id: 't-metrics' },
  ];

  interface GoalContentProps {
    navigationTabs: { id: string; content: string; }[];
  }

  function GoalSpecification(props: { isAuto: boolean }) {
    const { isAuto } = props;

    function AutomaticSpecification() {
      const actionsData = Object.values(Actions).filter((u) => isNaN(Number(u))).map((indicator, index) => ({ name: indicator.toString(), id: (indicator + index.toString()) }));
      const indicatorData = Object.values(Indicator).filter((u) => isNaN(Number(u))).map((indicator, index) => ({ name: indicator.toString(), id: (indicator + index.toString()) }));
      const unitiesData = Object.values(Unities).filter((u) => isNaN(Number(u))).map((u, index) => ({ name: u.toString(), id: (u + index.toString()) }))

      return (
        <>
          <article className='tt-flex-row'>
            <SelectComponent placeholder='Action' data={actionsData} />
            <p className='tt-flex-col layer-centered'>the</p>
            <SelectComponent placeholder='Indicator' data={indicatorData} />
          </article>
          <article id='ammount' className='tt-flex-row'>
            <SelectComponent placeholder='Unit' data={unitiesData} />
            <FloatInput label={'ammount'} type='number' />
          </article>
        </>
      );
    }
    return (
      <>
        {
          isAuto ? <AutomaticSpecification />
            : <FloatTextBox label={'Specifications'} />
        }
      </>
    )
  }

  function GoalSections(props: GoalContentProps) {
    const [currentTab, setCurrentTab] = useState(props.navigationTabs[0].id);
    const { checkList, selectItem } = useCheckList(productPreferences);


    const ageData = [
      {
        name: '8-12 years',
        id: '1'
      },
      {
        name: '13-18 years',
        id: '2'
      },
      {
        name: '19-25 years',
        id: '3'
      },
      {
        name: '26-35 years',
        id: '4'
      },
      {
        name: '36-45 years',
        id: '5'
      },
      {
        name: '46-55 years',
        id: '6'
      },
      {
        name: '56-65 years',
        id: '7'
      },
      {
        name: '66+ years',
        id: '8'
      }
    ];

    return (
      <section className='tt-flex-col g-l'>
        <TabNavigator labels={props.navigationTabs} selectedId='t-target' onselect={(_, item) => setCurrentTab(item.id)} />
        <section id='goalSection' className='tt-flex-col g-l p-s'>
          {
            currentTab === 't-target' &&
            <>
              <section className='tt-flex-col g-xl'>
                <FloatInput name='f-name' type='text' label='Country/Location' />
                <FloatInput icon={<p className='icon'>$</p>} formatType='ammount' type='number' label='Income' />
                {
                  checkList !== null &&
                  <fieldset className='tt-flex-col g-m p-0'>
                    <CheckableList selectItem={selectItem} label='Product Preferences' checkList={checkList} />
                  </fieldset>
                }
                <fieldset className='tt-flex-col p-0'>
                  <SliderSelector placeholder='Age' data={ageData} />
                </fieldset>
                <fieldset className='tt-flex-col p-0'>
                  <SliderSelector placeholder='Gender' data={genderList} />
                </fieldset>
              </section>
            </>
          }
          {
            currentTab === 't-metrics' &&
            <>
              <div className='tt-flex-row'>
                <select className='tt_input-field'>
                  <option value={0}>cm</option>
                  <option value={1}>$</option>
                  <option value={2}>$/hs</option>
                  <option value={2}>%</option>
                  <option value={2}>V</option>
                </select>
                <FloatInput name='f-name' type='text' label='Label' />
              </div>
              <ButtonComponent type='button' size={'medium'}>Add Metric</ButtonComponent>
            </>
          }
        </section>
      </section>
    );
  }

  return (
    <form className='tt-flex-col g-l'>
      <GoalSpecification isAuto={props.isAutomatic} />
      <GoalSections navigationTabs={tabs} />
      <ButtonComponent type='submit' size={'large'} label='Save Goal' />
    </form>
  );
}
