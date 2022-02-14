import React, { useState, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/system";
import Zoom from '@mui/material/Zoom';
import { makeStyles } from '@mui/styles';

import { useRouter } from "next/router";
import { useSession, getSession } from 'next-auth/react';

import NanoBar from "../../components/NanoBar";

import Pusher from "pusher-js";
import Image from "next/image";

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
import CoinIcon from "../../assets/icons/CoinIcon";

// Images
import bg from '../../public/images/background.png';
import team_spy from '../../public/images/team_spy.png';
import team_resistance from '../../public/images/team_resistance.png';


export default function HostGame() {
    const router = useRouter();
    const classes = useStyles();

    const { data: session, status } = useSession();

    const [context, dispatchContext] = useRContext();
    const [totalPlayerJoin,setTotalPlayerJoin] = useState(0);

    const handleSelectTeam = (event) => {
        dispatchContext({
            type: "update",
            payload: { selected_team: event.currentTarget.value }
        });
    }

    const handleTimerEnd = () => {
        console.log("Timer Start:");

        dispatchContext({
            type: "update",
            payload: { show_bar: false }
        });

        axios(context.game_api + '/select_role', {
            method: "PUT",
            mode: "cors",
            headers: {
                'Authorization': `Bearer ${session.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                "_id": context.channel_id,
                "game_code": context.game_code,
                "role": context.selected_team === undefined
                    ? []
                    : [{
                        "role_name": context.selected_team,
                        "coin": 0
                    }]
            }
        }).then((response) => {
            console.log('S -> Select Role: ', response);
        }).catch(function (error) {
            console.log("E -> Select Role:", error);
        });
    }

    useEffect(() => {
        context.channel.bind('role_selected', data => {
            console.log("UE -> Role selected: ", data);
            setTotalPlayerJoin((prev) => prev +1);
        });
        
        context.channel.bind('select_team', data => {
            console.log("UE -> Select Team: ", data);
            dispatchContext({
                type:'update',
                payload:{
                    team_config:data
                }
            })
        })
        context.channel.bind('game_ready', data => {
            axios(context.game_api + '/game_players?_id=' + context.channel_id + "&game_code=" + context.game_code, {
                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${session.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log("S -> Get Players:", response);
                dispatchContext({
                    type: "update",
                    payload: {
                        game_config: response.data.entity,
                    }
                });
                router.push('/game');
            }).catch(function (error) {
                console.log("E -> Get Players:", error);
            });
        });

    }, [context.channel]);

    useEffect(() => {
        if (context.is_host && totalPlayerJoin === context.total_players) {
            axios(context.game_api + '/distribute_role?_id=' + context.channel_id + "&game_code=" + context.game_code, {
                method: "GET",
                mode: "cors",
                headers: {
                    'Authorization': `Bearer ${session.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log("Distribute Role:", response);


            }).catch(function (error) {
                console.log("E2 -> Distribute Role:", error);
            });
        }
    }, [totalPlayerJoin])


    return (
        <>
            {context.show_bar && <NanoBar time={10} onEnd={handleTimerEnd} />}
            <Dialog open={true} BackdropProps={{ style: { background: `url(${bg.src})` } }} PaperProps={{ style: { width: "73.0rem", borderRadius: "4.0rem" } }}>
                <DialogTitle variant="h2" sx={{ background: "#f2f2f2", textAlign: "center" }}>
                    Select Team
                </DialogTitle>
                <DialogContent sx={{ padding: "32px 50px !important", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", margin: "1.2rem 0 3.4rem 0" }}>
                                You can select your preferred team!<br />Otherwise, a role will be randomly assigned.
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                <Image src={team_spy.src} width={300} height={220} className={classes.img_team} alt="Team Spy" />
                                <Box data-id={context.selected_team} sx={{ width: "100%", height: "6.2rem", background: context.selected_team === 'Spy' ? "#13E20F" : "#f2f2f2", color: "#262A41", fontWeight: 700, borderRadius: "0 0 0.8rem 0.8rem", marginBottom: "3.0rem", fontSize: "2.0rem", lineHeight: "6.2rem", textAlign: "center" }}>Spy</Box>
                                {context.selected_team === "" &&
                                    <Button variant="contained" color="primary" sx={{ cursor: "pointer", maxWidth: "100%", width: "auto", borderRadius: "999px", color: "#fff" }} onClick={handleSelectTeam} value="Spy">
                                        <Typography variant="h3" sx={{ marginRight: "0.4rem", color: "#fff !important" }}>Select</Typography>
                                        <Chip color="default" sx={{ height: "3.0rem", fontSize: "1.6rem", color: "#fff", backgroundColor: "rgba(255, 255, 255, 0.16)", padding: "0px !important" }} icon={<CoinIcon style={{ width: "2.0rem", height: "2.0rem" }} />} label="5" />
                                    </Button>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Image src={team_resistance.src} width={300} height={220} className={classes.img_team} alt="Team Resistance" />
                            <Box data-id={context.selected_team} sx={{ width: "100%", height: "6.2rem", background: context.selected_team === 'Resistance' ? "#13E20F" : "#f2f2f2", color: "#262A41", fontWeight: 700, borderRadius: "0 0 0.8rem 0.8rem", marginBottom: "3.0rem", fontSize: "2.0rem", lineHeight: "6.2rem", textAlign: "center" }}>Resistance</Box>
                            {context.selected_team === "" &&
                                <Button variant="contained" color="primary" sx={{ cursor: "pointer", borderRadius: "999px", color: "#fff" }} onClick={handleSelectTeam} value="Resistance">
                                    <Typography variant="h3" sx={{ marginRight: "0.4rem", color: "#fff !important" }}>Select</Typography>
                                    <Chip color="default" sx={{ height: "3.0rem", fontSize: "1.6rem", color: "#fff", backgroundColor: "rgba(255, 255, 255, 0.16)", padding: "0px !important" }} icon={<CoinIcon style={{ width: "2.0rem", height: "2.0rem" }} />} label="5" />
                                </Button>
                            }
                        </Grid>
                        {context.selected_team !== "" &&
                            <Grid item xs={12}>
                                <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", marginTop: "1.0rem" }}>
                                    You have selected {context.selected_team}!
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
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
    img_team: {
        width: "100%",
        borderRadius: "0.8rem 0.8rem 0 0",
        display: "block"
    },
}));
