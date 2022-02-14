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

// Resources
import { useRContext } from "../../hooks/useRContext";

// Icons
import { CoinIcon, GameChangeIcon, WhatIcon } from "../../resources/ResistanceIcons";

// Images
import bg from '../../public/images/background.png';
import avatar from '../../public/images/avatar.png';

const error = {
    "M001": "Invalid Code! Please Check",
}


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

export default function JoinGame() {
    const router = useRouter();
    const classes = useStyles();

    const { data: session, status } = useSession();
    const [context, dispatchContext] = useRContext();

    function joinGame() {
        axios(context.game_api + '/join', {
            method: "PUT",
            mode: "cors",
            headers: {
                'Authorization': `Bearer ${session.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                game_code: context.game_code,
                coin: context.coin,
            },
        }).then((response) => {
            console.log('S -> Join Game: ', response.data);
            const channel_name = 'presence-' + response.data.entity._id;

            const pusher = new Pusher(context.pusher_key, {
                encrypted: true,
                cluster: context.pusher_cluster,
                authEndpoint: context.pusher_auth_url,
                auth: {
                    headers: { 'Authorization': `Bearer ${session.token}` },
                    params: { 'name': context.name }
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
                    pusher: pusher,
                    channel: channel,
                    channel_id: results._id,
                    host: host,
                    game_code: results.game_code,
                    total_coin: results.total_coin,
                    role_choice: results.allow_role_choice,
                    total_players: results.number_of_player,
                    joined_players: players
                }
            });


            if (results.players.length === results.number_of_player) {
                dispatchContext({
                    type: "update",
                    payload: { show_bar: true}
                });
                router.push("/game/team");
            }
            else{
                router.push("/game/code");
            }
            // else {
            //     for (let i = 0; i < results.players.length; i++) {
            //         if (results.players[i].is_host) {
            //             host = results.players[i].player_name;
            //         }
            //         players.push(results.players[i].player_name);
            //     }

            //     dispatchContext({
            //         type: "update",
            //         payload: {
            //             pusher: pusher,
            //             channel: channel,
            //             channel_id: results._id,
            //             host: host,
            //             game_code: results.game_code,
            //             total_coin: results.total_coin,
            //             role_choice: results.allow_role_choice,
            //             total_players: results.number_of_player,
            //             joined_players: players
            //         }
            //     });
            //     router.push("/game/code");
            // }
        }).catch(function (error) {
            console.log("E -> Join Game: ", error);
        });
    }

    return (
        <Dialog open={true} BackdropProps={{ style: { background: `url(${bg.src})` } }} PaperProps={{ style: { width: "43.4rem", height: "43.4rem", borderRadius: "4.0rem" } }}>
            <DialogTitle variant="h3" sx={{ background: "#f2f2f2", textAlign: "center" }}>
                Game Details
            </DialogTitle>
            <DialogContent sx={{ padding: "32px 50px !important" }}>
                <List>
                    <ListItem secondaryAction={<Avatar variant="rounded" src={context?.host_photo}></Avatar>}>
                        <ListItemText sx={{ paddingRight: "32px" }} primary={<Typography variant="h4" sx={{ fontSize: "2.0rem", fontWeight: "600" }}>Game Host</Typography>} secondary={context.host} />
                    </ListItem>
                    <ListItem secondaryAction={<Avatar variant="rounded" sx={{ border: "1px solid rgba(38, 42, 65, 0.15)", background: "#f2f2f2", color: "#262A41" }}>{context.total_players}</Avatar>}>
                        <ListItemText sx={{ paddingRight: "32px" }} primary={<Typography variant="h4" sx={{ fontSize: "2.0rem", fontWeight: "600" }}>Number of players</Typography>} />
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions sx={{ padding: "0 50px 40px 50px ", }}>
                <Button variant="contained" color="primary" sx={{ borderRadius: "999px", color: "#fff", width: "100%" }} onClick={joinGame}>
                    <Typography variant="h3" sx={{ marginRight: "0.4rem", color: "#fff !important" }}>Start Game &nbsp;</Typography>
                    <Chip color="default" sx={{ height: "3.0rem", fontSize: "1.6rem", color: "#fff", backgroundColor: "rgba(255, 255, 255, 0.16)", padding: "0px !important" }} icon={<CoinIcon style={{ width: "2.0rem", height: "2.0rem" }} />} label="5" />
                </Button>
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
