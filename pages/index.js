import React, { useContext } from "react";
import Link from "next/link";
import Image from 'next/image';
// import Pusher from "pusher-js";
import { Box } from "@mui/system";
import { makeStyles } from '@mui/styles';

// Images
import logo from '../public/images/logo.png';
import mafia from '../public/images/mafia.png';
import bg from '../public/images/background.png';
import avatar from '../public/images/avatar.png';
import avalon from '../public/images/avalon.png';
import werewolf from '../public/images/werewolf.png';

import team_spy from '../public/images/team_spy.png';
import team_resistance from '../public/images/team_resistance.png';

import { Button, Grid, IconButton, Typography } from "@mui/material";

// Icons
import AddIcon from '@mui/icons-material/Add';
import { CoinIcon, GameChangeIcon } from "../resources/ResistanceIcons";
import ExtensionIcon from '@mui/icons-material/Extension';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

import {useRContext} from "../hooks/useRContext";

import { useSession, signOut, getSession } from 'next-auth/react';

// Hooks
import useKeypress from "../hooks/useKeyPress";
import {useRouter} from "next/router";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!(session && session.token)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: { session }
  }
}

export default function Index() {
  const classes = useStyles();
  const [context, dispatchContext] = useRContext();

  const { data: session, status } = useSession();
  const router = useRouter();

  // On pressing h key player can host game
  useKeypress('h',()=>{
    router.push('game/host')
  })

  // On pressing j key player can join game
  useKeypress('j',()=>{
    router.push('game/join')
  })

  return (
    <Box className={classes.wrapperOne}>
      <Grid container>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "64px" }}>
          <Link href="/settings/profile">
            <a>
              <Image width={72} height={72} className={classes.avatar} src={session.user ? session.user.info.profile_url : avatar} alt="background" />
            </a>
          </Link>
          <Box sx={{ paddingLeft: "16px" }}>
            <Typography sx={{ color: "#FFF !important" }} variant="h4">Hi! there</Typography>
            <Typography sx={{ color: "#FFF !important" }} variant="h2">{session?.user.name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", padding: "64px" }}>
          <Box sx={{ position: "relative", paddingLeft: "43px", background: "#04001E", borderRadius: "0 21px 21px 0", display: "flex", alignItems: "center", flexDirection: "row", height: 86, width: "auto" }}>
            <CoinIcon style={{ width: 86, height: 86, position: "absolute", left: "-43px" }} />
            <Box sx={{ padding: "0 16px" }}>
              <Typography sx={{ color: "#FFF !important" }} variant="h6">Total Coins</Typography>
              <Typography sx={{ color: "#FFF !important" }} variant="h2">{context.total_coin}</Typography>
            </Box>
            <IconButton onClick={signOut} variant="contained" color="primary" aria-label="delete" style={{ background: "#4E3EC8", width: "56px", height: "56px", margin: "15px" }}>
              <AddIcon style={{ color: "#fff", height: 24, width: 24 }} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ flex: 1 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }} >
          <Image src={logo} alt="Resistance" />
          <Box sx={{ flex: 1, display: "flex", justifyContent: "space-around", alignItems: "flex-end", paddingBottom: "100px" }}>
            <Link href="/game/host">
              <Button className={classes.btn_host} color="secondary" size="large" variant="contained" startIcon={<ExtensionIcon />}>
                Host Game
              </Button>
            </Link>
            {/* <Button onClick={() => dispatchModal({ type: 'host_game' })} color="secondary" size="large" sx={{ width: "25.4rem", height: "6.4rem", color: "#262A41", borderRadius: "999px", margin: "0 6px", }} variant="contained" startIcon={<ExtensionIcon />}>Host Game</Button> */}
            <IconButton onClick={() => dispatchModal({ type: 'switch_game' })} variant="contained" color="primary" size="large" sx={{ background: "#4E3EC8", color: "#262A41", borderRadius: "999px", width: "6.4rem", height: "6.4rem", margin: "0 6px", "&:hover": { background: "#4E3EC8" } }}  >
              <GameChangeIcon />
            </IconButton>
            <Link href="/game/join">
              <Button  color="tertiary" size="large" sx={{ width: "25.4rem", height: "6.4rem", background: "#fff", color: "#262A41", borderRadius: "999px", marginLeft: "8px", }} variant="contained" startIcon={<SportsEsportsIcon />}>Join Game</Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
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
  btn_host: {
    width: "25.4rem",
    height: "6.4rem",
    color: "#262A41",
    borderRadius: "999px",
    margin: "0 6px",
  }
}));
