import React from 'react';
import {
  WaitingRoomModal,
  WaitingRoomNotification,
} from '../../../daily_co/components/WaitingRoom';
import { useWaitingRoom } from '../../../daily_co/contexts/WaitingRoomProvider';

export const WaitingRoom = () => {
  const { setShowModal, showModal } = useWaitingRoom();
  return (
    <>
      <WaitingRoomNotification />
      {showModal && <WaitingRoomModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default WaitingRoom;
