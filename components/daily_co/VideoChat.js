import React, { useState, useCallback, useEffect } from 'react';
import { CallProvider } from '../../daily_co/contexts/CallProvider';
import { MediaDeviceProvider } from '../../daily_co/contexts/MediaDeviceProvider';
import { ParticipantsProvider } from '../../daily_co/contexts/ParticipantsProvider';
import { TracksProvider } from '../../daily_co/contexts/TracksProvider';
import { UIStateProvider } from '../../daily_co/contexts/UIStateProvider';
import { WaitingRoomProvider } from '../../daily_co/contexts/WaitingRoomProvider';
import getDemoProps from '../../daily_co/lib/demoProps';
import PropTypes from 'prop-types';
import App from './App';
import CreatingRoom from './Prejoin/CreatingRoom';
import Intro from './Prejoin/Intro';
import NotConfigured from './Prejoin/NotConfigured';

import { useSession } from 'next-auth/react';
import useSessionStorage from '../../hooks/useSessionStorage';
import { useRContext } from '../../hooks/useRContext';
import { getToken } from 'next-auth/jwt';

export async function getStaticProps() {
  const defaultProps = getDemoProps();
  // console.log(defaultProps);
  return {
    props: defaultProps,
  };
}

/**
 * Index page
 * ---
 * - Checks configuration variables are set in local env
 * - Optionally obtain a meeting token from Daily REST API (./pages/api/token)
 * - Set call owner status
 * - Finally, renders the main application loop
 */
export default function VideoChat({
  domain,
  isConfigured = false,
  forceFetchToken = false,
  forceOwner = false,
  subscribeToTracksAutomatically = true,
  demoMode = true,
  asides,
  modals,
  customTrayComponent,
  customAppComponent,
}) {
  const { data: session, status } = useSession();
  const [roomName, setRoomName] = useState();
  const [fetchingToken, setFetchingToken] = useState(false);
  const [token, setToken] = useState();
  const [tokenError, setTokenError] = useState();

  // const [meetingToken, setMeetingToken] = useSessionStorage('meeting_token', '');
  const [context, dispatchContext] = useRContext();

  /**
   * Main call UI
   */

  useEffect(() => {
    if (token) return;
    console.log(session?.user?.info?._id,context);
    let profile_info = context?.game_config?.players?.filter(player => player.player_id === session?.user?.info?._id);
    console.log("Players Info:", profile_info);

    setFetchingToken(true);

    async function getToken() {
      const response2 = await fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName: context?.game_config?._id,
          userName: profile_info[0]?.player_name,
          userId: profile_info[0]?.player_id,
          isOwner: false
        }),
      });

      const resMeeting = await response2.json();
      console.log("Meeting Token Response: ", resMeeting);

      if (!resMeeting?.token) {
        setTokenError(resMeeting?.error || true);
        setFetchingToken(false);
        return false;
      }
      console.log(`🪙 Token received`, resMeeting?.token);

      setFetchingToken(false);
      setToken(resMeeting.token);
      // setMeetingToken(resMeeting.token);
    }
    getToken();
  }, [context,session, token])

  if (!token) return (<div>Loading...</div>);
  return (
    <UIStateProvider asides={asides} modals={modals} customTrayComponent={customTrayComponent}>
      {/* <CallProvider domain={domain} room={context?.game_config?._id} token={meetingToken} subscribeToTracksAutomatically={true}> */}
        {/* <CallProvider domain={domain} room={roomName} token={token} subscribeToTracksAutomatically={true}> */}
      <CallProvider domain={domain} room={context?.game_config?._id} token={token} subscribeToTracksAutomatically={true}>
        <ParticipantsProvider>
          <TracksProvider>
            <MediaDeviceProvider>
              <WaitingRoomProvider>
                {customAppComponent || <App />}
              </WaitingRoomProvider>
            </MediaDeviceProvider>
          </TracksProvider>
        </ParticipantsProvider>
      </CallProvider>
    </UIStateProvider>
  );
}

VideoChat.propTypes = {
  isConfigured: PropTypes.bool.isRequired,
  domain: PropTypes.string,
  asides: PropTypes.arrayOf(PropTypes.func),
  modals: PropTypes.arrayOf(PropTypes.func),
  customTrayComponent: PropTypes.node,
  customAppComponent: PropTypes.node,
  forceFetchToken: PropTypes.bool,
  forceOwner: PropTypes.bool,
  subscribeToTracksAutomatically: PropTypes.bool,
  demoMode: PropTypes.bool,
};


