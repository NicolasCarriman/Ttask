import ListItem from '@app/components/common/listItem';
import DynamicSelector from '@app/components/ui/dynamicSelector/dynamicSelector';
import InputSelector from '@app/components/ui/inputSearch/inputSearch';
import { useAppSelector } from '@app/hooks/redux';
import React, { useState } from 'react';
import Accordion from './accordion';
import { teamSelector } from '@core/redux/reducers/teamSlice/team.selector';
import { useTeam } from '@app/hooks/useTeam';
import { SliderSelector } from '@app/components/common/inputComponent';
import './style.css';

type ItemType = {
  name: string,
  id: string
}

const teamsData: ItemType[] = [
  { name: 'Equipo A', id: '1' },
  { name: 'Equipo B', id: '2' },
  { name: 'Equipo C', id: '3' },
];

const usersData: ItemType[] = [
  { name: 'Usuario 1', id: '1' },
  { name: 'Usuario 2', id: '2' },
  { name: 'Usuario 3', id: '3' },
  { name: 'Usuario 4', id: '4' },
  { name: 'Usuario 5', id: '5' },
];

function TeamSection() {
  const [teams] = useState<ItemType[]>(teamsData);
  const { setCurrenCategory, addCategoryByName } = useTeam();
  const [selectedId, setSelectedId] = useState<string>('2dc');
  const { currentCategoryId, teamCategory } = useAppSelector(teamSelector);
  const teamCategoryAdapter = teamCategory.map((category) => ({ id: category.categoryid, name: category.name }));

  function handleAccordion(id: string) {
    if (selectedId !== id) {
      setSelectedId(id);
      return;
    }
    setSelectedId('');
  }

  return (
    <>
      <section className='team-container'>
        <SliderSelector data={teams} />
      </section>
      {
        <Accordion
          label={'Categories'}
          showContent={selectedId === 'acc1'}
          handleShow={handleAccordion} 
          id={'acc1'}>
          <DynamicSelector
            elements={teamCategoryAdapter}
            selectedId={currentCategoryId}
            onSelect={(id) => setCurrenCategory(id)}
            onClick={(name) => {addCategoryByName(name);} }
            newTabElement={''}
          />
        </Accordion>
      }
      <Accordion
        label={'Users'}
        showContent={selectedId === 'acc2'}
        handleShow={handleAccordion}
        id={'acc2'}
      >
        <>
          {
            usersData.map((item) => (
              // eslint-disable-next-line react/jsx-key
              <ListItem key={item.id}>
                {item.name}
              </ListItem>
            ))
          }
        </>
      </Accordion>
    </>
  );
}

export default TeamSection;
