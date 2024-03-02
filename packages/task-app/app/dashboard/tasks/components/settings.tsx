/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './style.css';
import RoundedBox from '@app/components/common/box';
import ListItem from '@app/components/common/listItem';
import InputSelector from '@app/components/ui/inputSearch/inputSearch';
import Accordion from './accordion';
import ButtonComponent from '@app/components/common/button';
import { priorityType } from '@core/models';
import { InputComponent } from '@app/components/common';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import ButtonIcon from '@app/components/ui/button-icon/buttonIcon';
import './carrousel.css';
import DynamicSelector from '@app/components/ui/dynamicSelector/dynamicSelector';

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

type Fields = Record<string, string | boolean> & {
  href?: string,
  isRequired: boolean,
  type: string,
  value: string | boolean | number,
  attachments?: string[];
};

interface RequerimentTypes {
  maxElements: number,
  endDate: Date,
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

interface TaskSettingsBase {
  users: {
    id: string,
    permission: string,
  }[];
  time:  (FieldsData<'from'> | FieldsData<'to'> | FieldsData<'duration'> | FieldsData<'frecuency'>)[] | (FieldsData<'from'> | FieldsData<'to'>)[]
  relested: ReleastedType[];
  requeriments: any;
  target: null | any;
  priority: null | priorityType;
  steps: StepsSettings[]
}

interface AutomaticSettings extends TaskSettingsBase {
  type: 'automatic';
  time: (FieldsData<'from'> | FieldsData<'to'> | FieldsData<'duration'> | FieldsData<'frecuency'>)[]
}

type ManualFields = { 
  type: 'manual';
  taskType: 'upload' | 'analizer' | 'resolver';
  fields?: any[];
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
              } } />
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

type DataConfig <T = unknown> = T extends ManualSettings ? ManualSettings : AutomaticSettings;

const defaultSettings: ManualSettings = {
  type: 'manual',
  taskType: 'upload',
  time: [ {
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

  function addStep () {
    const lastId = steps[steps.length - 1].id;
    const nextId = lastId + 1;
    const newStep:StepsSettings = {
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

  
  const TimeConfigData: ConfigSection[] = [{
    id: 'Time-Config',
    name: 'Time Config',
    getFields: function(this: ConfigSection) 
      {
        if (configType === 'automatic') {
          const result: TaskSettingsBase['time'] = [{
            id: '0',
            type: 'date',
            from: null
          },
          {
            id: '1',
            type: 'date',
            to: null  
          },
          {
            id: '2',
            type: 'number',
            duration: null  
          },
          {
            id: '3',
            type: 'number',
            frecuency: null  
          }
        ];
        return result;
      } else {
        return [{
          id: '0',
          type: 'date',
          from: null
        },
        {
          id: '1',
          type: 'date',
          to: null  
        }];
      }
    }
  },
  {
    id: 're2', 
    name: 'Users Config',
    getFields: function(this: ConfigSection) {
      const result: TaskSettingsBase['users'] = [{
        id: 'testets',
        permission: 'none'
      }];
      return result;
    }
  }
];

  function handleSwitch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.checked as boolean;
    const currentConfigType: 'automatic' | 'manual' = value ? 'automatic' : 'manual';
    setConfigType(currentConfigType);
  }

  return (
    <div className='step-settings'>
      <InputComponent placeholder='step name' />
      <div className="switch-container">
        <label  className="switch"><input id='switchInput' type="checkbox" onChange={handleSwitch}/>    <div></div>
        </label>
        <label htmlFor='switchInput' className='switch-name'></label>
      </div>
      <CarrouselComponent
        data={ TimeConfigData }
      >
      </CarrouselComponent>
      <InputComponent placeholder='TIME CONFIG' />
      <InputComponent placeholder='USERS CONFIGS' />
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
  data: ConfigSection[];
}

function CarrouselComponent(props: CarrouselProps) {
  const { data } = props;
  const [ configName, setConfigName ] = useState<ConfigNames>('Time Config');
  const [ fields, setFields ] = useState<{name: string, id: string, type: FieldsTypes}[]>([]);

  function getFieldsData (configName: ConfigNames) {
    const currentConfig = data.find((item) => item.name === configName);
    if (!currentConfig) throw new Error('config name not match');
    const fields = currentConfig.getFields() as  TaskSettingsBase['time'];
    const fieldsNames = Object.keys(fields).map((item, index) => {
        const field = {
          name: item,
          id: fields[index].id,
          type: fields[index].type
        };
        return field;
     });
    return fieldsNames;
  }

  function handleClick (name: ConfigNames, id: string, callback: any) {
    callback(name, id);
    setConfigName(name);
  }

  useEffect(() => {
    setFields(getFieldsData(configName));
  }, [configName, data]);

  console.log(fields);

  return (
    <div className='dynamic-config-container'>
      <InputSelector
          style='slider'
          placeHolder="team"
          data={data}
          render={(data, callback) => (
            <ListItem key={data.id} onClick={() => handleClick(data.name, data.id, callback)}>
              {data.name}
            </ListItem>
          )}
        />
        {
          fields.length > 0 &&
          fields.map(data => (
            <InputComponent key={data.id} type={data.type} />
          ))
        }
        <ButtonComponent size='large'>Save</ButtonComponent>
    </div>
  );
}

//poder añadir iteraciones a una lista ej por
//cada ítem realizar una acción que puedas cambiar una etiqueta de una sub tarea automaticamente cuando cambias de tarea ej en un canvas si dejo en la seccion fix su categoria se tendria que ajustar a fix


