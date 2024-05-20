/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './style.css';
import './settings.scss';
import RoundedBox from '@app/components/common/box';
import Accordion from './accordion';
import ButtonComponent from '@app/components/common/button';
import { Actions, Indicator, Role, Unities, priorityType } from '@core/models';
import { CheckboxInput, FloatInput, InputComponent } from '@app/components/common';
import './carrousel.css';
import { FiTarget } from 'react-icons/fi';
import { FloatTextBox } from '@app/components/common/textBox';
import TabNavigator from '@app/components/ui/tab/tab';
import { useForm, SubmitHandler, Control, FieldValues, useController } from "react-hook-form";
import { Resolver } from 'react-hook-form';
import { CheckableList } from '@app/components/common/list';
import { useCheckList } from '@app/hooks/useList';
import { SliderSelector, SelectComponent, ControlledSliderSelect, ControlledSelect } from '@app/components/common/select';

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

const UsersConfigComponent = (props: ConfigComponentBase) => {
  const [currentUsers, setCurrentUsers] = useState<string | null>(null);
  const [showUserPanel, setShowUserPanel] = useState<boolean>(false);
  const { register, handleSubmit, formState, control } = useForm();

  const permissionsData = Object.values(Role).filter((r) => isNaN(Number(r))).map((r, i) => ({ id: i.toString(), name: r.toString() }));

  function addUser(id: string) {
    setCurrentUsers(id);
  }

  return (
    <form onSubmit={handleSubmit((parameter) => console.log(parameter))} className='users-container tt-flex-col g-xl'>
      <>
        <article className='tt-flex-col p-m g-m'>
          <p>input uploader</p>
          <span className='tt-divider '></span>
        </article>
        <ControlledSelect control={control} name='permission' placeholder='Select User' data={permissionsData} />
        <article className='tt-flex-col p-m g-m mb-l'>
          <p>users and permissions</p>
          <span className='tt-divider'></span>
        </article>
        <FloatInput label={'user'} {...register('user')} />
        <ControlledSelect control={control} name='permission' placeholder='User Permission' data={permissionsData} />
      </>
      <ButtonComponent size='medium' onClick={() => { setShowUserPanel((prev) => !prev); }}>add user</ButtonComponent>
    </form>
  );
};

const TimeConfigComponent = (props: ConfigComponentBase) => {
  const { isAutomatic } = props;
  const { handleSubmit, register, formState } = useForm();

  return (
    <form onSubmit={handleSubmit((parameter) => console.log(parameter))} className='time-container tt-flex-col g-xl p-l'>
      <FloatInput label='from' type='date' {...register('from')} />
      <FloatInput label='to' type='date' {...register('to')} />
      {
        isAutomatic &&
        <>
          <FloatInput label='frecuency' type='number' {...register('frecuency')} />
        </>
      }
      <ButtonComponent size={'large'} label='Save Config' />
    </form>
  );
};

