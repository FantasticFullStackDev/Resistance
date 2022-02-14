import React, { useMemo } from 'react';
import HeaderCapsule from '../../../daily_co/components/HeaderCapsule';
import { useParticipants } from '../../../daily_co/contexts/ParticipantsProvider';
import { useUIState } from '../../../daily_co/contexts/UIStateProvider';

export const Header = () => {
  const { participantCount } = useParticipants();
  const { customCapsule } = useUIState();

  return useMemo(
    () => (
      <header className="room-header">
        {/* <img
          src={'https://uploads-ssl.webflow.com/5f6defa23b1546800ed31353/5fa6bd9a6251b01d7ab61fd6_app_logo_resistance_512px.png'}
          alt="Daily"
          className="logo"
          width="80"
          height="32"
        /> */}

        {/* <HeaderCapsule>{"Resistance"}</HeaderCapsule> */}
        <HeaderCapsule>
          {`${participantCount} ${
            participantCount === 1 ? 'Player Connected' : 'Players Connected'
          }`}
        </HeaderCapsule>
        {/* {customCapsule && (
          <HeaderCapsule variant={customCapsule.variant}>
            {customCapsule.variant === 'recording' && <span />}
            {customCapsule.label}
          </HeaderCapsule>
        )} */}

        <style jsx>{`
          .room-header {
            display: flex;
            flex: 0 0 auto;
            column-gap: var(--spacing-xxs);
            box-sizing: border-box;
            padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-xxs)
              var(--spacing-sm);
            align-items: center;
            justify-content:center;
            width: 100%;
          }

          .logo {
            margin-right: var(--spacing-xs);
          }
        `}</style>
      </header>
    ),
    [participantCount, customCapsule]
  );
};

export default Header;
