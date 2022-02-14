import React, { useEffect, useState } from 'react';
import Button from '../../../daily_co/components/Button';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '../../../daily_co/components/Card';
import Field from '../../../daily_co/components/Field';
import { TextInput, BooleanInput } from '../../../daily_co/components/Input';
import Well from '../../../daily_co/components/Well';
import PropTypes from 'prop-types';

/**
 * Intro
 * ---
 * Specify which room we would like to join
 */
export const Intro = ({
  room,
  error,
  domain,
  onJoin,
  title,
  fetching = false,
  forceFetchToken = false,
  forceOwner = false,
}) => {
  const [roomName, setRoomName] = useState();
  const [fetchToken, setFetchToken] = useState(forceFetchToken);
  const [owner, setOwner] = useState(forceOwner);

  useEffect(() => {
    setRoomName(room);
  }, [room]);

  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>
        {error && (
          <Well variant="error">
            Failed to obtain token <p>{error}</p>
          </Well>
        )}
        <Field label="Enter room to join">
          <TextInput
            type="text"
            prefix={`${domain}.daily.co/`}
            placeholder="Room name"
            defaultValue={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
        </Field>
        {!forceFetchToken && (
          <Field label="Fetch meeting token">
            <BooleanInput onChange={(e) => setFetchToken(e.target.checked)} />
          </Field>
        )}
        {fetchToken && !forceOwner && (
          <Field label="Join as owner">
            <BooleanInput onChange={(e) => setOwner(e.target.checked)} />
          </Field>
        )}
      </CardBody>
      <CardFooter divider>
        <Button
          onClick={() => onJoin(roomName, owner, fetchToken)}
          disabled={!roomName || fetching}
        >
          {fetching ? 'Fetching token...' : 'Join meeting'}
        </Button>
      </CardFooter>
    </Card>
  );
};

Intro.propTypes = {
  room: PropTypes.string,
  title: PropTypes.string,
  error: PropTypes.string,
  domain: PropTypes.string.isRequired,
  onJoin: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  forceFetchToken: PropTypes.bool,
  forceOwner: PropTypes.bool,
};

export default Intro;
