import React, { memo, useEffect, useState, useRef } from 'react';
import useVideoTrack from '../../hooks/useVideoTrack';
import IconMicMute from '../../icons/mic-off-sm.svg';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DEFAULT_ASPECT_RATIO } from '../../constants';
import Video from './Video';
import Avatar from './avatar.svg';
import Spy from '../../../public/images/spy_hat.png';

import { useRContext } from '../../../hooks/useRContext';
import { Phone } from '@mui/icons-material';
const SM_TILE_MAX_WIDTH = 300;

import Image from 'next/image';

export const Tile = memo(
  ({
    participant,
    showRole,
    photo,
    name,
    role,
    mirrored = true,
    showName = true,
    showAvatar = true,
    showActiveSpeaker = true,
    videoFit = 'cover',
    aspectRatio = DEFAULT_ASPECT_RATIO,
    onVideoResize,
    ...props
  }) => {
    const videoTrack = useVideoTrack(participant);
    const videoRef = useRef(null);
    const tileRef = useRef(null);
    const [tileWidth, setTileWidth] = useState(0);

    const [context, dispatchContext] = useRContext();
    // console.log(context);

    /**
     * Effect: Resize
     *
     * Add optional event listener for resize event so the parent component
     * can know the video's native aspect ratio.
     */
    useEffect(() => {
      const video = videoRef.current;
      if (!onVideoResize || !video) return false;

      const handleResize = () => {
        if (!video) return;
        const width = video?.videoWidth;
        const height = video?.videoHeight;
        if (width && height) {
          // Return the video's aspect ratio to the parent's handler
          onVideoResize(width / height);
        }
      };

      handleResize();
      video?.addEventListener('resize', handleResize);

      return () => video?.removeEventListener('resize', handleResize);
    }, [onVideoResize, videoRef, participant]);

    /**
     * Effect: Resize Observer
     *
     * Adjust size of text overlay based on tile size
     */
    useEffect(() => {
      const tile = tileRef.current;
      if (!tile || typeof ResizeObserver === 'undefined') return false;
      let frame;
      const resizeObserver = new ResizeObserver(() => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (!tile) return;
          const dimensions = tile?.getBoundingClientRect();
          const { width } = dimensions;
          setTileWidth(width);
        });
      });
      resizeObserver.observe(tile);
      return () => {
        if (frame) cancelAnimationFrame(frame);
        resizeObserver.disconnect();
      };
    }, [tileRef]);

    const cx = classNames('tile', videoFit, {
      mirrored,
      avatar: showAvatar && !videoTrack,
      screenShare: participant.isScreenShare,
      active: showActiveSpeaker && participant.isActiveSpeaker,
      small: tileWidth < SM_TILE_MAX_WIDTH,
    });


    const addToTeam = (event) => {
      let memberList = context?.team_config?.members || [];
      if (memberList.length < parseInt(context?.team_config?.team_member)) {
        if(!memberList.includes(event.currentTarget.id) && memberList.length < parseInt(context?.team_config?.team_member)){
          memberList.push(event.currentTarget.id);
          const teamConfig = {
            player_id: context?.team_config?.player_id,
            team_member: context?.team_config?.team_member,
            members: memberList
          }
          console.log(teamConfig);
          dispatchContext({
            type: 'update',
            payload: {
              team_config: teamConfig
            }
          });
        }
      }
    }

    useEffect(() => {
      console.log({ participant: participant, showRole: showRole, role: role, name: name, photo: photo });
    }, []);

    return (
      <div ref={tileRef} className={cx} {...props}>
        <div className="video-wrapper" id={participant?.user_id} onClick={addToTeam}>
          <div className="content">
            {showName && (
              <div className="name">
                {participant.isMicMuted && !participant.isScreenShare && (
                  <IconMicMute />
                )}
                {participant.name &&
                  <span style={{ paddingLeft: '8px' }}>{participant.name}</span>
                }
              </div>
            )}
            {videoTrack ? (
              <Video
                ref={videoRef}
                participantId={participant?.id}
                videoTrack={videoTrack}
              />
            ) : (
              showAvatar && (
                <div className="avatar">
                  {photo
                    ? <img src={photo} style={{ width: '100%', height: '100%' }} alt="" />
                    : <Avatar style={{ width: '35%', height: '35%' }} />
                  }
                </div>
              )
            )}
            {showRole === "Spy" && role === 'Spy' &&
              <div className="spy">
                {/*<Spy width={30} height={30} style={{ width: '100%', height: '100%' }} alt="Spy"/>*/}
                <img src={Spy.src} style={{ width: '100%', height: '100%' }} alt="" />
              </div>
            }
          </div>
        </div>
        <style jsx>{`
          .tile .content {
            padding-bottom: ${100 / aspectRatio}%;
          }
        `}</style>
        <style jsx>{`
          .tile {
            // background: var(--blue-dark);
            min-width: 1px;
            overflow: hidden;
            position: relative;
            width: 100%;
            box-sizing: border-box;
            padding:20px;
          }
          .spy{
            position: absolute;
            width: 20%;
            height: 20%;
            top:7%;
            right: 7%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 5;
            //background: #ffffff;
            //border-radius: 999px;
          }

          .tile.active:before {
            content: '';
            position: absolute;
            top: 0px;
            right: 0px;
            left: 0px;
            bottom: 0px;
            border: 2px solid var(--primary-default);
            box-sizing: border-box;
            pointer-events: none;
            z-index: 2;
            border-radius: 20px;
          }

          .tile .name {
            position: absolute;
            bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            //left: 10px;
            z-index: 2;
            line-height: 1;
            font-size: 1.4rem;
            color: white;
            font-weight: var(--weight-medium);
            padding-left: 10px;
            /* padding: var(--spacing-xxs);
            text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.45);
            gap: var(--spacing-xxs);*/
            background: rgba(28, 8, 60, 0.8);
            backdrop-filter: blur(24px);
            border-radius:12px;
            padding:6px 10px;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .tile .name :global(svg) {
            color: var(--red-default);
          }

          .tile.small .name {
            font-size: 1.4rem;
          }

          .tile :global(video) {
            height: calc(100% + 4px);
            left: -2px;
            object-position: center;
            position: absolute;
            top: -2px;
            width: calc(100% + 4px);
            z-index: 1;
            border-radius: 20px;
          }

          .tile.contain :global(video) {
            object-fit: contain;
          }

          .tile.cover :global(video) {
            object-fit: cover;
          }

          .tile.mirrored :global(video) {
            transform: scale(-1, 1);
          }

          .tile .avatar {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .video-wrapper {
            height: 100%;
            width: 100%;
            display: flex;
            // padding: 20px;
            position: relative;
            border-radius: 2.0rem;
            overflow: hidden;
            flex:1;
            background: var(--blue-dark);
            border: .3rem solid #ffffff;
          }
        `}</style>
      </div>
    );
  }
);

Tile.propTypes = {
  participant: PropTypes.object.isRequired,
  showRole: PropTypes.string,
  photo: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
  mirrored: PropTypes.bool,
  showName: PropTypes.bool,
  showAvatar: PropTypes.bool,
  aspectRatio: PropTypes.number,
  onVideoResize: PropTypes.func,
  showActiveSpeaker: PropTypes.bool,
  videoFit: PropTypes.string,
};

export default Tile;
