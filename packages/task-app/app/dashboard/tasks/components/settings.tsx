/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './style.css';
import './settings.scss';
import RoundedBox from '@app/components/common/box';
import ListItem from '@app/components/common/listItem';
import InputSelector, { onClickCallBack } from '@app/components/ui/inputSearch/inputSearch';
import Accordion from './accordion';
import ButtonComponent from '@app/components/common/button';
import { priorityType } from '@core/models';
import { CheckboxInput, FloatInput, InputComponent, SliderSelector } from '@app/components/common';
import './carrousel.css';
import { MdInput, MdOutlineOutput, MdOutlineVerifiedUser } from 'react-icons/md';
import { FiTarget } from 'react-icons/fi';

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

const settingsSections: ItemType[] = [
  {
    name: 'Subtask',
    id: 'setting-1'
  },
  {
    name: 'Subtask Item',
    id: 'setting-2'
  },
  {
    name: 'Task',
    id: 'setting-3'
  }
];

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
function TargetConfig() {

  return (
  <form>
    <FloatInput name='f-name' type='text' label='Description' />
    <FloatInput name='f-name' type='text' label='Specifications' />
    <fieldset className='tt-flex-col'>
      <label>unit type</label>
      <InputComponent />
    </fieldset>
    <h3>target :</h3>
    <FloatInput name='f-name' type='text' label='Country/Location' />
    <FloatInput name='f-name' type='text' label='Demography' />
    <FloatInput name='f-name' type='text' label='Product Preferences' />
    <p>List</p>
    <div className='flex-col'>
      <button>Create New List</button>
      <button>Select From Existent</button>
    </div>
    <p>Aditional Fields</p>
    <FloatInput name='f-name' type='text' label='inputs' />
  </form>);
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
      console.log(data.entries);
    }

    return (
      <form className='tt-l-col-m' onSubmit={handleSubmit}>
        <ul className='tt-ul inp-gp-col'>
          <li>
            <FloatInput name='f-name' type='text' label='Field name' />
          </li>
          <li>
            <label className='txt-gray-4 '>Field type</label>
            <SliderSelector data={ inputDataTypes } />
          </li>
          <li>
            <CheckboxInput id={'inp-required'} label={'Is required?'} isChecked={true}/>
          </li> 
        </ul>
        <ButtonComponent variant='filter' type='submit' size={'medium'} >Add Field</ButtonComponent>
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
        <ButtonComponent size={'large'} >Next</ButtonComponent>
      </RoundedBox>

      {/*
      
      <Accordion
        label='Input'
        showContent={selectedId === '1'}
        handleShow={handleAccordion}
        id='1'
      >
        <InputForm />
      </Accordion>
      <Accordion
        label='output'
        showContent={selectedId === '2'}
        handleShow={handleAccordion}
        id='2'
      >
        <div>
          teste
        </div>
      </Accordion>
      <Accordion
        label='verification'
        showContent={selectedId === '3'}
        handleShow={handleAccordion}
        id='3'
      >
        <div>
          teste
        </div>
      </Accordion>
      <Accordion
        label='target'
        showContent={selectedId === '4'}
        handleShow={handleAccordion}
        id='4'
      >
        <div>
          targetConfig
        </div>
      </Accordion> */}
    </div>
  );
}

type ManualSettings = ManualFields & TaskSettingsBase;

function Settings() {
  const [selectedSetting, setSelectedSetting] = useState<string>(settingsSections[0].id);
  const [selectedAccordion, setSelectedAccordion] = useState<string>('ac-s-1');
  const [steps, setSteps] = useState<number>(0);


  // eslint-disable-next-line no-unused-vars
  function renderItems({ data, handleClick }: { data: ItemType, handleClick(name: string, id: string): void }) {
    return (
      <ListItem key={data.id} onClick={() => { handleClick(data.name, data.id); setSelectedSetting(data.id); }}>
        {data.name}
      </ListItem>
    );
  };

  function addStep(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e);
    setSteps(steps + 1);
  }

  return (
    <RoundedBox className={'settings-container'}>
      <h3>settings</h3>
      <section className='team-container'>
        <InputSelector
          style='slider'
          placeHolder="team"
          data={settingsSections}
          render={renderItems}
        />
      </section>
      <Accordion
        label={'Configuration'}
        showContent={selectedAccordion === 'ac-s-1'}
        handleShow={(id) => { setSelectedAccordion(id); }}
        id={'ac-s-1'}>
        {
          selectedSetting === 'setting-1' ?
            <>
              <StepperSettings steps={[]} setSteps={function (): void {
                throw new Error('Function not implemented.');
              }} />
              <div>requeriments: notSetted</div>
            </>
            : null
        }
      </Accordion>
      <Accordion
        label={'Automatization'}
        showContent={selectedAccordion === 'ac-s-2'}
        handleShow={(id) => { setSelectedAccordion(id); }}
        id={'ac-s-2'}>
        {
          selectedSetting === 'setting-1' ?
            <div>test</div>
            : null
        }
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
  const [ configType, setConfigType ] = useState<'manual' | 'automatic'>('manual');
  const [ selected, setSelected ] = useState<number>(0);

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
      <InputComponent placeholder='add fields' />
      <ButtonComponent size={'large'} >Add Step</ButtonComponent>
      <InputComponent placeholder='REQUIREM,ENT CONFIGS' />
      <InputComponent placeholder='Releasted config' />
      <InputComponent placeholder='priority' />
      <InputComponent placeholder='target' />
      <InputComponent placeholder='IS VALIDATED' />
      <InputComponent placeholder='add step' />
      <InputComponent placeholder='save step' />
    </div>);
};

interface CarrouselProps {
  isAuto: boolean;
}

function CarrouselComponent(props: CarrouselProps) {
  const [currentConfig, setCurrentConfig] = useState<string>('c-time');
  const [fields, setFields] = useState<{ name: string, id: string, type: FieldsTypes }[]>([]);
  const { isAuto } = props;


  const data = [
    {
      id: 'c-target',
      name: 'Target Config'
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
    'c-target': <TargetConfig />,
    'c-time': <TimeConfigComponent isAutomatic={props.isAuto} />,
    'c-user': <UsersConfigComponent isAutomatic={props.isAuto} />,
    'c-requeriments': <RequerimentConfig />
  };

  function handleClick(_: React.MouseEvent<HTMLLIElement>, item: ItemType) {
    setCurrentConfig(item.id);
  };

  function handleChange (index: number) {
    const currentItem = data[index];
    setCurrentConfig(currentItem.id);
  };

  return (
    <div className='dynamic-config-container'>
      <SliderSelector data={data} onChange={handleChange} onClick={handleClick} />
      {
        mappedConfig[currentConfig]
      }
    </div>
  );
}


//poder añadir iteraciones a una lista ej por
//cada ítem realizar una acción que puedas cambiar una etiqueta de una sub tarea automaticamente cuando cambias de tarea ej en un canvas si dejo en la seccion fix su categoria se tendria que ajustar a fix
