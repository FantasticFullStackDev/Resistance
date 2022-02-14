import React from 'react';
import DeviceSelectModal from '../../../daily_co/components/DeviceSelectModal/DeviceSelectModal';
import { useUIState } from '../../../daily_co/contexts/UIStateProvider';

export const Modals = () => {
  const { modals } = useUIState();

  return (
    <>
      <DeviceSelectModal />
      {modals.map((ModalComponent) => (
        <ModalComponent key={ModalComponent.name} />
      ))}
    </>
  );
};

export default Modals;
