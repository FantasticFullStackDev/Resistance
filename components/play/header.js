import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useRouter } from "next/router";
import { _getGameState } from '../../reducer/gamestateSlice';
import { makeStyles } from '@mui/styles';
import { Box } from "@mui/system";
import { Typography, IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Dialog } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import QuitIcon from '../../assets/icons/QuitIcon';
import { _getMembers } from '../../reducer/membersSlice';

const Header = (props) => {
    //----- Others ------
    const classes = useStyles();    
    const router = useRouter();

    //----- Global States -----
    const _members = useSelector(_getMembers);
    const gameState = useSelector(_getGameState);

    //----- Dispatch -----
    const dispatch = useDispatch();

    //----- Internal States -----
    const [quitModal, setQuitModal] = useState(false);
    const [leftPlayer, setLeftPlayer] = useState('');
    const [state, setState] = useState('role'); // role, won, lost, ready, waiting, select, notEnough, paused
    const [role, setRole] = useState('resistance'); // resistance, spy
    //----- Lifecycle Events -----
    useEffect(() => {
        // TODO
    }, [])

    useEffect(() => {
        setState(gameState);
    }, [gameState])
    //----- Custom Functions -----
    const quitGame = () => {
        alert('Quit Game');
    }
    const showModal = () => {
        setQuitModal(true);
    }
    const closeModal = () => {
        setQuitModal(false);
    }
    const backToHome = () => {
        router.push('/');
    }

    //----- Render -----
    return (
        <React.Fragment>
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
            <Box className={classes.header} style={{display: (state === 'won' || state === 'lost')?'none':'flex'}}>
                <span className={classes.role}>
                    {
                        state === 'role' ? 'Your role: ' + role :
                        (
                            state === 'ready' ? 'Game Ready' :
                            (
                                state === 'notEnough' ? 'Not enough players' :
                                (
                                    state === 'select' ? 'Select Role' : 'Waiting for Players'
                                )
                            )
                        )
                    }
                </span>
                <IconButton variant="contained" size="small" onClick={showModal}><ExitToAppIcon/></IconButton>
            </Box>
            <Box className={classes.header} style={{display: (state === 'won' || state === 'lost')?'block':'none',textAlign: 'center', marginTop: 36}}>
                <span className={classes.role}>{state === 'won'? 'Your Team Won :)': 'Your Team Lost :('}</span>
            </Box>
        </React.Fragment>
    );
}

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: "rgba(255,255,255,0.1)",
		width: "100%",
		display: "flex",
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: "center",
		padding: "1.2vw",
		borderRadius: "1vw",
		'& button': {
			backgroundColor: "rgba(255, 255, 255, 0.1)",
			border: "2px solid rgba(255, 255, 255, 0.1)",
			'& svg': {
				color: "#ffffff",
				width: "1.4vw",
				height: "1.4vw"
			}
		}
    },
    role: {
        fontSize: 26,
        color: 'white',
        '@media(max-width: 1800px)' : {
            fontSize: 22
        },
        '@media(max-width: 1450px)' : {
            fontSize: 20
        },
        '@media(max-width: 1300px)' : {
            fontSize: 18
        },
        '@media(max-width: 1100px)' : {
            fontSize: 17
        },
        '@media(max-width: 1000px)' : {
            fontSize: 16
        }
    },
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
}));

export default Header;