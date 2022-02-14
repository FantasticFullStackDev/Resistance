import React, { useState, useContext, useReducer } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import Zoom from '@mui/material/Zoom';
import { makeStyles } from '@mui/styles';

import { useRouter } from "next/router";
import { useSession, getSession } from 'next-auth/react';

import Pusher from "pusher-js";

import {
  AvatarGroup, Avatar, Button, Switch, Tooltip, Chip,
  Grid, IconButton, Typography, List, ListItem, ListItemText, Slider,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";

// Components
import PinInput from "../../components/PinInput";


// Resources
import { useRContext } from "../../hooks/useRContext";

// Icons
// import { CoinIcon, GameChangeIcon, WhatIcon } from "../../resources/ResistanceIcons";

// Images
import bg from '../../public/images/background.png';

// Reducer

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   if (!(session && session.token)) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }
//   return {
//     props: { session }
//   }
// }

export default function VerifyCode() {
  const router = useRouter();
  const classes = useStyles();

  const [error, setError] = useState("");
  const { data: session, status } = useSession();

  const [context, dispatchContext] = useRContext();
  console.log("Verify Code: Context", context);

  function handleChangePin(value) {
    dispatchContext({
      type: "update",
      payload: { game_code: value }
    });
  }

  function verifyCode() {
    const gameCodeLength = context.game_code.length;
    const isUpperCaseGameCode = context.game_code.match(/[A-Z]/);

    if (gameCodeLength === 6 && isUpperCaseGameCode) {
      axios(context.game_api + '/verify_code?game_code=' + context.game_code, {
        method: "GET",
        mode: "cors",
        headers: {
          'Authorization': `Bearer ${session.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data.status === true) {
          console.log("S -> Verify Code:", response.data);
          const results = response.data.entity;
          dispatchContext({
            type: "update",
            payload: {
              coin: results.total_coin,
              host: results.host_player.player_name,
              host_photo: results.host_player.player_photo_url,
              total_players: results.number_of_player,
            }
          });
          router.push("/game/start");
        }
        else {
          console.log("E1 -> Verify code:", response);
          setError("Invalid Code! Please Check")
        }
      }).catch(function (error) {
        console.log("E2 -> Verify code:", error);
        setError("Invalid Code! Please Check")
      });
    }
    else {
      setError("Invalid Code! Please Check")
    }
  }

  return (
    <Dialog open={true} BackdropProps={{ style: { background: `url(${bg.src})` } }} PaperProps={{ style: { width: "43.4rem", height: "43.4rem", borderRadius: "4.0rem" } }}>
      <DialogTitle variant="h3" sx={{ background: "#f2f2f2", textAlign: "center" }}>
        Join Game
      </DialogTitle>
      <DialogContent sx={{ padding: "32px 50px !important" }}>
        <PinInput max={6} value={""} onChange={handleChangePin} />
        {error !== ""
          ? <Typography variant="body1" sx={{ marginTop: "32px", textAlign: "center" }} > {error}</Typography>
          : <Typography variant="body1" sx={{ marginTop: "32px", textAlign: "center" }} > Get the code from your game host.<br /> Any player in your group can host</Typography>
        }
      </DialogContent>
      <DialogActions sx={{ padding: "0 50px 40px 50px ", }}>
        <Button variant="contained" color="primary" size="small" tabIndex={6} autoFocus onClick={verifyCode} sx={{ display: "flex", flex: 1, borderRadius: "9999px", }}> Continue </Button>
      </DialogActions>
    </Dialog>
  )
}


const useStyles = makeStyles((theme) => ({
  wrapperOne: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundImage: `url(${bg.src})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'top center',
  },
  avatar: {
    width: "72px",
    height: "72px",
    border: "1px solid #fff",
    boxShadow: "0px 0px 6px rgba(0,0,0,0.6)",
    borderRadius: 5
  },
}));
