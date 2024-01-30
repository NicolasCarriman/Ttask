import React, { useState } from 'react';
import './style.css';
import RoundedBox from '@app/components/common/box';
import ListItem from '@app/components/common/listItem';
import InputSelector from '@app/components/ui/inputSearch/inputSearch';
import Accordion from './accordion';
import ButtonComponent from '@app/components/common/button';
import { priorityType } from '@core/models';

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
  history: IHistory;
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

interface TaskSettingsBase {
  users: {
    id: string,
    permission: string,
  }[];
  relested: ReleastedType[];
  requeriments: any;
  target: null | any;
  from: string | null
  to: string | null
  priority: null | priorityType;
  steps: StepsSettings[]
}

interface AutomaticSettings extends TaskSettingsBase {
  type: 'automatic';
  duration: any;
  frecuency: any;
}

interface ManualSettings extends TaskSettingsBase {
  type: 'manual';
  taskType: 'upload' | 'analizer' | 'problem';
  fields?: any[];
}

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
              <StepperSettings />
              <UsersSettings />
              <ReleastedSettings />
              <RequerimentsSettings />
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

interface StepperProps {
  steps: StepsSettings[];
  setSteps: () => void;
}

const StepperSettings = (props: StepperProps) => {
  const { steps, setSteps } = props;
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

  return (
    <div className='step-settings'>
      {
        steps.length > 0 &&
        <>
          <p>step :</p>
          <input disabled>{getSelectedStep(selected).name}</input>
        </>
      }
      <div className='button-group'>
        <ButtonComponent size={'medium'}>
          add step
        </ButtonComponent>
        <ButtonComponent size={'medium'} disabled={steps.length === 0}>
          delete step
        </ButtonComponent>
      </div>
    </div>);
};

//poder añadir iteraciones a una lista ej por
//cada ítem realizar una acción 