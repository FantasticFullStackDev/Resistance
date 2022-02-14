import React from 'react';
// import { NETWORK_ASIDE } from '../Aside/NetworkAside';
// import { PEOPLE_ASIDE } from '../Aside/PeopleAside';
import { DEVICE_MODAL } from '../DeviceSelectModal';
import { useCallState } from '../../contexts/CallProvider';
import { useMediaDevices } from '../../contexts/MediaDeviceProvider';
import { useUIState } from '../../contexts/UIStateProvider';
import IconCameraOff from '../../icons/camera-off-md.svg';
import IconCameraOn  from '../../icons/camera-on-md.svg';
// import IconLeave  from '../../icons/leave-md.svg';
import IconMicOff from '../../icons/mic-off-md.svg';
import IconMicOn from '../../icons/mic-on-md.svg';
// import IconNetwork from '../../icons/network-md.svg';
// import IconPeople from '../../icons/people-md.svg';
import IconSettings from '../../icons/settings-md.svg';
import { Tray, TrayButton } from './Tray';

export const BasicTray = () => {
  const { callObject, leave } = useCallState();
  const { customTrayComponent, openModal, toggleAside } = useUIState();
  const { isCamMuted, isMicMuted } = useMediaDevices();

  const toggleCamera = (newState) => {
    if (!callObject) return false;
    return callObject.setLocalVideo(newState);
  };

  const toggleMic = (newState) => {
    if (!callObject) return false;
    return callObject.setLocalAudio(newState);
  };

  return (
    <Tray>
      <TrayButton
        // label="Camera"
        onClick={() => toggleCamera(isCamMuted)}
        orange={isCamMuted}
      >
        {isCamMuted ? <IconCameraOff /> : <IconCameraOn />}
      </TrayButton>
      <TrayButton
        // label="Mic"
        onClick={() => toggleMic(isMicMuted)}
        orange={isMicMuted}
      >
        {isMicMuted ? <IconMicOff /> : <IconMicOn />}
      </TrayButton>
      <TrayButton
          // label="Settings"
          onClick={() => openModal(DEVICE_MODAL)}>
        <IconSettings />
      </TrayButton>
      {/* <TrayButton label="Network" onClick={() => toggleAside(NETWORK_ASIDE)}>
        <IconNetwork />
      </TrayButton>
      <TrayButton label="People" onClick={() => toggleAside(PEOPLE_ASIDE)}>
        <IconPeople />
      </TrayButton> */}

      {customTrayComponent}

      {/* <span className="divider" />

      <TrayButton label="Leave" onClick={() => leave()} orange>
        <IconLeave />
      </TrayButton> */}
    </Tray>
  );
};
export default BasicTray;
