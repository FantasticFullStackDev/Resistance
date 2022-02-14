import React from 'react';
import { NetworkAside } from '../../../daily_co/components/Aside';
import { PeopleAside } from '../../../daily_co/components/Aside';
import { useUIState } from '../../../daily_co/contexts/UIStateProvider';

export const Asides = () => {
  const { asides } = useUIState();

  return (
    <>
      <PeopleAside />
      <NetworkAside />
      {asides.map((AsideComponent) => (
        <AsideComponent key={AsideComponent.name} />
      ))}
    </>
  );
};

export default Asides;
