import React, { useState} from "react";
import axios from "axios";
import Pusher from "pusher-js";
import { useRouter } from "next/router";
import { useSession, getSession } from 'next-auth/react';

import { Box } from "@mui/system";
import { Zoom } from '@mui/material';
import { makeStyles } from '@mui/styles';

import {
    Avatar, Button, Switch, Tooltip, Chip, IconButton,
    Typography, List, ListItem, ListItemText, Slider,
    Dialog, DialogActions, DialogContent, DialogTitle,
} from "@mui/material";

// Context
import { useRContext } from "../../hooks/useRContext";

// Icons
import { CoinIcon, WhatIcon } from "../../resources/ResistanceIcons";

// Images
import bg from '../../public/images/background.png';


// export async function getServerSideProps(context) {
//     const session = await getSession(context);
//     if (!(session && session.token)) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             },
//         }
//     }
//     return {
//         props: { session }
//     }
// }

export default function HostGame(session2) {
    const {
        data: session,
        status
    } = useSession();

    const router = useRouter();
    const classes = useStyles();
    
    const [context, dispatchContext] = useRContext();

    const [role, setRole] = useState(true);
    const [coin, setCoin] = useState(0);
    const [totalPlayer, setTotalPlayer] = useState(5);

    const hostGame = () => {
        axios(context.game_api + '/host', {
            method: "POST",
            mode: "cors",
            headers: {
                'Authorization': `Bearer ${session.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                coin: coin,
                number_of_player: totalPlayer,
                allow_role_choice: role,
            },
        }).then((response) => {
            console.log('Host game: ', response.data);
            const channel_name = 'presence-' + response.data.entity._id;

            const pusher = new Pusher(context.pusher_key, {
                cluster: context.pusher_cluster,
                encrypted: true,
                authEndpoint: context.pusher_auth_url,
                auth: {
                    headers: { 'Authorization': `Bearer ${session.token}` },
                    params: { 'name': session.user.name }
                }
            });

            const channel = pusher.subscribe(channel_name);

            const results = response.data.entity;

            let players = [];
            let host = "";

            for (let i = 0; i < results.players.length; i++) {
                if (results.players[i].is_host) {
                    host = results.players[i].player_name;
                }
                players.push(results.players[i].player_name);
            }

            dispatchContext({
                type: "update",
                payload: {
                    is_host: true,
                    pusher: pusher,
                    host: host,
                    channel: channel,
                    channel_id: results._id,
                    game_code: results.game_code,
                    total_coin: results.total_coin,
                    role_choice: results.allow_role_choice,
                    total_players: results.number_of_player,
                    joined_players: players,
                }
            });

            router.push('/game/code', undefined, { shallow: true });
        }).catch(function (error) {
            console.log("E -> Host Game:", error);
        });
    }

    return (
        <Dialog open={true} onClose={() => router.back()} BackdropProps={{ style: { background: `url(${bg.src})` } }} PaperProps={{ style: { width: "43.4rem", height: "43.4rem", borderRadius: "4.0rem" } }}>
            {session && session.user &&
                <>
                    <DialogTitle variant="h2" sx={{ background: "#f2f2f2", textAlign: "center" }}>
                        Host Game
                    </DialogTitle>
                    <DialogContent sx={{ padding: "32px 50px !important" }}>
                        <List>
                            <ListItem secondaryAction={<Avatar variant="rounded" sx={{ color: "#262A41", backgroundColor: "#f9f9f9", border: "1px solid #DEDFE3" }}>{totalPlayer}</Avatar>}>
                                <ListItemText
                                    variant="h3"
                                    primary={<Typography variant="h4">Number of Players:</Typography>}
                                    sx={{ paddingRight: "32px", fontSize: "2.0rem !important", fontWeight: "800" }}
                                    secondary={<Slider min={5} max={10} color="primary" className={classes.slider} onChange={(e, v) => { setTotalPlayer(v) }} />} />
                            </ListItem>
                            <ListItem secondaryAction={<Switch onChange={(e) => { setRole(e.target.checked) }} className={classes.switch} defaultChecked />}>
                                <ListItemText
                                    sx={{ paddingRight: "32px" }}
                                    primary={
                                        <Typography variant="h4">
                                            Allow Role Choices  &nbsp;
                                            <Tooltip
                                                arrow
                                                color="primary"
                                                placement="top"
                                                classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
                                                TransitionComponent={Zoom}
                                                title={
                                                    <Box sx={{ maxWidth: "25.5rem", }}>
                                                        <Typography sx={{ color: "#fff !important", fontSize: "1.5rem" }}>
                                                            Players have a choice of Spy or Resistance before the game.
                                                        </Typography><br />
                                                        <Typography sx={{ color: "#fff !important", fontSize: "1.5rem" }}>
                                                            Enable this option to host Resistance games for FREE!
                                                        </Typography>
                                                    </Box>}>
                                                <IconButton><WhatIcon /></IconButton>
                                            </Tooltip>
                                        </Typography>
                                    } />

                            </ListItem>
                        </List>
                    </DialogContent>
                    <DialogActions sx={{ padding: "0 50px 40px 50px ", }}>
                        <Button variant="contained" color="primary" sx={{ borderRadius: "999px", color: "#fff", width: "100%" }} onClick={hostGame}>
                            <Typography variant="h3" sx={{ marginRight: "0.4rem", color: "#fff !important" }}>Start Game &nbsp;</Typography>
                            {!role && <Chip color="default" sx={{ height: "3.0rem", fontSize: "1.6rem", color: "#fff", backgroundColor: "rgba(255, 255, 255, 0.16)", padding: "0px !important" }} icon={<CoinIcon style={{ width: "2.0rem", height: "2.0rem" }} />} label="5" />}
                        </Button>
                        {/* <Button variant="contained" color="primary" size="small" autoFocus onClick={handleClose} sx={{ display: "flex", flex: 1, borderRadius: "9999px", }}> Continue </Button> */}
                    </DialogActions>
                </>
            }
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