function RequerimentConfig(props: ConfigComponentBase) {
  const [selectedId, setSelectedId] = useState<string>('1');
  const requeriments = [{
    id: '1',
    content: 'inputs'
  },
  {
    id: '2',
    content: 'output'
  },
  {
    id: '3',
    content: 'verifications'
  }
  ];

  function InputForm() {
    const { control, handleSubmit, register } = useForm();
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

    return (
      <form className='tt-flex-col p-l mt-l' onSubmit={handleSubmit(value => console.log(value))}>
        <FloatInput type='text' label='Field name' {...register('name')} />
        <ControlledSliderSelect control={control} placeholder='input types' name='inputTypes' data={inputDataTypes} />
        <CheckboxInput id={'inp-required'} label={'Is required?'} isChecked={true} {...register('isRequired')} />
        <ButtonComponent variant='primary' type='submit' size={'medium'} >Add Field</ButtonComponent>
      </form>
    );
  }

  function OutputForm() {
    const [selectedId, setSelectedId] = useState<string>('acc1');
    const { control, handleSubmit, register } = useForm();
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

    const handleAccordion = (id: string) => {
      setSelectedId(id)
    };

    return (
      <form className='tt-flex-col g-xl p-l ' onSubmit={handleSubmit(value => console.log(value))}>
        <Accordion
          label={'Input'}
          showContent={selectedId === 'acc1'}
          handleShow={handleAccordion}
          className='tt-flex-col g-xl p-l'
          id={'acc1'}
        >
          <ControlledSliderSelect control={control} placeholder='Selected Input' name='inputTypes' data={inputDataTypes} />
          <FloatInput type='Number' label='Expected Value' {...register('name')} />
          <ButtonComponent variant='primary' type='submit' size={'medium'} >Save Field</ButtonComponent>
        </Accordion>
        <Accordion
          className='tt-flex-col g-xl p-l'
          label={'Metrics'}
          showContent={selectedId === 'acc2'}
          handleShow={handleAccordion}
          id={'acc2'}
        >
          <ControlledSliderSelect control={control} placeholder='Selected Input' name='inputTypes' data={inputDataTypes} />
          <FloatInput type='Number' label='Expected Value' {...register('name')} />
          <ButtonComponent variant='primary' type='submit' size={'medium'} >Save Field</ButtonComponent>
        </Accordion>
        <Accordion
          className='tt-flex-col g-xl p-l'
          label={'Target'}
          showContent={selectedId === 'acc3'}
          handleShow={handleAccordion}
          id={'acc3'}
        >
          <ControlledSliderSelect control={control} placeholder='Selected Input' name='inputTypes' data={inputDataTypes} />
          <FloatInput type='Number' label='Expected Value' {...register('name')} />
          <ButtonComponent variant='primary' type='submit' size={'medium'} >Save Field</ButtonComponent>
        </Accordion>
      </form>
    );
  }

  function ValidationForm({ isAuto }: { isAuto: boolean }) {
    const { control, handleSubmit, register } = useForm();

    return (
      <form className='tt-flex-col p-l mt-l' onSubmit={handleSubmit((data) => console.log(data))}>
        <FloatInput label={'User'} {...register('user')} />
        <FloatInput label={'current validation'} {...register('validation')} />
        {
          isAuto ?
            <>
              <CheckboxInput id={'isTarget'} label={'AutoValidate Target'} isChecked={false} {...register('target')} />
              <CheckboxInput id={'isTarget'} label={'AutoValidate Metric'} isChecked={false} {...register('metric')} />
            </>
            : null
        }
        <ButtonComponent size={'small'} label='add validator' />
      </form>
    );
  }

  const sections: Record<string, React.ReactNode> = {
    '1': <InputForm />,
    '2': <OutputForm />,
    '3': <ValidationForm isAuto={props.isAutomatic} />,
  }

  return (
    <div className='requeriment-contaien tt-l-col-m w-[100%]'>
      <RoundedBox>
        <TabNavigator labels={requeriments} selectedId='1' onselect={(_, item) => setSelectedId(item.id)} />
        <main>
          {sections[selectedId]}
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
        handleShow={(id) => { setSelectedAccordion(id) }}
        id={'ac-s-2'}
      />
    </RoundedBox >
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
    'c-requeriments': <RequerimentConfig isAutomatic={props.isAuto} />
  };

  function handleClick(item: ItemType) {
    setCurrentConfig(item.id);
  };

  return (
    <div className='tt-flex-col'>
      <SliderSelector data={data} placeholder={data[0].name} onselect={handleClick} />
      {
        mappedConfig[currentConfig]
      }
    </div>
  );
}


function GoalConfigComponent2(props: GoalsProps) {
  const { register, handleSubmit, formState, control } = useForm();

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
            <ControlledSelect control={control} name='action' placeholder='Action' data={actionsData} />
            <p className='tt-flex-col layer-centered'>the</p>
            <ControlledSelect control={control} name='indicator' placeholder='Indicator' data={indicatorData} />
          </article>
          <article id='ammount' className='tt-flex-row'>
            <ControlledSelect control={control} name='unit' placeholder='Unit' data={unitiesData} />
            <FloatInput label={'ammount'} type='number' {...register('Ammount')} />
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
    const { checkList, selectItem } = useCheckList(productPreferences);
    const [currentTab, setCurrentTab] = useState(props.navigationTabs[0].id);


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

    useEffect(() => {
      console.log(checkList?.filter((item) => item.selected === true));
    }, [checkList]);

    return (
      <section className='tt-flex-col g-l'>
        <TabNavigator labels={props.navigationTabs} selectedId='t-target' onselect={(_, item) => setCurrentTab(item.id)} />
        <section id='goalSection' className='tt-flex-col g-l p-s'>
          {
            currentTab === 't-target' &&
            <>
              <section className='tt-flex-col g-xl'>
                <FloatInput type='text' label='Country/Location' {...register('location')} />
                <FloatInput icon={<p className='icon'>$</p>} type='number' label='Income' {...register('income')} />
                {
                  checkList !== null &&
                  <fieldset className='tt-flex-col g-m p-0'>
                    <CheckableList selectItem={selectItem} label='Product Preferences' checkList={checkList} />
                  </fieldset>
                }
                <fieldset className='tt-flex-col p-0'>
                  <ControlledSliderSelect control={control} name='age' placeholder='Age' data={ageData} />
                </fieldset>
                <fieldset className='tt-flex-col p-0'>
                  <ControlledSliderSelect control={control} name='gender' placeholder='Gender' data={genderList} />
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
    <form className='tt-flex-col g-l' onSubmit={handleSubmit((parameter) => console.log(parameter))}>
      <GoalSpecification isAuto={props.isAutomatic} />
      <GoalSections navigationTabs={tabs} />
      <ButtonComponent type='submit' size={'large'} label='Save Goal' />
    </form>
  );
}
