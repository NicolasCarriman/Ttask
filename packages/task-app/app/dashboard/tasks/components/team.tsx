import RoundedBox from '@app/components/common/box';
import ListItem from '@app/components/common/listItem';
import DynamicSelector from '@app/components/ui/dynamicSelector/dynamicSelector';
import InputSelector from '@app/components/ui/inputSearch/inputSearch';
import { useAppSelector } from '@app/hooks/redux';
import { useTask } from '@app/hooks/useTasks';
import { taskSelector } from '@core/redux/reducers/taskSlice/task.selector';
import React, { useState } from 'react';
import './style.css';
import Accordion from './accordion';

type ItemType = {
  name: string,
  id: string
}

const teamsData: ItemType[] = [
  { name: "Equipo A", id: "1" },
  { name: "Equipo B", id: "2" },
  { name: "Equipo C", id: "3" },
];

const usersData: ItemType[] = [
  { name: "Usuario 1", id: "1" },
  { name: "Usuario 2", id: "2" },
  { name: "Usuario 3", id: "3" },
  { name: "Usuario 4", id: "4" },
  { name: "Usuario 5", id: "5" },
];

function TeamSection() {
  const [teams, setTeams] = useState<ItemType[]>(teamsData);
  const { setSubTaskId, addNewSubtask, getCurrentTask } = useTask();
  const tasks = useAppSelector(taskSelector);
  const currentTask = getCurrentTask(tasks.currentTask);

  return (
    <>
      <section className='team-container'>
        <InputSelector
          style='slider'
          placeHolder="team"
          data={teams}
          render={(data, handleClick) => (
            <ListItem onClick={() => handleClick(data.name, data.id)}>
              {data.name}
            </ListItem>
          )}
        />
      </section>
      {
        currentTask.subtasks &&
        < DynamicSelector
          title='Categories'
          elements={currentTask.subtasks}
          selectedId={tasks.currentSubtask}
          onSelect={(id) => setSubTaskId(id)}
          onClick={(subtaskName) => addNewSubtask(subtaskName)}
          newTabElement={'Crear subtarea'}
        />
      }
      <UserPicker data={usersData} />
    </>
  )
}

export default TeamSection;

interface UserPickerProps<T> {
  data: T[]
}

function UserPicker<T extends ItemType>(props: UserPickerProps<T>) {
  const { data } = props;
  const [ selectedId, setSelectedId ] = useState<string>("2dc");

  function handleAccordion(id: string) {
    if (selectedId !== id) {
      setSelectedId(id);
      return;
    } 
    setSelectedId("");
  }

  return (
    <Accordion
      label={'Users'}
      showContent={selectedId === "acc1"}
      handleShow={handleAccordion}
      id={'acc1'} 
    >
      <>
        {
          data.map((item) => (
            <ListItem>
              {item.name}
            </ListItem>
          ))
        }
      </>
    </Accordion>
  );
}