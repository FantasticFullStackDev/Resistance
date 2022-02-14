// noinspection JSValidateTypes

import React, { useEffect, useState, useMemo } from "react";
import { Box } from "@mui/system";
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Typography, IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Dialog } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Next js defaults
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';

// Context
import { useRContext } from "../../hooks/useRContext";

// Daily .co implementation
import getDemoProps from '../../daily_co/lib/demoProps';
import VideoChat from '../../components/daily_co/VideoChat';

// import resource files
import bg2 from '../../public/images/background2.png'
import spy from '../../public/images/spy.png'
import resistance from '../../public/images/resistance.png'
import bg from "../../public/images/background.png";
import PinInput from "../../components/PinInput";

import axios from "axios";
import QuitIcon from '../../assets/icons/QuitIcon'
import RoleView from "../../components/game/RoleView";
import TeamSelection from "../../components/game/TeamSelection";
import NanoBar from "../../components/NanoBar";



export async function getStaticProps() {
    const defaultProps = getDemoProps();
    defaultProps.demoMode = true;

    return {
        props: defaultProps,
    };
}

export default function Game(props) {
    const router = useRouter();
    const classes = useStyles();

    const { data: session, status } = useSession();
    const [context, dispatchContext] = useRContext();
    const [role, setRole] = useState('');
    const [quitModal, setQuitModal] = useState(false);
    const [leftPlayer, setLeftPlayer] = useState('');
    const [showBar, setShowBar] = useState(true);
    const [gameState, setGameState] = useState('INITIAL_STATE');

    const backToHome = () => {
        router.push('/');
    }
    const quitGame = () => {
        console.log(context.channel);
        console.log("Quit Game Ok", context.game_config);
        axios(context.game_api + '/leave_game', {
            method: "PUT",
            mode: "cors",
            headers: {
                'Authorization': `Bearer ${session?.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                _id: context?.game_config?._id,
                game_code: context?.game_config?.game_code
            }
        }).then((response) => {
            console.log("S -> Game Leave:", response);
            router.push('/');
        }).catch(function (error) {
            console.log("E -> Game Leave:", error);
        });
    }
    const showModal = () => {
        setQuitModal(true);
    }
    const closeModal = () => {
        setQuitModal(false);
    }

    const handleTimerEnd = () => {
        console.log("Timer End:");
        setShowBar(false);
        setGameState('TEAM_SELECTION_STATE');
    }

    const playerRole = useMemo(() => {
        if(context?.game_config?.players?.length > 0) return context?.game_config?.players.filter((player) => player.player_id === session?.user?.info?._id)[0]?.role;
        else return 'Resistance';
    }, [context.game_config.players]);

    const teamLeader = useMemo(() => {
        if(context?.game_config?.players?.length > 0) return context?.game_config?.players.filter((player) => player.is_team_leader === true)[0]
        else return {};
    }, [context.game_config.players]);

    const isLeader = useMemo(() => {
        console.log(teamLeader, session?.user?.info);
        if(teamLeader === undefined) return false;
        if(teamLeader.player_id === session?.user?.info?._id) return true;
        else return false;
    }, [teamLeader]);

    const totalMember = useMemo(() => {
        if(context?.team_config?.team_member) return parseInt(context.team_config.team_member);
        else return 0;
    }, [context.team_config]);

    const teamMembers = useMemo(() => {
        let members = [];
        if(context?.game_config?.players?.length > 0) {
            return context?.game_config?.players?.filter((player)=> context?.team_config?.members?.includes(player?.player_id));
        }else return [{}];
    },[context.game_config.players,context.team_config]);

    useEffect(() => {
        if (context.channel) {
            context.channel.bind('game_ended', data => {
                console.log("UE -> Game Ended: ", data);
                setLeftPlayer(context?.game_config?.players.filter((player) => player.player_id === data?.player_id)[0]?.player_name)
                showModal();
            });
        }
    }, [context.channel]);

    // useEffect(() => {
    //     if (showBar) return;
    //     handleTimerEnd();
    // }, [showBar]);

    return (
        <Box container className={classes.wrapper}>
            <Dialog open={quitModal} BackdropProps={{ style: { background: "#190d35", opacity: "0.5", backdropFilter: "blur(10px)" } }}>
                <DialogContent sx={{ padding: "46px" }} PaperProps={{ style: { borderRadius: "5px" } }}>
                    <DialogContentText sx={{ textAlign: "center" }}>
                        <QuitIcon sx={{ width: '50px', height: '50px' }} />
                        <Typography variant="h3">{leftPlayer !== '' ? 'Game Ended!' : 'Quit Game?'}</Typography>
                        <Typography variant="h6">{leftPlayer !== '' ? `${leftPlayer} has left the game` : 'This game will end for everyone!!'}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogAction}>
                    {leftPlayer !== ''
                        ? <Button className={classes.btnFull} variant="contained" color="primary" size="small"
                            onClick={backToHome} autoFocus> Back To Home </Button>
                        : <>
                            <Button className={`${classes.btnHalf} ${classes.btnCancel}`} variant="contained"
                                color="tertiary" sx={{ background: '#f2f2f2' }} size="small" autoFocus
                                onClick={closeModal}> No </Button>
                            <Button className={classes.btnHalf} variant="contained" color="primary" size="small"
                                onClick={quitGame} autoFocus> Yes </Button>
                        </>
                    }
                </DialogActions>
            </Dialog>
            <Box className={classes.lobby}>
                <VideoChat
                    domain={props.domain}
                    isConfigured={props.isConfigured}
                    subscribeToTracksAutomatically={true}
                    demoMode={props.demoMode}
                />
            </Box>
            <Box className={classes.sidebar}>
                {showBar && <NanoBar time={10} onEnd={handleTimerEnd}/>}
                <Box className={classes.sideHeader}>
					<Typography variant="h5">Your Role: &nbsp; {playerRole === 'Spy' ? 'Spy' : 'Resistance'}</Typography>
					<IconButton variant="contained" size="large" onClick={showModal}><ExitToAppIcon/></IconButton>
				</Box>
                <Box>
                    {gameState === 'INITIAL_STATE' && <RoleView role={playerRole} />}
                    {gameState === 'TEAM_SELECTION_STATE' && <TeamSelection isLeader={isLeader} leader={teamLeader} totalMember={totalMember} members={teamMembers} />}
                </Box>
            </Box>
        </Box>
    )
}

Game.defaultProps = {
    Component: null,
    pageProps: {},
};

Game.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};

Game.asides = [];
Game.modals = [];
Game.customTrayComponent = null;
Game.customAppComponent = null;

const useStyles = makeStyles(() => ({
	dialogAction: {
		display: "flex",
		padding: 0
	},
	btnFull: {
		display: "flex",
		flex: 1,
		borderRadius: 0,
		marginLeft: "0 important",
		width: "100%"
	},
	btnHalf: {
		display: "flex",
		flex: 1,
		borderRadius: 0,
		marginLeft: "0 !important",
		width: "50%"
	},
	btnCancel: {
		color: '#262A41',
		background: '#f2f2f2'
	},
	wrapper: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		backgroundSize: 'cover',
		backgroundImage: `url(${bg2.src})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: 'top center',
	},
	lobby: {
		flex: 1,
		padding: 0,
		margin: 0,
		position: "relative",
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignContent: 'flex-start',
		alignItems: 'center',
		justifyContent: 'center',
		overflowY: 'auto',
	},
	sidebar: {
		padding: "3.2rem",
		position: "relative",
		width: "448px",
		height: "100%",
		overflow: "auto",
		background: "rgba(25, 13, 53, 0.7)",
		backdropFilter: " blur(64px)",
		overflowY: "auto",
		display: "flex",
		flexDirection: "column",
		boxSizing: "border-box",

	},
	sideHeader: {
		backgroundColor: "rgba(255,255,255,0.1)",
		height: "100px",
		width: "100%",
		display: "flex",
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: "center",
		padding: "12px 18px",
		borderRadius: "2.0rem",
		'& h5': {
			fontSize: "24px",
			color: "#fff !important",
		},
		'& button': {
			backgroundColor: "rgba(255, 255, 255, 0.1)",
			border: "2px solid rgba(255, 255, 255, 0.1)",
			'& svg': {
				color: "#ffffff",
				width: "28px",
				height: "28px"
			}
		}
	},
	image: {
		height: "auto",
		width: '100%',
		padding: "32px 0"
	},
	members: {
		display: "flex",
		width: "100%",
		padding: "32px",
		background: "rgba(0,0,0,0.12)",
		borderRadius: "20px",
		textAlign: "center",
		justifyContent: "center",
		flexDirection: "column",
		alignItems: "flex-start",
		'& h5': {
			fontSize: 18,
			color: "#ffffff !important",
			textAlign: "center !important",
			opacity: "60%"
		},
		'& h3': {
			fontSize: 24,
			width: "100%",
			color: "#ffffff !important",
			textAlign: "center !important"
		}
	},
	team: {
		flex: 1,
		display: "flex",
		padding: "3.2rem",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "space-around",
		'& h2, h4': {
			color: "#fff !important"
		}
	},
	leader: {
		width: "204px",
		height: "204px",
		borderRadius: "36px",
		border: "4px solid #fff"
	},
	group: {
		width: "100%",
		maxWidth: "240px",
		border: "none"
	},
}));