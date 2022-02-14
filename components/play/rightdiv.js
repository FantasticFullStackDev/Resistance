import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { makeStyles } from '@mui/styles';
import { _getGameState } from '../../reducer/gamestateSlice';
import bg from '../../public/images/rightbg.png';

const Rightdiv = (props) => {
    //----- classes ------
    const classes = useStyles();

    //----- Global States -----
    const gameState = useSelector(_getGameState);

    //----- Dispatch -----
    const dispatch = useDispatch();

    //----- Internal States -----
    const [bgOpacity, setBgOpacity] = useState(0);

    //----- Lifecycle Events -----
    useEffect(() => {
        //TODO
    }, [])

    useEffect(() => {
        if(gameState === 'won' || gameState === 'lost') 
            setBgOpacity(1);
        else 
            setBgOpacity(0);
    }, [gameState])

    //----- Render -----
    return (
        <div className={classes.rightdiv}>
            <img src={bg.src} alt='bg' className={classes.bg}  style={{opacity: bgOpacity}}/>
            <div className={classes.container}>
                {props.children}
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    rightdiv: {
        width: 'calc(550px - 400px + 20vw)', 
        background: 'rgba(25, 13, 53, 0.7)',
        backdropFilter: 'blur(64px)',
        maxHeight: '100vh',
        overflowY: 'scroll',
        position: 'relative'
    },
    bg: {
        width: '100%',
        height: 'auto',
        marginTop: 10
    },
    container : {
        width: '100%',
        padding: '1.4vw',
        position: 'absolute',
        top: 0,
        left: 0
    }
}));

export default Rightdiv;