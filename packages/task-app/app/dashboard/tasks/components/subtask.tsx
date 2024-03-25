import React, { useState } from 'react';
import { subtask, subtaskItem } from '@core/models';
import Item from '@app/components/common/items';
import { useTask } from '@app/hooks/useTasks';
import RoundedBox from '@app/components/common/box';
import Button from '@app/components/common/button';
import { getRandomId } from '@app/utils';
import Input from '@app/components/common/input';
import { useTaskContext } from '../../context';

interface Props {
  data?: subtask;
}

function Subtask({ data }: Props) {
  const { setSubtaskItemCheck, addSubtaskItem } = useTask();
  const [showInput, setShowInput] = useState<boolean>(false);
  const { taskContext, setTaskContext } = useTaskContext(); 
  const [newItem, setNewItem] = useState<subtaskItem>({
    item: '',
    done: false,
    id: getRandomId()
  });

  function onChange(checked: boolean, id: string) {
    setSubtaskItemCheck(checked, id);
  }

  const handleClick = () => {
    if (!showInput) {
      setShowInput(true);
      return;
    }
    // validate if input is showing else add to list a new item
    addSubtaskItem(newItem);
    setShowInput(false);
  };

  function selectSubtask(id: string) {
    setTaskContext({ ...taskContext, currentSubtask: id });
  }

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    
    setNewItem({
      ...newItem,
      item: value
    });
  };

  function handleKeydown (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    addSubtaskItem(newItem);
    setShowInput(false);
  };

  return (
    <RoundedBox className='task-section'>
      {
        data ?
          <>
            <header className='task-header'>
              <h3> {data.name} </h3>
            </header>
            {
              showInput && 
                <div className='newsubtask-container'>
                  <Input onChange={handleChange} onKeyDown={handleKeydown} />
                </div>
            }
            <section className='subtask-content'>
              {
                data.items.map((subt) => (
                  <Item
                    isSelected={subt.id === taskContext.currentSubtask }
                    onItemSelect={selectSubtask}
                    key={subt.id}
                    handleDone={onChange}
                    done={subt.done}
                    item={subt.item}
                    itemId={subt.id}
                  >
                    {subt.item}
                  </Item>
                ))
              }
            </section>
            <footer className='task-footer'>
              <Button
                variant='filter'
                size={'medium'}
                onClick={handleClick}
              >
                Add item
              </Button>
            </footer>
          </>
          :
          <div className='flex flex-col justify-center items-center text-center gap-4 w-full'>
            <h2 className='text-lg font-medium'>
              ¡Oops! Parece que hay un pequeño problema 😅
            </h2>
            <p>
              📝¡Hola! Todavía no se ha creado ninguna subtarea o no se ha seleccionado ninguna tarea.
            </p>
          </div>
      }
    </RoundedBox>
  );
}

export default Subtask;
